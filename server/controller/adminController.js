const User = require("../models/userModels");
const Validator = require("validator");
const dotenv = require("dotenv");
dotenv.config();

const GenerateAccessTokenAndRefreshToken = async (admindId) => {
  try {
    const user = await User.findById(admindId);
    //    console.log(user,"<>")
    const accessToken = await user.GenerateAccessToken();
    const refreshToken = await user.GenerateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error, "bb");
  }
};

const adminRegister = async (req, res) => {
  console.log(req.body, "test");
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).json({
        success: false,
        message: "Mandatory fields can not be epmty!",
      });
    }
    // validate email
    const validateEmail = Validator.isEmail(email);
    if (!validateEmail) {
      return res.status(400).json({ success: false, message: "Invalid email!" });
    }
    const admin = await User.findOne({ email });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "User already exists! please try to login!",
      });
    }

    let saveData = {
      name,
      email,
      password,
      role: 1,
    };
    await User.create(saveData);
    return res.status(200).json({ success: true, message: "Admin regsiter successfully!" });
  } catch (e) {
    console.log(e, "n");
    return res.status(500).json({ sucess: false, message: "Something went wrong!" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Mandatory fields can not be epmty!",
      });
    }
    // validate email
    const validateEmail = Validator.isEmail(email);
    if (!validateEmail) {
      return res.status(400).json({ success: false, message: "Invalid email!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exists" });
    }
    // compare password
    const validatePassword = await user.comparePassword(password);
    if (!validatePassword) {
      return res.status(400).json({ sucess: false, message: "Incorrct passowrd!" });
    }

    const { accessToken, refreshToken } = await GenerateAccessTokenAndRefreshToken(user._id);
    let adminData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ sucess: true, adminData, accessToken, refreshToken });
  } catch (e) {
    console.log(e, "nn");
    return res.status(500).json({ sucess: false, message: "Something went wrong!" });
  }
};

const adminLogout = async (req, res) => {
  try {
    // console.log(req.middleware._id,"nn")
    const result = await User.findByIdAndUpdate(
      req.middleware._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );
    console.log(result, "n");
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "Admin logout sucessfully!" });
  } catch (e) {
    console.log(e, "nn");
    return res.status(500).json({ sucess: false, message: "Something went wrong!" });
  }
};

const generateRefreshToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    let admin_id = req.middleware._id;
    console.log(admin_id, "nnnnnnnnnnnn");
    console.log(incomingRefreshToken, "n");
    const validateRefreshToken = await verifyRefreshToken(admin_id, incomingRefreshToken);
    if (!validateRefreshToken) {
      return res.status(400).json({ success: false, message: "Invalid refresh token!" });
    }
    /// find refreshtoken
    const findRefreshToken = await User.findOne({
      refreshToken: incomingRefreshToken,
    });
    // console.log(findRefreshToken,)
    if (findRefreshToken.refreshToken !== incomingRefreshToken) {
      return res.status(200).json({ success: false, message: "Refresh token is expired!" });
    }

    const { accessToken, refreshToken } = await GenerateAccessTokenAndRefreshToken(req.middleware._id);
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ sucess: true, accessToken, refreshToken });
  } catch (e) {
    console.log(e, "nn");
    return res.status(500).json({ sucess: false, message: "Something went wrong!" });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  adminLogout,
  generateRefreshToken,
};

const verifyRefreshToken = async (admin_id, incomingRefreshToken) => {
  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.Refresh_Token);
    //  console.log(decoded,"bb")
    return decoded._id === admin_id;
  } catch (e) {
    console.log("Error", e);
  }
};
