const supertest = require("supertest");
const server = require("../server.js");
const db = require("../data/connection.js");

module.exports = () => describe("replate2TestSuite2", () => {

let token = '';

describe("server", () => {
    describe("Post /login", () => {

        it('should login users', () => {
            let res = supertest(server)
                .post('/api/auth/login')
                .send({
                    "username": "Varsh",
                    "password": "Varsh1"
                })
                .then(res => {
                    token = res.body.token;
                    expect(res.status).toEqual(200);
                })
        })
    });

    describe("GET /volunteers", () => {
        it('get volunteers', () => {
            return supertest(server).get('/api/volunteers')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toEqual(200);
                })
        });

        it('get a volunteer', async () => {
            return await supertest(server).get('/api/volunteers/1')
                .set('Authorization', token)
                .then(async (res) => {
                    expect(['both', 'volunteer']).toContain(res.body.role);
                })
        });


        it('edit a volunteer', () => {
            return supertest(server).put('/api/volunteers/1')
                .set('Authorization', token)
                .send({
                    "name": "Var1",
                    "username": "Varsh"
                })
                .then(res => {
                    console.log('Edit res.body:', res.body)
                    expect(res.body.name).toEqual("Var1")
                });
        });
    });

    // describe("Delete /volunteers", () => {
    //     it('delete a volunteer', () => {
    //         return supertest(server).delete('/api/volunteers/1')
    //             .set('Authorization', token)
    //             .then(res => {
    //                 expect(res.status).toEqual(200);
    //             })
    //     });
    // });

    describe("donor", () => {
        describe("Post /login", () => {
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

            it('get donors', () => {
                return supertest(server).get('/api/donors')
                    .set('Authorization', token)
                    .then(res => {
                        expect(res.status).toEqual(200);
                    })
            });

            it('get a donor', () => {
                return supertest(server).get('/api/donors/2')
                    .set('Authorization', token)
                    .then(async (res) => {
                        // console.log(res);
                        expect(res.body.username).toEqual('Gandalf');
                    })
            });

            it('edit a donor', () => {
                return supertest(server).put('/api/donors/2')
                    .set('Authorization', token)
                    .send({
                        "name": "Gandalf1",
                    })
                    .then(res => {
                        expect(res.body.name).toBe("Gandalf1");
                    })
            });

            // it('delete a donor', () => {
            //     return supertest(server).delete('/api/donors/2')
            //         .set('Authorization', token)
            //         .then(res => {
            //             expect(res.status).toEqual(200);
            //         })
            // });
            it('donors should be in json format', () => {
                return supertest(server).get('/api/donors')
                expect(res.type).toMatch(/json/i);
            })
        })
    });

    describe("foodItem", () => {
        describe("Post /foodItems", () => {
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

            it('post a foodItem', () => {
                return supertest(server).post('/api/users/3/foodItems')
                    .set('Authorization', token)
                    .send({
                        "name": "Fried chicken",
                        "type": "entree",
                        "quantity": "3 lbs"
                    })
                    .then(async (res) => {
                        console.log(res);
                        console.log('status:', res.status);
                        expect(res.body.name).toEqual('Fried chicken');
                    })
            });

            it('get foodItems', () => {
                return supertest(server).get('/api/foodItems')
                    .set('Authorization', token)
                    .then(res => {
                        expect(res.status).toEqual(200);
                    })
            });

            it('foodItems should be in json format', () => {
                return supertest(server).get('/api/foodItems')
                expect(res.type).toMatch(/json/i);
            });

            it('get a foodItem', async() => {
                return await supertest(server).get('/api/foodItems/1')
                    .set('Authorization', token)
                    .then(async (res) => {
                        // console.log(res);
                       await expect(res.body.name).toEqual('Fried chicken');
                    })
            });

            it('edit a foodItem', async() => {
                return supertest(server).put('/api/foodItems/1')
                    .set('Authorization', token)
                    .send({
                        "name": "Pasta",
                    })
                    .then(async(res) => {
                       await expect(res.body.name).toEqual("Pasta");
                    })
            });

            // it('delete a foodItem', () => {
            //     return supertest(server).delete('/api/foodItems/1')
            //         .set('Authorization', token)
            //         .then(res => {
            //             expect(res.status).toEqual(200);
            //         })
            // });
        })
    });
});

});