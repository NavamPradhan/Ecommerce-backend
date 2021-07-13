exports.userSignUpValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'Email cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req
    .check('password')
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage('Password must contain atleast 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number');

  const error = req.validationErrors();
  if (error) {
    const firstError = error.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
