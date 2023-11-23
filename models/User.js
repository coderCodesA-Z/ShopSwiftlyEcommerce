import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		orders: [
			{
				type: Schema.Types.ObjectId, // reference id of the document, better performance
				ref: "Order",
			},
		],
		wishlist: [
			{
				type: Schema.Types.ObjectId,
				ref: "Wishlist",
			},
		],
		isAdmin: {
			type: Boolean,
			default: false,
		},
		// needed in frontend
		hasShippingAddress: {
			type: Boolean,
			default: false,
		},
		shippingAddress: {
			firstName: {
				type: String,
			},
			lastName: {
				type: String,
			},
			address: {
				type: String,
			},
			city: {
				type: String,
			},
			postalCode: {
				type: String,
			},
			province: {
				type: String,
			},
			country: {
				type: String,
			},
			phone: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

// create model from schema, model name is User, schema is UserSchema, collection name is users, collection name is pluralized[in mongoDB 'users' will get created] and synchronized by mongoose
const User = mongoose.model("User", UserSchema);
export default User;
