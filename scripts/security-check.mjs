import { readFileSync, readdirSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const root = resolve('.')
const failures = []

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesUnder(path) : [path]
  })
}

const sourceFiles = filesUnder(join(root, 'src')).filter(path => ['.js', '.jsx'].includes(extname(path)))
const forbiddenSinks = [
  ['dangerouslySetInnerHTML', /dangerouslySetInnerHTML/],
  ['eval', /\beval\s*\(/],
  ['Function constructor', /\bnew\s+Function\s*\(/],
  ['document.write', /document\.write\s*\(/],
  ['direct innerHTML assignment', /\.innerHTML\s*=/],
]

for (const path of sourceFiles) {
  const source = readFileSync(path, 'utf8')
  for (const [label, pattern] of forbiddenSinks) {
    if (pattern.test(source)) failures.push(`${label} détecté dans ${path.slice(root.length + 1)}`)
  }
  if (/VITE_[A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|PRIVATE|API_KEY)/.test(source)) {
    failures.push(`Nom de secret exposable via VITE_ dans ${path.slice(root.length + 1)}`)
  }
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
for (const [name, version] of Object.entries({ ...packageJson.dependencies, ...packageJson.devDependencies })) {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) failures.push(`${name} n'est pas fixé à une version exacte (${version})`)
}

const requiredHeaders = [
  'Content-Security-Policy',
  'Cross-Origin-Opener-Policy',
  'Cross-Origin-Resource-Policy',
  'Permissions-Policy',
  'Referrer-Policy',
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'X-Frame-Options',
]
const netlifyHeaders = readFileSync(join(root, 'public', '_headers'), 'utf8')
const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'))
const vercelHeaders = new Set(vercel.headers.flatMap(rule => rule.headers.map(header => header.key)))

for (const header of requiredHeaders) {
  if (!netlifyHeaders.includes(`${header}:`)) failures.push(`${header} absent de public/_headers`)
  if (!vercelHeaders.has(header)) failures.push(`${header} absent de vercel.json`)
}

if (!netlifyHeaders.includes("object-src 'none'")) failures.push("La CSP doit bloquer object-src")
if (!netlifyHeaders.includes("frame-ancestors 'none'")) failures.push('La CSP doit bloquer la mise en iframe')
if (!readFileSync(join(root, 'vite.config.js'), 'utf8').includes('sourcemap: false')) failures.push('Les source maps de production ne sont pas explicitement désactivées')

if (failures.length) {
  console.error(`Contrôle de sécurité échoué :\n${failures.map(item => `- ${item}`).join('\n')}`)
  process.exit(1)
}

console.log(`Contrôle de sécurité réussi : ${sourceFiles.length} fichiers source, dépendances figées et en-têtes vérifiés.`)
