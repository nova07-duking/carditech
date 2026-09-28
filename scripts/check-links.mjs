import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const main = readFileSync(resolve('src/main.js'), 'utf8')
const data = readFileSync(resolve('src/data/content.js'), 'utf8')
const routeBlock = main.match(/const routes = \{([\s\S]*?)\n\}/)?.[1] || ''
const routes = new Set([...routeBlock.matchAll(/['"](\/[^'"]*)['"]\s*:/g)].map(match => match[1]))
const referencedPaths = [...`${main}\n${data}`.matchAll(/['"](\/[a-z0-9-]+(?:#[a-z0-9-]+)?)['"]/gi)].map(match => match[1].split('#')[0])
const assets = [...main.matchAll(/src=\\?"(\/[^"']+)"/g)].map(match => match[1])

const missingRoutes = referencedPaths.filter(path => !routes.has(path) && !path.startsWith('/images/'))
const missingAssets = assets.filter(path => !existsSync(resolve('public', path.slice(1))))
const failures = [...new Set([...missingRoutes, ...missingAssets])]

if (failures.length) {
  console.error(`Liens ou ressources introuvables :\n${failures.map(value => `- ${value}`).join('\n')}`)
  process.exit(1)
}

console.log(`Liens internes vérifiés : ${routes.size} routes déclarées, aucune cible manquante.`)
