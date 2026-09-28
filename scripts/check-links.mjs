import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sourceFiles = ['src/App.jsx', 'src/components/Layout.jsx']
const source = sourceFiles.map(file => readFileSync(resolve(file), 'utf8')).join('\n')
const routePattern = /<Route\s+path="([^"]+)"/g
const linkPattern = /\bto="(\/[^"]*)"/g
const assetPattern = /\bsrc="(\/[^"]+)"/g
const routes = new Set(['/'])

for (const match of source.matchAll(routePattern)) routes.add(match[1])

const missingRoutes = []
for (const match of source.matchAll(linkPattern)) {
  const path = match[1].split('#')[0].split('?')[0] || '/'
  if (!routes.has(path) && path !== '*') missingRoutes.push(path)
}

const missingAssets = []
for (const match of source.matchAll(assetPattern)) {
  if (!existsSync(resolve('public', match[1].slice(1)))) missingAssets.push(match[1])
}

const failures = [...new Set([...missingRoutes, ...missingAssets])]
if (failures.length) {
  console.error(`Liens ou ressources introuvables :\n${failures.map(value => `- ${value}`).join('\n')}`)
  process.exit(1)
}

console.log(`Liens internes vérifiés : ${routes.size - 1} routes déclarées, aucune cible manquante.`)
