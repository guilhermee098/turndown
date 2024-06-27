const fs = require("fs");
const TurndownService = require("turndown");
const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
});

const filePath = "input/index.htm";

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

turndownService.addRule("div", {
  filter: "div",
  replacement: function (content) {
    return "";
  },
});

turndownService.addRule("style", {
  filter: "style",
  replacement: function () {
    return "";
  },
});

turndownService.addRule("script", {
  filter: "script",
  replacement: function () {
    return "";
  },
});

turndownService.addRule("table", {
  filter: "table",
  replacement: function (content, node) {
    let table = "\n";
    const rows = Array.from(node.querySelectorAll("tr"));
    const colCount = rows[0].querySelectorAll("th, td").length;
    rows.forEach((rowNode, rowIndex) => {
      let row = "| ";
      Array.from(rowNode.querySelectorAll("th, td")).forEach((cellNode) => {
        if (cellNode.querySelector("pre")) {
          row += "```" + cellNode.textContent.trim() + "```" + " | ";
        } else {
          row += cellNode.textContent.trim() + " | ";
        }
      });
      table += row + "\n";
      if (rowIndex === 0) {
        table += "| " + " --- |".repeat(colCount) + "\n"; // Add a header separator after the first row
      }
    });
    return table;
  },
});

fs.readFile(filePath, "utf8", (err, html) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const markdown = turndownService.turndown(html);
  console.log(markdown);
});
