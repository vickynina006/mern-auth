export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  //will add logic here later
  next();
};
