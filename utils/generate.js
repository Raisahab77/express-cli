import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export function createAppStructure(appName, options) {
  const root = path.join(process.cwd(), appName);
  fs.mkdirSync(root);

  console.log(chalk.blue(`📂 Creating project structure...`));

  // Create folders
  const folders = ["src", "src/routes", "src/controllers", "src/models", "src/middlewares", "config", "public"];
  if (options.useEJS) folders.push("views");

  folders.forEach((folder) => fs.mkdirSync(path.join(root, folder)));

  // Create files
  const files = {
    "package.json": JSON.stringify(
      {
        name: appName,
        version: "1.0.0",
        main: "src/server.js",
        dependencies: {
          express: "^4.18.2",
          ...(options.dbType !== "None" && { sequelize: "^6.29.0", pg: "^8.10.0" }),
          ...(options.useEJS && { ejs: "^3.1.8" }),
        },
      },
      null,
      2
    ),

    ".gitignore": "node_modules/\n.env",
    "config/config.js": `module.exports = { db: "${options.dbType}" };`,
    "src/server.js": `
import express from "express";
const app = express();

${options.useEJS ? `app.set("view engine", "ejs");` : ""}
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to ${appName}"));
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
`,

    "src/routes/index.js": `import express from "express";\nconst router = express.Router();\nexport default router;`,
    "src/controllers/homeController.js": `export const home = (req, res) => res.send("Home Page");`,
    "src/models/user.js": `export default {};`,
  };

  Object.entries(files).forEach(([file, content]) => {
    fs.outputFileSync(path.join(root, file), content);
  });

  console.log(chalk.green(`✅ App ${appName} created successfully!`));
  console.log(chalk.yellow(`\n👉 Next Steps:\n`));
  console.log(chalk.blue(`cd ${appName} && npm install && npm start\n`));
}
