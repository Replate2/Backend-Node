const supertest = require("supertest");
const server = require("../server.js");
const db = require("../data/connection.js");

module.exports = () => describe("authTestSuite1", () => {

    describe("server", () => {
        describe("GET /", () => {
            it("Should return an api value of up", () => {
                return supertest(server)
                    .get('/')
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            })

            it("Should return an api value of up", () => {
                return supertest(server)
                    .get('/')
                    .expect({api: 'up'})
            })
        })
    });

    describe("auth", () => {
        describe("Post /register", () => {
            it('should register users', async() => {
                await db("users").truncate();
                await db("foodItems").truncate();
                await db("volunteer_donor_foodItem").truncate();
                return supertest(server)
                    .post('/api/auth/register')
                    .send({
                        "name": "Var",
                        "username": "Varsh",
                        "password": "Varsh1",
                        "phoneNumber": "4507075000",
                        "address": "123 First st, Hayward, CA"
                    })
                    .then(res => {
                        //console.log('res:', res)
                        expect(res.status).toEqual(201);
                    })
            })

            it('should register users', async() => {
                return supertest(server)
                    .post('/api/auth/register')
                    .send({
                        "name": "Gandalf",
                        "username": "Gandalf",
                        "password": "Gandalf1",
                        "phoneNumber": "4107075000",
                        "address": "123 First st, Hayward, CA"
                    })
                    .then(res => {
                        //console.log('res:', res)
                        expect(res.status).toEqual(201);
                    })
            })

            it('should register users', async () => {
                return await supertest(server)
                    .post('/api/auth/register')
                    .send({
                        "name": "Robin",
                        "username": "robinhood",
                        "password": "rob1",
                        "phoneNumber": "4087079000",
                        "address": "123 First st, Fremont, CA"
                    })
                    .then(async (res) => {
                        const users = await db('users');
                        expect(users).toHaveLength(3);
                    })
            })

            it("should respond with json", async () => {
                const res = await supertest(server).post("/api/auth/register")
                    .send({
                        username: "Varsh"
                    })

                expect(res.type).toMatch(/json/i);
            });
        })

        let token = '';
        describe("Post /login", () => {
            it("should login users", async () => {
                let res = await supertest(server).post('/api/auth/login').send({
                    "username": "Varsh",
                    "password": "Varsh1"
                });
                token = res.body.token;
                const users = await db('users');
                expect(users).toHaveLength(3);
            });

            it('should login users', () => {
                let res =  supertest(server)
                    .post('/api/auth/login')
                    .send({
                        "username": "Gandalf",
                        "password": "Gandalf1"
                    })
                    .then(res => {
                        token = res.body.token;
                        expect(res.status).toEqual(200);
                    })
            });

            it('should login users', () => {
                let res =  supertest(server)
                    .post('/api/auth/login')
                    .send({
                        "username": "robinhood",
                        "password": "rob1"
                    })
                    .then(res => {
                        token = res.body.token;
                        expect(res.status).toEqual(200);
                    })
            });
        })
    });
});
