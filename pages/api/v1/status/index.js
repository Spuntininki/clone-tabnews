import database from "infra/database.js";

async function status(request, response) {
	let result = await database.pg_version();
	const pg_version = result.rows[0]["server_version"];
	console.log(pg_version);
	result = await database.max_conn();
	const max_conn = result.rows[0]["max_connections"];
	result = await database.curr_conn();
	const curr_conn = result.rows[0]["count"];

	const updatedAt = new Date().toISOString();
	return response.status(200).json({
		updated_at: updatedAt,
		dependencies: {
			database: {
				pg_version: pg_version,
				max_conn: parseInt(max_conn),
				curr_conn: parseInt(curr_conn),
			},
		},
	});
}

export default status;
