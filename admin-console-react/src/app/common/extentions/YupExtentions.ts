import * as yup from "yup";

// Extend Yup's StringSchema to include custom methods
declare module "yup" {
  interface StringSchema {
    uuids(message?: string): StringSchema;
    emails(message?: string): StringSchema;
  }
}

// Regex for validating GUIDs (UUID v4 or compatible)
const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Custom method to validate one or more GUIDs separated by ";"
yup.addMethod<yup.StringSchema>(yup.string, "uuids", function (
  errorMessage = "Enter one or more valid GUIDs separated by \";\""
) {
  return this.test("uuids", errorMessage, function (value) {
    if (!value) return true; // Field is optional
    const ids = value.split(";").map(id => id.trim());
    const isValid = ids.every(id => guidRegex.test(id));
    return isValid || this.createError({ message: errorMessage });
  });
});

// Custom method to validate one or more emails separated by ";"
yup.addMethod<yup.StringSchema>(yup.string, "emails", function (
  errorMessage = "Enter one or more valid emails separated by \";\""
) {
  return this.test("emails", errorMessage, function (value) {
    if (!value) return true; // Field is optional
    const emails = value.split(";").map(email => email.trim());
    const isValid = emails.every(email => emailRegex.test(email));
    return isValid || this.createError({ message: errorMessage });
  });
});
