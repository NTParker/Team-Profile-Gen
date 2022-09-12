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
      addTeamMember();
    });
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add another team member?",
        choices: ["Yes", "No"],
        name: "addTeamMember",
      },
    ])
    .then(function ({ addTeamMember }) {
      if (addTeamMember === "Yes") {
        promptMenu();
      } else {
        buildTeam();
      }
    });
}

function promptMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select what you would like to do:",
        name: "menu",
        choices: ["Add an Engineer", "Add an Intern"],
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
          addTeamMember();
      }
    });
}

function createEngineer() {
  console.log("in here");
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
      addTeamMember();
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
      addTeamMember();
    });
}

function buildTeam() {
  const css = `
  header {
    text-align: center;
    color: white;
    background-color: rgb(243, 110, 95);
    padding: 20px;
  }
  
  #teamCard {
    border: black solid 1px;
    margin: 20px;
  }
  
  #employeeName {
    text-align: left;
    background-color: rgb(89, 89, 212);
    color: white;
    padding: 8px;
    margin-top: -1px;
    margin-left: -16px;
    margin-right: -16px;
  }
  
  #cardInfo {
    padding: 5px;
    margin-top: 10px;
  }
  
  #cardInfo ul li {
    border: black 0.5px;
    padding: 5px;
  }`;
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
  fs.writeFile("./dist/style.css", css, function (err) {
    if (err) {
      console.log(err);
    }
  });
  buildCards();
  endHTML();
}

function buildCards() {
  for (let i = 0; i < team.length; i++) {
    let traitName;
    let jobTrait;
    let jobTitle;

    if (team[i].officeNumber != null) {
      jobTitle = "Manager";
      jobTrait = team[i].officeNumber;
      traitName = "Office Number: ";
    } else if (team[i].github != null) {
      jobTitle = "Engineer";
      jobTrait = `<a href="https://www.github.com/${team[i].github}">${team[i].github}</a>`;
      traitName = "GitHub: ";
    } else {
      jobTitle = "Intern";
      jobTrait = team[i].school;
      traitName = "School: ";
    }

    let cardHTML = `
    <div class="col-sm-12 col-md-3" id="teamCard">
        <div id="employeeName">
            <h2>${team[i].name}</h2>
            <h3>${jobTitle}</h3>
            </div>
            <div id="cardInfo">
            <ul>
                <li>ID: ${team[i].id}</li>
                <li>Email: <a href="mailto:${team[i].email}">${
      team[i].email
    }</a></li>
                <li>${traitName + jobTrait}</li>
                </ul>
                </div>
                </div>
                `;

    fs.appendFile("./dist/index.html", cardHTML, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

function endHTML() {
  const footerHtml = `
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </body>
    </html>
    `;

  fs.appendFile("./dist/index.html", footerHtml, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

createManager();
