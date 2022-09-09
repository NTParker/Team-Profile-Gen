const inquirer = require("inquirer");
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
          promptEngineer();
          break;
        case "Add an Intern":
          promptIntern();
          break;
        default:
          buildTeam();
      }
    });
}

function createEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please provide name of employee",
      name: "name",
    },
    {
      type: "input",
      message: "Please provide employees ID",
      name: "id",
    },
    {
      type: "input",
      message: "Please provide emplyees email address",
      name: "email",
    },
  ]);
}

createEmployee();
