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

const docPathToRoute = (docPath) => {
  const rel = path.relative(docsDir, docPath);
  if (rel === "README.md") {
    return "/";
  }
  if (path.basename(rel) === "README.md") {
    return `/${path.posix.dirname(rel).replace(/\\/g, "/")}/`;
  }
  return `/${rel.replace(/\\/g, "/")}`;
};

const routeToMdUrl = (route) => {
  if (route.endsWith(".md")) {
    return `${baseUrl}${route}`;
  }
  const withSlash = route.endsWith("/") ? route : `${route}/`;
  return `${baseUrl}${withSlash}index.md`;
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

const collectMarkdownFiles = async (dir, results = []) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".vuepress") {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectMarkdownFiles(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
};

const writeMarkdownCopies = async (markdownFiles) => {
  await fs.mkdir(distDir, { recursive: true });
  await Promise.all(
    markdownFiles.map(async (filePath) => {
      const rel = path.relative(docsDir, filePath);
      const dirName = path.dirname(rel);
      const baseName = path.basename(rel);
      const outputName = baseName === "README.md" ? "index.md" : baseName;
      const outputDir = dirName === "." ? distDir : path.join(distDir, dirName);
      const outputPath = path.join(outputDir, outputName);
      await fs.mkdir(outputDir, { recursive: true });
      const content = await fs.readFile(filePath, "utf8");
      await fs.writeFile(outputPath, content);
    })
  );
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

  const markdownFiles = await collectMarkdownFiles(docsDir);
  await writeMarkdownCopies(markdownFiles);

  const lines = [`# ${siteTitle}`, "", `> ${siteSummary}`, ""];
  const fullLines = [`# ${siteTitle}`, "", `> ${siteSummary}`, ""];

  for (const doc of documents) {
    const heading = doc.title;
    const docRoute = normalizeRouteKey(doc.link);
    const sidebarEntry = normalizedSidebar.get(docRoute) || [];
    const sidebarRoutes = sidebarEntry.flatMap((entry) => entry.children || []);

    const childRoutes = new Set(sidebarRoutes);
    const docDir = path.join(docsDir, docRoute.replace(/^\//, ""));
    const extraRoutes = markdownFiles
      .filter((filePath) => filePath.startsWith(docDir))
      .map((filePath) => docPathToRoute(filePath))
      .filter((route) => route !== "/" && !childRoutes.has(route));

    const orderedRoutes = [
      ...sidebarRoutes,
      ...extraRoutes.sort((a, b) => a.localeCompare(b)),
    ];

    lines.push(`## ${heading}`, "");
    fullLines.push(`## ${heading}`, "");

    for (const route of orderedRoutes) {
      const docPath = routeToDocPath(route);
      try {
        await fs.access(docPath);
      } catch {
        continue;
      }
      const title = await getMarkdownTitle(docPath);
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
