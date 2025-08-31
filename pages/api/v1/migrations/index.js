import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
export default async function migrations(request, response) {
	const defaultMigrationOptions = {
		databaseUrl: process.env.DATABASE_URL,
		dir: join("infra", "migrations"),
		direction: "up",
		verbose: true,
		migrationsTable: "pgmigrations",
	};

	if (request.method === "GET") {
		const pendingMigrations = await migrationRunner({
			...defaultMigrationOptions,
			dryRun: true,
		});
		return response.status(201).json(pendingMigrations);
	}

	if (request.method === "POST") {
		const migratedMigrations = await migrationRunner({
			...defaultMigrationOptions,
			dryRun: false,
		});
		return response.status(200).json(migratedMigrations);
	}


	return response.status(405).end();
}
