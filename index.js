const TurndownService = require("turndown");
const turndownService = new TurndownService();

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
turndownService.addRule("div", {
  filter: "div",
  replacement: function (content) {
    return ""; // Return an empty string to remove the content
  },
});

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
        table += "| --- | --- | --- | --- |\n";
      }
    });
    return table;
  },
});

const html = `
<hr><br><h3>List of Columns for Table Dataset salary 2024:</h3><br>
<table>
  <tr>
    <th>Column Name</th>
    <th>Description</th>
    <th>Calculated Column</th>
    <th>Expression</th>
  </tr>
  <tr>
    <td>work_year</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>nível de experiência</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>employment_type</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>posição</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>salary</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>salary_currency</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>salary_in_usd</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Localidade dos empregados</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>remote_ratio</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Localização de empresa</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>company_size</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
<hr><br><h3>List of Roles:</h3><br>
<table>
  <tr>
    <th>Role Name</th>
    <th>Table Name</th>
    <th>Description</th>
    <th>Expression</th>
  </tr>
</table>
`;

const markdown = turndownService.turndown(html);
console.log(markdown);
