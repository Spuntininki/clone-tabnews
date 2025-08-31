import database from 'infra/database'

async function cleanDatabase() {
    await database.query("DROP schema public cascade");
    await database.query("CREATE schema public");
}

beforeAll(async () => {
    await cleanDatabase();
});

test("POST api/v1/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
    });
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);

    const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
    });
    expect(response2.status).toBe(200);

    const responseBody2 = await response2.json();

    expect(responseBody2.length).toBe(0);


});
