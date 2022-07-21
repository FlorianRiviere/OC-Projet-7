const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", `Password123`, `123Password`]);

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      error: passwordSchema.validate(req.body.password, { list: true }),
    });
  }
};
