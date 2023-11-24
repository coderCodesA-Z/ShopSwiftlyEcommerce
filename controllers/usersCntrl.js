import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { emailRegex } from "../constants/emailRegex.js";
import { passwordRegex } from "../constants/passwordRegex.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Public

const BAD_REQUEST_CODE = 400;

function createErrorObject(error, message, statusCode) {
	error.message = message;
	error.status = statusCode;
	return error;
}

export const registerUserCntrl = asyncHandler(async (req, res) => {
	const { fullname, email, password } = req.body;

	const error = new Error();

	if (!fullname || !email || !password) {
		throw createErrorObject(error, "Please enter all fields", BAD_REQUEST_CODE);
	}

	// invalid email
	if (!emailRegex.test(email)) {
		throw createErrorObject(
			error,
			"Please enter a valid email",
			BAD_REQUEST_CODE
		);
	}

	const [_, domain] = email.split("@");

	// list of allowed domains
	const allowedDomains = ["gmail.com"];

	// check if the domain is in the allowed list
	if (!allowedDomains.includes(domain)) {
		throw createErrorObject(
			error,
			"Other domains apart from gmail is not supported",
			BAD_REQUEST_CODE
		);
	}

	// check if user already exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		throw createErrorObject(error, "User already exists", BAD_REQUEST_CODE);
	}

	// invalid password
	if (password.length < 6 && !passwordRegex.test(password)) {
		throw createErrorObject(
			error,
			"Password should be atleast 6 characters long and should contain one uppercase, lowercase and a numeric value",
			BAD_REQUEST_CODE
		);
	}

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user in db
	const user = await User.create({ fullname, email, password: hashedPassword });
	res.status(201).json({
		status: "success",
		message: "User Registered Successfully",
		data: user,
	});
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

export const loginUserCntrl = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const error = new Error();

	if (!email || !password) {
		throw createErrorObject(error, "Please enter all fields", BAD_REQUEST_CODE);
	}

	// check if user exists
	const user = await User.findOne({ email });
	if (!user) {
		throw createErrorObject(
			error,
			"User not found, email does not exist",
			BAD_REQUEST_CODE
		);
	}

	// check if password is correct
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw createErrorObject(
			error,
			"Invalid credentials, provide a correct password",
			BAD_REQUEST_CODE
		);
	}

	res.status(200).json({
		status: "success",
		data: user,
		message: "User logged in successfully",
		token: generateToken(user._id),
	});
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private

export const getUserProfileCntrl = asyncHandler(async (req, res) => {
	const user = await User.findById(req.userAuthId);
	res.status(200).json({
		status: "success",
		message: "User profile fetched successfully",
		data: user,
	});
});
