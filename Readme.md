Express CLI

🚀 Express CLI is a simple command-line tool that allows you to quickly generate Express.js applications in either JavaScript or TypeScript.

📌 Features

Choose between JavaScript or TypeScript projects

Automatically sets up project structure

Installs required dependencies

Supports EJS templating (optional)

📥 Installation

1️⃣ Install Globally

To use Express CLI globally, install it via npm:

npm install -g express-cli-generator

2️⃣ Usage

Create a new Express project by running:

express-cli create my-app

This will prompt you to choose between JavaScript and TypeScript.

3️⃣ Navigate & Install Dependencies

cd my-app
npm install

4️⃣ Run the App

For JavaScript:

npm run dev

For TypeScript:

npm run dev  # Runs with ts-node
npm run build && npm start  # Compiles and runs built JS files

⚡ Project Structure

my-app/
 ├── src/
 │   ├── controllers/
 │   ├── middlewares/
 │   ├── models/
 │   ├── routes/
 │   ├── index.js / index.ts
 ├── config/
 ├── public/
 ├── views/ (if EJS is selected)
 ├── package.json
 ├── tsconfig.json (if TypeScript is selected)
 └── .gitignore

🛠 Contributing

Contributions are welcome! Follow these steps to contribute:

Fork the Repository

Clone your Fork

git clone https://github.com/Raisahab77/express-cli.git

Install Dependencies

npm install

Make Your Changes

Test Your Changes

node index.js create test-app

Commit & Push

git add .
git commit -m "Your changes"
git push origin your-branch

Create a Pull Request