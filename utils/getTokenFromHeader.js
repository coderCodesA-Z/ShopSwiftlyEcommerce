export const getTokenFromHeader = (req) => {
	//get token from header
	const authorizationHeader = req.headers["authorization"];

	// If there's no Authorization header
	if (!authorizationHeader) {
		const error = new Error();
		error.message = "No Authorization Header Found";
		error.status = 400;
		throw error; // "No Authorization Header Found";
	}

	// The Authorization header is typically in the format "Bearer <token>"
	const [bearer, token] = authorizationHeader.split(" ");

	if (!bearer.startsWith("Bearer")) {
		// If the format is not as expected, throw error
		const error = new Error();
		error.message = "Format of Authorization Header is not valid";
		error.status = 400;
		throw error; // "Bearer token not found in the header";
	}

	if (!token) {
		return null; // "No token found in the header";
	}

	return token;
};
