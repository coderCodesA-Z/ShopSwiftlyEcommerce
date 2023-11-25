import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import createErrorObject from "../utils/createErrorObject.js";

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProductCtrl = asyncHandler(async (req, res) => {
	const { name, description, category, sizes, colors, price, totalQty, brand } =
		req.body;

	const error = new Error();

	if (
		!name ||
		!description ||
		!category ||
		!sizes ||
		!colors ||
		!price ||
		!totalQty ||
		!brand
	) {
		throw createErrorObject(error, "Please provide all fields", 400);
	}

	// const convertedImgs = req.files.map((file) => file?.path);

	// Product exists
	const productExists = await Product.findOne({ name });
	if (productExists) {
		throw createErrorObject(error, "Product Already Exists", 409);
	}

	// find the brand

	// find the category

	// create the product
	const product = await Product.create({
		name,
		description,
		category,
		sizes,
		colors,
		user: req.userAuthId,
		price,
		totalQty,
		brand,
		// images: convertedImgs,
	});

	// push the product into category

	//push the product into brand

	// send response
	res.json({
		status: "success",
		message: "Product created successfully",
		product,
	});
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
  const products = await Product.find();
	res.json({
		status: "success",
		message: "Products fetched successfully",
		products,
	});
});