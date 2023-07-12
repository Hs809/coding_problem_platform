const User = require("../model/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customeError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!email || !name || !password || !role) {
    return next(
      new CustomError("Name, Email, role and password are required", 400)
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  // check for presence of email and password
  if (!email || !password) {
    return next(new CustomError("Please provide email and password", 400));
  }
  // get user from DB
  const user = await User.findOne({ email }).select("+password");
  // user not found in DM
  if (!user) {
    return next(new CustomError("Email or password doesn't exist ", 400));
  }
  // matching the password
  const isPasswordCorrect = await user.isValidatedPassword(password);
  // password doesn't match
  if (!isPasswordCorrect) {
    return next(new CustomError("Email or password doesn't exist ", 400));
  }
  // if all goes good and we send the token
  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});
