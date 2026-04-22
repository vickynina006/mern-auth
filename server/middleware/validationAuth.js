export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
  req.validatedBody = result.data;
  next();
};
