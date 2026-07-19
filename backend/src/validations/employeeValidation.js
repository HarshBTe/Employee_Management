const validator = require("validator");

const validateEmployee = (data) => {
  const errors = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Name is required.");
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Valid email is required.");
  }

  if (
    !data.phone ||
    !validator.isMobilePhone(data.phone, "en-IN")
  ) {
    errors.push("Valid phone number is required.");
  }

  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

  if (!data.department) {
    errors.push("Department is required.");
  }

  if (!data.designation) {
    errors.push("Designation is required.");
  }

  if (
    data.salary === undefined ||
    Number(data.salary) < 0
  ) {
    errors.push("Salary must be greater than or equal to 0.");
  }

  return errors;
};

module.exports = validateEmployee;