#!/usr/bin/env node
/**
 * Capture square preview screenshots for each project in content/projects.
 *
 * Reads frontmatter `link` from each index.md and writes preview.jpg
 * next to it. Re-run whenever a project UI changes:
 *
 *   yarn capture-previews
 *
 * Optional: yarn capture-previews --only=stellar-legacy,pokedex
 */
const fs = require("fs")
const path = require("path")
const { chromium } = require("playwright")

const ROOT = path.join(__dirname, "..")
const PROJECTS_DIR = path.join(ROOT, "content", "projects")
const VIEWPORT = { width: 1440, height: 900 }
const CLIP_SIZE = 900 // square crop from top-center of the viewport

function parseArgs(argv) {
  const only = new Set()
  for (const arg of argv) {
    if (arg.startsWith("--only=")) {
      arg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => only.add(s))
    }
  }
  return { only }
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith(`"`) && value.endsWith(`"`)) ||
      (value.startsWith(`'`) && value.endsWith(`'`))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return data
}

function discoverProjects(only) {
  return fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => only.size === 0 || only.has(d.name))
    .map((d) => {
      const dir = path.join(PROJECTS_DIR, d.name)
      const indexPath = path.join(dir, "index.md")
      if (!fs.existsSync(indexPath)) return null
      const fm = parseFrontmatter(fs.readFileSync(indexPath, "utf8"))
      if (!fm.link) {
        console.warn(`skip ${d.name}: no link in frontmatter`)
        return null
      }
      return {
        slug: d.name,
        title: fm.title || d.name,
        link: fm.link,
        indexPath,
        outPath: path.join(dir, "preview.jpg"),
      }
    })
    .filter(Boolean)
}

function setImageFrontmatter(indexPath) {
  let md = fs.readFileSync(indexPath, "utf8")
  if (/^image:\s*.+$/m.test(md)) {
    md = md.replace(/^image:\s*.+$/m, "image: ./preview.jpg")
  } else {
    md = md.replace(/^---\r?\n/, "---\nimage: ./preview.jpg\n")
  }
  fs.writeFileSync(indexPath, md)
}

async function capture(project, page) {
  console.log(`→ ${project.title} (${project.link})`)
  try {
    await page.goto(project.link, { waitUntil: "networkidle", timeout: 45000 })
  } catch (err) {
    // Some SPAs never reach networkidle; fall back to load + settle.
    console.warn(`  networkidle timed out, retrying with load…`)
    await page.goto(project.link, { waitUntil: "load", timeout: 45000 })
    await page.waitForTimeout(2500)
  }

  // Give client-rendered UIs a beat to paint.
  await page.waitForTimeout(1500)

  const x = Math.max(0, Math.floor((VIEWPORT.width - CLIP_SIZE) / 2))
  await page.screenshot({
    path: project.outPath,
    type: "jpeg",
    quality: 85,
    clip: { x, y: 0, width: CLIP_SIZE, height: CLIP_SIZE },
  })
  setImageFrontmatter(project.indexPath)
  console.log(`  saved ${path.relative(ROOT, project.outPath)}`)
}

async function main() {
  const { only } = parseArgs(process.argv.slice(2))
  const projects = discoverProjects(only)
  if (projects.length === 0) {
    console.error("No projects found to capture.")
    process.exit(1)
  }

  console.log(`Capturing ${projects.length} project preview(s)…`)
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  })
  const page = await context.newPage()

  const failures = []
  for (const project of projects) {
    try {
      await capture(project, page)
    } catch (err) {
      console.error(`  FAILED ${project.slug}: ${err.message}`)
      failures.push(project.slug)
    }
  }

  await browser.close()

  if (failures.length) {
    console.error(`\nDone with ${failures.length} failure(s): ${failures.join(", ")}`)
    process.exit(1)
  }
  console.log("\nAll previews captured.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
