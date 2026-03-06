import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");
const distDir = path.join(docsDir, ".vuepress", "dist");
const documentsPath = path.join(
  docsDir,
  ".vuepress",
  "config-client",
  "documents.ts"
);
const sidebarPath = path.join(
  docsDir,
  ".vuepress",
  "config-client",
  "sidebar.ts"
);

const baseUrl = "https://docs.imunify360.com";
const siteTitle = "Imunify360 Documentation";
const siteSummary =
  "Imunify360 is a security solution for Linux web servers based on machine learning technology. It provides advanced firewall, intrusion detection, malware scanning, patch management, and proactive defense against zero-day attacks.";

const normalizeRouteKey = (route) => (route.endsWith("/") ? route : `${route}/`);

const parseExportDefault = (content) => {
  const withoutExport = content.replace(/^\s*export\s+default\s+/m, "").trim();
  const withoutSemicolon = withoutExport.replace(/;?\s*$/, "");
  return new Function(`return (${withoutSemicolon})`)();
};

const routeToDocPath = (route) => {
  const cleaned = route.replace(/^\//, "");
  if (route.endsWith(".md")) {
    return path.join(docsDir, cleaned);
  }
  const withSlash = route.endsWith("/") ? route : `${route}/`;
  return path.join(docsDir, withSlash.replace(/^\//, ""), "README.md");
};

const routeToMdUrl = (route) => {
  if (route.endsWith(".md")) {
    return `${baseUrl}${route}`;
  }
  const withSlash = route.endsWith("/") ? route : `${route}/`;
  return `${baseUrl}${withSlash}index.md`;
};

const routeToDistMarkdownPath = (route) => {
  const cleaned = route.replace(/^\//, "");
  if (route.endsWith(".md")) {
    return path.join(distDir, cleaned);
  }
  const withSlash = route.endsWith("/") ? route : `${route}/`;
  return path.join(distDir, withSlash.replace(/^\//, ""), "index.md");
};

const getMarkdownTitle = async (filePath) => {
  const content = await fs.readFile(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  let startIndex = 0;
  if (lines[0] === "---") {
    const endIndex = lines.findIndex((line, i) => i > 0 && line === "---");
    if (endIndex !== -1) {
      startIndex = endIndex + 1;
    }
  }
  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith("# ")) {
      return line.replace(/^#\s+/, "").trim();
    }
  }
  return path.basename(filePath, path.extname(filePath));
};

const sanitizeMarkdownTitle = (title) => {
  const hasHtml = /<[^>]+>/.test(title);
  let normalized = title.replace(/<[^>]*>/g, " ");
  normalized = normalized.replace(/\s+/g, " ").trim();
  if (hasHtml && /\bdeprecated\b/i.test(normalized)) {
    normalized = normalized.replace(/\bdeprecated\b/gi, "[DEPRECATED]");
    normalized = normalized.replace(/\s*\[DEPRECATED\]\s*/g, " [DEPRECATED] ");
    normalized = normalized.replace(/\s+/g, " ").trim();
  }
  return normalized;
};

const stripFrontmatter = (content) => {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== "---") {
    return content;
  }
  const endIndex = lines.findIndex((line, i) => i > 0 && line === "---");
  if (endIndex === -1) {
    return content;
  }
  return lines.slice(endIndex + 1).join("\n").trimStart();
};

const readMarkdownContent = async (filePath) => {
  const content = await fs.readFile(filePath, "utf8");
  return stripFrontmatter(content);
};

const writeMarkdownCopy = async (filePath, route) => {
  const outputPath = routeToDistMarkdownPath(route);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const content = await fs.readFile(filePath, "utf8");
  await fs.writeFile(outputPath, content);
};

const buildLlmsTxt = async () => {
  const [documentsRaw, sidebarRaw] = await Promise.all([
    fs.readFile(documentsPath, "utf8"),
    fs.readFile(sidebarPath, "utf8"),
  ]);
  const documents = parseExportDefault(documentsRaw);
  const sidebar = parseExportDefault(sidebarRaw);
  const normalizedSidebar = new Map(
    Object.entries(sidebar).map(([key, value]) => [
      normalizeRouteKey(key),
      value,
    ])
  );

  const lines = [`# ${siteTitle}`, "", `> ${siteSummary}`, ""];
  const fullLines = [`# ${siteTitle}`, "", `> ${siteSummary}`, ""];

  for (const doc of documents) {
    const heading = doc.title;
    const docRoute = normalizeRouteKey(doc.link);
    const sidebarEntry = normalizedSidebar.get(docRoute) || [];
    const sidebarRoutes = sidebarEntry.flatMap((entry) => entry.children || []);

    const orderedRoutes = sidebarRoutes;

    lines.push(`## ${heading}`, "");
    fullLines.push(`## ${heading}`, "");

    for (const route of orderedRoutes) {
      const docPath = routeToDocPath(route);
      try {
        await fs.access(docPath);
      } catch {
        continue;
      }
      await writeMarkdownCopy(docPath, route);
      const rawTitle = await getMarkdownTitle(docPath);
      const title = sanitizeMarkdownTitle(rawTitle);
      lines.push(`- [${title}](${routeToMdUrl(route)})`);

      const content = await readMarkdownContent(docPath);
      fullLines.push(`### ${title}`, "", content.trimEnd(), "");
    }

    lines.push("");
    fullLines.push("");
  }

  const outputPath = path.join(distDir, "llms.txt");
  lines.push(
    "---",
    "",
    `For more comprehensive documentation, see [llms-full.txt](${baseUrl}/llms-full.txt)`
  );
  await fs.writeFile(outputPath, lines.join("\n").trimEnd() + "\n");

  const fullOutputPath = path.join(distDir, "llms-full.txt");
  await fs.writeFile(fullOutputPath, fullLines.join("\n").trimEnd() + "\n");
};

buildLlmsTxt().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
