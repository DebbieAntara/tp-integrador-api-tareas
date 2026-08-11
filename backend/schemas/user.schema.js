const { z } = require("zod");

const registerUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(80, "El nombre no puede superar los 80 caracteres"),

    email: z
      .string()
      .trim()
      .email("El correo electrónico no es válido")
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(72, "La contraseña no puede superar los 72 caracteres"),
  })
  .strict();

module.exports = {
  registerUserSchema,
};