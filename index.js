const inquirer = require("inquirer");
const Employee = require("./lib/Employee");

let employees = [];

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
