#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { createAppStructure } from "./utils/generate.js";

program
  .version("1.0.0")
  .description("Express CLI - Generate Express apps easily");

program
  .command("create <appName>")
  .description("Create a new Express application")
  .action(async (appName) => {
    console.log(chalk.green(`\n🚀 Creating Express app: ${appName}\n`));

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: "Choose your project language:",
        choices: ["TypeScript", "JavaScript"],
      }
    ]);    
    
    createAppStructure(appName, answers);
  });

program.parse(process.argv);
