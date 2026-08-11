const { z } = require("zod");

const titleSchema = z
  .string()
  .trim()
  .min(
    3,
    "El título debe tener al menos 3 caracteres"
  )
  .max(
    120,
    "El título no puede superar los 120 caracteres"
  );

const descriptionSchema = z
  .string()
  .trim()
  .max(
    500,
    "La descripción no puede superar los 500 caracteres"
  );

const statusSchema = z.enum(
  [
    "pendiente",
    "en_progreso",
    "completada",
  ],
  {
    error:
      "El estado debe ser pendiente, en_progreso o completada",
  }
);

const prioritySchema = z.enum(
  [
    "baja",
    "media",
    "alta",
  ],
  {
    error:
      "La prioridad debe ser baja, media o alta",
  }
);

const dueDateSchema = z
  .string()
  .trim()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "La fecha límite debe tener formato YYYY-MM-DD"
  );

const createItemSchema = z
  .object({
    title: titleSchema,

    description: descriptionSchema
      .optional()
      .default(""),

    status: statusSchema
      .optional()
      .default("pendiente"),

    priority: prioritySchema
      .optional()
      .default("media"),

    dueDate: dueDateSchema
      .nullable()
      .optional()
      .default(null),
  })
  .strict();

const updateItemSchema = z
  .object({
    title: titleSchema.optional(),

    description: descriptionSchema.optional(),

    status: statusSchema.optional(),

    priority: prioritySchema.optional(),

    dueDate: dueDateSchema
      .nullable()
      .optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message:
        "Debes enviar al menos un campo para actualizar",
      path: ["body"],
    }
  );

module.exports = {
  createItemSchema,
  updateItemSchema,
};