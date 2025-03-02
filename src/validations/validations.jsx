import Joi from "joi";


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
