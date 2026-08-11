const { z } = require("zod");

const createItemSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(
        3,
        "El título debe tener al menos 3 caracteres"
      )
      .max(
        120,
        "El título no puede superar los 120 caracteres"
      ),

    description: z
      .string()
      .trim()
      .max(
        500,
        "La descripción no puede superar los 500 caracteres"
      )
      .optional()
      .default(""),

    status: z
      .enum(
        [
          "pendiente",
          "en_progreso",
          "completada",
        ],
        {
          error:
            "El estado debe ser pendiente, en_progreso o completada",
        }
      )
      .optional()
      .default("pendiente"),

    priority: z
      .enum(
        [
          "baja",
          "media",
          "alta",
        ],
        {
          error:
            "La prioridad debe ser baja, media o alta",
        }
      )
      .optional()
      .default("media"),

    dueDate: z
      .string()
      .trim()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "La fecha límite debe tener formato YYYY-MM-DD"
      )
      .nullable()
      .optional()
      .default(null),
  })
  .strict();

module.exports = {
  createItemSchema,
};