const db = require("/opt/nodejs/utils/db.js");

exports.lambdaHandler = async (event, context) => {
    
	let statusCode=200;
	let data = [];

    try {
        const users = await db.any('SELECT * FROM users');
        data = users;
        statusCode = 200;
    } catch (err) {
        statusCode = 400;
		data = err.stack;
    }

	response = {
		statusCode: statusCode,
		body: JSON.stringify({
			message: data,
		}),
	};

	return response;
};