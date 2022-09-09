const Employee = require("../lib/Employee");

test("creates employee", () => {
  const employee = new Employee("Dave", "0", "dave@work.com");
  const testName = "Dave";
  const testId = "0";
  const testEmail = "dave@work.com";

  expect(employee.getName()).toBe(testName);
  expect(employee.getId()).toBe(testId);
  expect(employee.getEmail()).toBe(testEmail);
});
