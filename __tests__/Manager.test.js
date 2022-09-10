const Manager = require("../lib/Manager");

test("creates manager", () => {
  const employee = new Manager("Dave", "0", "dave@work.com", "4567");
  const testName = "Dave";
  const testId = "0";
  const testEmail = "dave@work.com";
  const testOfficenumber = "4567";

  expect(employee.getName()).toBe(testName);
  expect(employee.getId()).toBe(testId);
  expect(employee.getEmail()).toBe(testEmail);
  expect(employee.getOfficeNumber()).toBe(testOfficenumber);
});
