const fs = require("fs");
const TurndownService = require("turndown");
const turndownService = new TurndownService();

const filePath = "input/index.htm";
// Extend Turndown with a rule to handle <hr> and <br> tags
turndownService.addRule("hr", {
  filter: "hr",
  replacement: function (content) {
    return "\n---\n";
  },
});

turndownService.addRule("br", {
  filter: "br",
  replacement: function (content) {
    return "  \n";
  },
});

// Add a rule to remove <div> tags and their content
turndownService.addRule("div", {
  filter: "div",
  replacement: function (content) {
    return ""; // Return an empty string to remove the content
  },
});

// Add rules to ignore <style> and <script> tags and their content
turndownService.addRule("style", {
  filter: "style",
  replacement: function () {
    return ""; // Return an empty string to remove the content
  },
});

turndownService.addRule("script", {
  filter: "script",
  replacement: function () {
    return ""; // Return an empty string to remove the content
  },
});

// Ensure tables are handled properly
turndownService.addRule("table", {
  filter: "table",
  replacement: function (content, node) {
    let table = "\n";
    Array.from(node.querySelectorAll("tr")).forEach((rowNode, rowIndex) => {
      let row = "| ";
      Array.from(rowNode.querySelectorAll("th, td")).forEach((cellNode) => {
        row += cellNode.textContent.trim() + " | ";
      });
      table += row + "\n";
      if (rowIndex === 0) {
        table += "| --- | --- | --- | --- |\n"; // Add a header separator after the first row
      }
    });
    return table;
  },
});

// Read the HTML file
fs.readFile(filePath, "utf8", (err, html) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Convert HTML to Markdown
  const markdown = turndownService.turndown(html);
  console.log(markdown);
});
