import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export function createAppStructure(appName, options) {
  const isTS = options.language === "TypeScript"; // Check if user selected TypeScript
  const root = path.join(process.cwd(), appName);
  fs.mkdirSync(root);

  console.log(chalk.blue(`📂 Creating ${isTS ? "TypeScript" : "JavaScript"} project structure...`));

  // Create folder structure
  const folders = [
    "src",
    "src/routes",
    "src/controllers",
    "src/models",
    "src/middlewares",
    "config",
    "public"
  ];
  if (options.useEJS) folders.push("views");

  folders.forEach((folder) => fs.mkdirSync(path.join(root, folder)));

  // Define package.json
  const packageJson = {
    name: appName,
    version: "1.0.0",
    main: `src/index.${isTS ? "ts" : "js"}`,
    scripts: {
      start: isTS ? "tsc && node dist/index.js" : "node src/index.js",
      dev: isTS ? "ts-node src/index.ts" : "nodemon src/index.js"
    },
    dependencies: {
      express: "^4.18.2",
      ...(options.dbType !== "None" && { sequelize: "^6.29.0", pg: "^8.10.0" }),
      ...(options.useEJS && { ejs: "^3.1.8" })
    },
    devDependencies: isTS
      ? {
          typescript: "^5.2.2",
          "ts-node": "^10.9.1",
          "@types/node": "^20.6.1",
          "@types/express": "^4.17.21"
        }
      : {
          nodemon: "^3.0.1"
        }
  };

  // Define tsconfig.json for TypeScript
  const tsConfig = `{
  "compilerOptions": {
    "outDir": "dist",
    "module": "CommonJS",
    "target": "ES6",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}`;

  // Define config file
  const configFile = isTS
    ? `export const config = { db: "${options.dbType}" };`
    : `module.exports = { db: "${options.dbType}" };`;

  // Define entry file (index.js / index.ts)
  const indexFile = isTS
    ? `import express from "express";
const app = express();

${options.useEJS ? `app.set("view engine", "ejs");` : ""}
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to ${appName}"));
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
`
    : `const express = require("express");
const app = express();

${options.useEJS ? `app.set("view engine", "ejs");` : ""}
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to ${appName}"));
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
`;

  // Define routes file
  const routesFile = isTS
    ? `import { Router } from "express";
const router = Router();
export default router;`
    : `const express = require("express");
const router = express.Router();
module.exports = router;`;

  // Define controllers file
  const controllersFile = isTS
    ? `import { Request, Response } from "express";
export const home = (req: Request, res: Response) => res.send("Home Page");`
    : `exports.home = (req, res) => res.send("Home Page");`;

  // Define models file
  const modelsFile = isTS ? `export default {};` : `module.exports = {};`;

  // Write files
  const files = {
    "package.json": JSON.stringify(packageJson, null, 2),
    ".gitignore": "node_modules/\n.env",
    "config/config.js": configFile,
    [`src/index.${isTS ? "ts" : "js"}`]: indexFile,
    [`src/routes/index.${isTS ? "ts" : "js"}`]: routesFile,
    [`src/controllers/homeController.${isTS ? "ts" : "js"}`]: controllersFile,
    [`src/models/user.${isTS ? "ts" : "js"}`]: modelsFile
  };

  if (isTS) {
    files["tsconfig.json"] = tsConfig;
  }

  Object.entries(files).forEach(([file, content]) => {
    fs.outputFileSync(path.join(root, file), content);
  });

  console.log(chalk.green(`✅ ${isTS ? "TypeScript" : "JavaScript"} app '${appName}' created successfully!`));
  console.log(chalk.yellow(`\n👉 Next Steps:\n`));
  console.log(chalk.blue(`cd ${appName} && npm install && npm run dev\n`));
}
