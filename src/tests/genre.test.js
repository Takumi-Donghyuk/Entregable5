const request=require('supertest')
const app=require('../app')
let genreId


const genre= {
    name: "Pop"
}

const BASE_URL= '/api/v1/genres'

// Create Of CRUD
test("POST -> '/genres', should return status code 201 and res.body.name===genre.name",
    async()=>{
        const res=await request(app)          
        .post(BASE_URL)
        .send(genre)

        genreId=res.body.id
        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
})

// Read Of CRUD
// Get All
test("GET -> '/genres', should return status code 200 and res.body[0].name===genre.name", async()=>{
    const res=await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(genre.name)
})

// Update Of CRUD
test("PUT -> '/genres/:id' should return status code 200 and res.body.name===genreUpdate.name", async()=>{
    const genreUpdate={
        name:"Salsa"
    }
    const res=await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
})

// Delete Of CRUD
test("DELETE -> '/genres/:id' should return status code 204", async () => {
    const res=await request(app)
    .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})