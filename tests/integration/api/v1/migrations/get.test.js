import database from 'infra/database'

async function cleanDatabase() {
    await database.query("DROP schema public cascade");
    await database.query("CREATE schema public");
}

beforeAll(async () => {
    await cleanDatabase();
});

test("GET api/v1/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(201);

    const responseBody = await response.json();
    console.log("Response body:", responseBody);

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
});