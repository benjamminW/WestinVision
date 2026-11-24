// Refreshes the `views` and `likes` on each reel in projects.js from the
// platforms' public pages. Run daily by .github/workflows/update-reel-stats.yml.
//
// Safety rules: a number is only written when a fresh count was found, and a
// count never goes down (Facebook rounds, e.g. "3.1K", so a manually entered
// exact number is kept when it is higher). A failed lookup leaves the reel as is.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../../projects.js", import.meta.url);
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const PREVIEW_UA = "facebookexternalhit/1.1";

async function fetchText(url, userAgent) {
  const response = await fetch(url, {
    headers: { "User-Agent": userAgent, "Accept-Language": "en-US,en;q=0.9", Cookie: "CONSENT=YES+1" },
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

// "3.1K" -> 3100, "1,234" -> 1234, "2M" -> 2000000
function parseCount(text) {
  const match = String(text).trim().replace(/,/g, "").match(/^([\d.]+)\s*([KMB])?$/i);
  if (!match) return null;
  const scale = { K: 1e3, M: 1e6, B: 1e9 }[(match[2] || "").toUpperCase()] || 1;
  return Math.round(parseFloat(match[1]) * scale);
}

function decode(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}

function metaContent(page, property) {
  const match = page.match(new RegExp(`(?:property|name)="${property}"\\s+content="([^"]*)"`));
  return match ? decode(match[1]) : "";
}

const fetchers = {
  async youtubeId(id) {
    const page = await fetchText(`https://www.youtube.com/watch?v=${id}`, BROWSER_UA);
    const views = page.match(/"viewCount":"(\d+)"/);
    const likes = page.match(/"likeCount":"?(\d+)/);
    return { views: views ? Number(views[1]) : null, likes: likes ? Number(likes[1]) : null };
  },
  async facebookUrl(url) {
    // og:title looks like "9.7K views · 332 reactions | caption..."
    const title = metaContent(await fetchText(url, PREVIEW_UA), "og:title");
    const views = title.match(/([\d.,]+[KMB]?) views?/i);
    const likes = title.match(/([\d.,]+[KMB]?) reactions?/i);
    return { views: views ? parseCount(views[1]) : null, likes: likes ? parseCount(likes[1]) : null };
  },
  async instagramUrl(url) {
    // og:description looks like "82 likes, 2 comments - account on ..."; views are not public.
    const description = metaContent(await fetchText(url, PREVIEW_UA), "og:description");
    const likes = description.match(/^([\d.,]+[KMB]?) likes?/i);
    return { views: null, likes: likes ? parseCount(likes[1]) : null };
  },
};

// Multi-line reel objects only, so the one-line examples in the template comments are skipped.
// An Instagram reel may name `facebookCopy`, the same video posted on Facebook: its public
// views are used (Instagram hides views) and its reactions are added to the Instagram likes.
const REEL = /\{\n(\s+)title: "([^"]*)",\n\s+(instagramUrl|youtubeId|facebookUrl): "([^"]+)",\n(?:\s+facebookCopy: "([^"]+)",\n)?(?:\s+views: (\d+),\n)?(?:\s+likes: (\d+),\n)?(\s+)\}/g;

const source = readFileSync(FILE, "utf8");
const reelsStart = source.indexOf("window.WESTIN_REELS");
const head = source.slice(0, reelsStart);
let reelsPart = source.slice(reelsStart);

const reels = [...reelsPart.matchAll(REEL)];
const updates = await Promise.all(
  reels.map(async (match) => {
    const [, , title, kind, value, facebookCopy, oldViews, oldLikes] = match;
    try {
      const fresh = await fetchers[kind](value);
      if (facebookCopy) {
        const copy = await fetchers.facebookUrl(facebookCopy);
        fresh.views = copy.views;
        fresh.likes = fresh.likes === null || copy.likes === null ? null : fresh.likes + copy.likes;
      }
      return { match, fresh };
    } catch (error) {
      console.log(`! ${title}: lookup failed (${error.message}), kept views=${oldViews ?? "-"} likes=${oldLikes ?? "-"}`);
      return { match, fresh: { views: null, likes: null } };
    }
  }),
);

let changed = 0;
for (const { match, fresh } of updates.reverse()) {
  const [whole, indent, title, kind, value, facebookCopy, oldViews, oldLikes, closeIndent] = match;
  const pick = (oldValue, freshValue) => {
    const previous = oldValue === undefined ? null : Number(oldValue);
    if (freshValue === null || Number.isNaN(freshValue)) return previous;
    return previous === null ? freshValue : Math.max(previous, freshValue);
  };
  const views = pick(oldViews, fresh.views);
  const likes = pick(oldLikes, fresh.likes);

  let replacement = `{\n${indent}title: "${title}",\n${indent}${kind}: "${value}",\n`;
  if (facebookCopy) replacement += `${indent}facebookCopy: "${facebookCopy}",\n`;
  if (views !== null) replacement += `${indent}views: ${views},\n`;
  if (likes !== null) replacement += `${indent}likes: ${likes},\n`;
  replacement += `${closeIndent}}`;

  console.log(`${replacement === whole ? " " : "*"} ${title}: views ${oldViews ?? "-"} -> ${views ?? "-"}, likes ${oldLikes ?? "-"} -> ${likes ?? "-"}`);
  if (replacement !== whole) {
    changed += 1;
    reelsPart = reelsPart.slice(0, match.index) + replacement + reelsPart.slice(match.index + whole.length);
  }
}

if (changed) writeFileSync(FILE, head + reelsPart);
console.log(`${reels.length} reels checked, ${changed} updated.`);
