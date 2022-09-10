const Engineer = require("../lib/Engineer");

test("creates engineer", () => {
  const employee = new Engineer("Dave", "0", "dave@work.com", "DaveGit");
  const testName = "Dave";
  const testId = "0";
  const testEmail = "dave@work.com";
  const testGithub = "DaveGit";

  expect(employee.getName()).toBe(testName);
  expect(employee.getId()).toBe(testId);
  expect(employee.getEmail()).toBe(testEmail);
  expect(employee.getGithub()).toBe(testGithub);
});
