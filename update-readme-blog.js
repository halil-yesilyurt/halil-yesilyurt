const fs = require("fs");
const Parser = require("rss-parser");
const parser = new Parser();

const BLOG_FEED = "https://www.halilyesilyurt.com/rss.xml";
const README_PATH = "./README.md";

(async () => {
  const feed = await parser.parseURL(BLOG_FEED);

  const latestPosts = feed.items.slice(0, 5).map(item => `- [${item.title}](${item.link})`);

  const readmeContent = fs.readFileSync(README_PATH, "utf8");

  const updatedContent = readmeContent.replace(
    /<!--BLOG-START-->[\s\S]*<!--BLOG-END-->/,
    `<!--BLOG-START-->\n${latestPosts.join("\n")}\n<!--BLOG-END-->`
  );

  fs.writeFileSync(README_PATH, updatedContent);
})();
