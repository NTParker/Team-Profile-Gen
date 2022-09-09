const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let team = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter your ID",
        name: "id",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter your ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter your email address",
        name: "email",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log("Please enter your email!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter your office number",
        name: "officeNumber",
        validate: (officeInput) => {
          if (officeInput) {
            return true;
          } else {
            console.log("Please enter your office number!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      team.push(manager);
      promptMenu();
    });
}

function promptMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select what you would like to do:",
        name: "menu",
        choices: ["Add and Engineer", "Add an Intern", "Finish my team"],
      },
    ])
    .then((userPrompt) => {
      switch (userPrompt.menu) {
        case "Add an Engineer":
          createEngineer();
          break;
        case "Add an Intern":
          createIntern();
          break;
        default:
          buildTeam();
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please provide the name of Engineer",
        name: "name",
      },
      {
        type: "input",
        message: "Please provide Engineer's ID",
        name: "id",
      },
      {
        type: "input",
        message: "Please provide Engineer's email address",
        name: "email",
      },
      {
        type: "input",
        message: "Please provide Engineer's GitHub",
        name: "github",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      team.push(engineer);
      promptMenu();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please provide the name of Intern",
        name: "name",
      },
      {
        type: "input",
        message: "Please provide Intern's ID",
        name: "id",
      },
      {
        type: "input",
        message: "Please provide Intern's email address",
        name: "email",
      },
      {
        type: "input",
        message: "Please provide name of Intern's school",
        name: "school",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      team.push(intern);
      promptMenu();
    });
}

function buildTeam() {
  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <title>My Team</title>
      </head>
      <body>
        <header>
          <h1>My Team</h1>
        </header>
        <div class="row justify-content-center" id="team">`;

  fs.writeFile("./dist/index.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

createManager();
