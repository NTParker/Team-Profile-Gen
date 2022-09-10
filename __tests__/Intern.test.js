const Intern = require("../lib/Intern");

test("creates intern", () => {
  const employee = new Intern("Dave", "0", "dave@work.com", "Harvard");
  const testName = "Dave";
  const testId = "0";
  const testEmail = "dave@work.com";
  const testSchool = "Harvard";

  expect(employee.getName()).toBe(testName);
  expect(employee.getId()).toBe(testId);
  expect(employee.getEmail()).toBe(testEmail);
  expect(employee.getSchool()).toBe(testSchool);
});
