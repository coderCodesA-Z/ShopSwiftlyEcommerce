export default function createErrorObject(
	error,
	message,
	statusCode
) {
	error.message = message;
	error.status = statusCode;
	return error;
};
