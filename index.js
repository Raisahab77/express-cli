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
        name: "dbType",
        message: "Choose your database:",
        choices: ["MongoDB", "PostgreSQL", "MySQL", "None"],
      },
      {
        type: "confirm",
        name: "useEJS",
        message: "Do you want to use EJS as a templating engine?",
        default: false,
      },
    ]);

    createAppStructure(appName, answers);
  });

program.parse(process.argv);
