const request=require('supertest')
const app=require('../app')
let directorId

const director={
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "Estadounidense",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg/270px-MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg",
    birthday: "1946-12-18"
}

const BASE_URL='/api/v1/directors'

//Create Of CRUD
test("POST -> '/directors' should return status code 201 and res.body.lastName===director.lastName", async()=>{
    const res=await request(app)
    .post(BASE_URL)
    .send(director)

    directorId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(director.lastName)
})

//Read of CRUD
test("GET -> '/directors' should return status code 200 and res.body[0].lastName===director.lastName", async()=>{
    const res=await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].lastName).toBe(director.lastName)
})

//Update of CRUD
test("PUT -> '/directors/:id' should return status code 200 and res.body.lastName===directorUpdate.lastName", async()=>{
    const directorUpdate={
        firstName: "Alfred",
        lastName: "Hitchcock",
        nationality: "Británico",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hitchcock%2C_Alfred_02.jpg/220px-Hitchcock%2C_Alfred_02.jpg",
        birthday: "1899-08-13"
    }
    const res=await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(directorUpdate.lastName)
})

//Delete Of CRUD
test("DELETE -> '/directors/:id' should return code 204", async() => {
    const res=await request(app)
    .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})