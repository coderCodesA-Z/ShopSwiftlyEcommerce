import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
	try {
		//get token from header
		const token = getTokenFromHeader(req);

		//verify the token
		const decodedUser = verifyToken(token);
		if (!decodedUser) {
			const error = new Error();
			error.message = "Invalid or Expired token, please login again";
			error.status = 401;
			throw error;
		} else {
			//save the user into req obj
			req.userAuthId = decodedUser?.id;
			next();
		}
	} catch (error) {
		throw error;
	}
};
