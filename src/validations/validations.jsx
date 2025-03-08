import dayjs from "dayjs";
import Joi from "joi";
import validator from "validator";

export const loginSchema = Joi.object({
  userNameorEmail: Joi.alternatives()
    .try(
      Joi.string().email({ tlds: { allow: false } }),
      Joi.string()
        .pattern(/^[a-zA-Z0-9._-]{3,30}$/) // Allows letters, numbers, `_`, `.`, and `-`
        .min(3)
        .max(30)
    )
    .required()
    .messages({
      "alternatives.match": "Must be a valid email or username",
      "string.email": "Invalid email format",
      "string.pattern.base":
        "Username can only contain letters, numbers, underscores (_), dots (.), and dashes (-)",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username must be at most 30 characters",
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at most 50 characters",
      "string.pattern.base":
        "Not a strong Password",
    }),
});

export const signUpSchemaOne = Joi.object({
  firstName: Joi.string().trim().min(2).max(20).uppercase().pattern(/^[A-Za-z]+$/).required().messages({
    "string.empty": "First name cannot be empty!",
    "string.min": "Min length of first name is 2!",
    "string.max": "Max length of first name is 20!",
    "string.pattern.base": "Invalid first name!",
  }),

  lastName: Joi.string().trim().min(2).max(20).uppercase().pattern(/^[A-Za-z]+$/).required().messages({
    "string.empty": "Last name cannot be empty!",
    "string.min": "Min length of last name is 2!",
    "string.max": "Max length of last name is 20!",
    "string.pattern.base": "Invalid last name!",
  }),

  userName: Joi.string().trim().min(5).max(50).required().messages({
    "string.empty": "Username cannot be empty!",
    "string.min": "Min length of username is 5!",
    "string.max": "Max length of username is 50!",
  }),

  email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email cannot be empty!",
    "string.email": "Invalid email!",
  }),

  dob: Joi.date()
    .less(dayjs().subtract(18, "year").toDate()) // Must be at least 18 years old
    .required()
    .messages({
      "date.base": "Invalid date format.",
      "date.less": "You must be at least 18 years old.",
      "any.required": "Date of Birth is required.",
    }),

  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Invalid gender!",
    "string.empty": "Gender cannot be empty!",
  }),

  phoneNo: Joi.string()
    .custom((value, helpers) => {
      if (!validator.isMobilePhone(value, "any", { strictMode: true })) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "string.empty": "Phone number cannot be empty!",
      "any.invalid": "Invalid phone number with country code!",
    }),

  about: Joi.string().max(100).allow("").messages({
    "string.max": "About section can have max 100 characters!",
  }),
});

