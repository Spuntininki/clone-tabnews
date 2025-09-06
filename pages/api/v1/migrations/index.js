import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
export default async function migrations(request, response) {
	try {
		const allowedMethods = ["GET", "POST"];
		if (!allowedMethods.includes(request.method)) {
			return response.status(405).json(
				{ error: `Method ${request.method} Not Allowed` }
			);
		}
		

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
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: "Internal Server Error" });
	}
}
