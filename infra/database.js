import { Client } from "pg";

// Função auxiliar para criar e conectar ao cliente PostgreSQL
async function createClient() {
	const client = new Client({
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		user: process.env.POSTGRES_USER,
		database: process.env.POSTGRES_DB,
		password: process.env.POSTGRES_PASSWORD,
		ssl: process.env.NODE_ENV === "development" ? false : true,
	});
	await client.connect();
	return client;
}

// Função genérica para executar a consulta
async function query(queryObject) {
	let client;
	let result;

	try {
		client = await createClient();
		result = await client.query(queryObject);
	} catch (error) {
		console.error("Erro ao executar consulta:", error);
	} finally {
		if (client) {
			await client.end(); // Garante que o cliente será fechado
		}
	}

	return result;
}

// Função para mostrar a versão do PostgreSQL
async function show_postgres_version() {
	let client;
	let result;

	try {
		client = await createClient();
		result = await client.query("SHOW server_version;");
	} catch (error) {
		console.error("Erro ao obter versão do PostgreSQL:", error);
	} finally {
		if (client) {
			await client.end(); // Garante que o cliente será fechado
		}
	}

	return result;
}

// Função para mostrar o máximo de conexões
async function show_max_conections() {
	let client;
	let result;

	try {
		client = await createClient();
		result = await client.query("SHOW max_connections;");
	} catch (error) {
		console.error("Erro ao obter max_connections:", error);
	} finally {
		if (client) {
			await client.end(); // Garante que o cliente será fechado
		}
	}

	return result;
}

// Função para retornar o número de conexões atuais
async function return_current_connections_count() {
	let client;
	let result;

	try {
		client = await createClient();
		const databaseName = process.env.POSTGRES_DB;
		result = await client.query({
			text: "SELECT count(*) FROM pg_stat_activity WHERE state = 'active' AND datname=$1;",
			values: [databaseName],
		});
	} catch (error) {
		console.error("Erro ao obter contagem de conexões ativas:", error);
	} finally {
		if (client) {
			await client.end(); // Garante que o cliente será fechado
		}
	}

	return result;
}

export default {
	query,
	pg_version: show_postgres_version,
	max_conn: show_max_conections,
	curr_conn: return_current_connections_count,
};
