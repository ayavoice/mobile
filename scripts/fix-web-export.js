/**
 * Post-processes `expo export -p web` output before deploying.
 *
 * Metro mirrors any asset that lives under node_modules/ (e.g. the vector
 * icon fonts) into dist/assets/node_modules/... . Vercel's static file
 * server silently 404s any path containing a `node_modules` segment, so
 * that folder needs renaming — and every reference to it inside the built
 * JS bundles needs rewriting to match.
 */
const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "..", "dist");
const FROM_DIR = path.join(DIST, "assets", "node_modules");
const TO_DIR = path.join(DIST, "assets", "vendor");
const FROM_URL = "/assets/node_modules/";
const TO_URL = "/assets/vendor/";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function main() {
  if (!fs.existsSync(DIST)) {
    throw new Error(`dist/ not found at ${DIST} — run "expo export -p web" first.`);
  }

  if (fs.existsSync(FROM_DIR)) {
    fs.renameSync(FROM_DIR, TO_DIR);
    console.log(`Renamed ${path.relative(DIST, FROM_DIR)} -> ${path.relative(DIST, TO_DIR)}`);
  } else {
    console.log(`No ${path.relative(DIST, FROM_DIR)} directory to rename — skipping.`);
  }

  let rewritten = 0;
  for (const file of walk(DIST)) {
    if (!file.endsWith(".js")) continue;
    const content = fs.readFileSync(file, "utf8");
    if (!content.includes(FROM_URL)) continue;
    fs.writeFileSync(file, content.split(FROM_URL).join(TO_URL));
    rewritten++;
    console.log(`Rewrote asset URLs in ${path.relative(DIST, file)}`);
  }

  if (rewritten === 0 && fs.existsSync(TO_DIR)) {
    console.warn("Renamed the assets folder but found no JS bundle referencing the old path — check manually.");
  }

  const vercelJsonSrc = path.join(__dirname, "..", "vercel.json");
  if (fs.existsSync(vercelJsonSrc)) {
    fs.copyFileSync(vercelJsonSrc, path.join(DIST, "vercel.json"));
    console.log("Copied vercel.json into dist/ (expo export doesn't preserve it).");
  }
}

main();
