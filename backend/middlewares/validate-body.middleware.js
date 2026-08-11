const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return {
          field: issue.path.join(".") || "body",
          message: issue.message,
        };
      });

      return res.status(400).json({
        ok: false,
        message: "Los datos enviados no son válidos",
        errors,
      });
    }

    req.body = result.data;
    next();
  };
};

module.exports = {
  validateBody,
};