const request=require('supertest')
const app=require('../app')
let actorId


const actor= {
    firstName: "Leonardo",
    lastName: "DiCaprio",
    nationality: "Estadounidense",
    image: "https://media.revistagq.com/photos/5f44b19dcb266484bb785c3a/1:1/w_699,h_699,c_limit/leonardo-dicaprio-estilo-90-2020.jpg",
    birthday: "1974-11-11"
}

const BASE_URL= '/api/v1/actors'

// Create Of CRUD
test("Post -> '/actors', should return status code 201 and res.body.firstName===actor.firstName", async () => {
    const res= await request(app)
    .post(BASE_URL)
    .send(actor)

    actorId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

// Read Of CRUD
// Get All
test("Get -> '/actors', should return status code 200 and res.body[0].firstName===actor.firstName", async() => {
    const res=await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(actor.firstName)
    expect(res.body).toHaveLength(1)
})

// Update Of CRUD
test("Put -> '/actors/:id', should return status code 200, res.body.firstName===actorUpdate.firstName", async () => {
    const actorUpdate= {
        firstName: "Zac",
        lastName: "Efron",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Zac_Efron%2C_Eva_Rinaldi_Photography_%2810%29_%2834732926735%29.jpg/220px-Zac_Efron%2C_Eva_Rinaldi_Photography_%2810%29_%2834732926735%29.jpg",
        birthday: "1987-10-18"
    }
    const res=await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
    expect(res.body.lastName).toBe(actorUpdate.lastName)
})

// Delete Of CRUD
test("Delete -> '/actors/:id', should return status code 204", async()=> {
    const res=await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})