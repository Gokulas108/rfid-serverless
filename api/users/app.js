const pool = require("/opt/nodejs/utils/db.js");

exports.lambdaHandler = async (event, context) => {
	let statusCode=200;
	let data = [];

    try {
        const client = await pool.connect();
        const query = `SELECT * FROM users`;
	 	const res = await client.query(query);
        for (let row of res.rows) {
            data.push(row);
        }
        statusCode = 200;
        client.release();
    } catch (err) {
        client.release();
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