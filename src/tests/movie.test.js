const request=require('supertest')
const app=require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
let movieId
let actor
let director
let genre
require('../models')

const movie={
    name: "Interestelar",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Interstellar-logo.jpg/220px-Interstellar-logo.jpg",
    synopsis: "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí. La Tierra está llegando a su fin y este grupo necesita encontrar un planeta más allá de nuestra galaxia que garantice el futuro de la raza humana.",
    releaseYear: 2014
}

const BASE_URL='/api/v1/movies'

//Create Of CRUD
test("POST -> '/movies' should return status code 201 and res.body.name===movie.name", async()=>{
    const res=await request(app)
    .post(BASE_URL)
    .send(movie)
    movieId=res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

//Read Of CRUD
test("GET -> '/movies' should return status code 200 and res.body[0].name===movie.name", async()=>{
    const res=await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe(movie.name)
})

//Update Of CRUD
test("PUT -> '/movies/:id' should return status code 200 and res.body.name===movieUpdate.name", async()=>{
    const movieUpdate={
        name: "Shrek 2",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Avatar_Flight_of_Passage_%2833825577724%29.jpg/220px-Avatar_Flight_of_Passage_%2833825577724%29.jpg",
        synopsis: "Entramos en el mundo Avatar de la mano de Jake Sully, un ex-Marine en silla de ruedas, que ha sido reclutado para viajar a Pandora, donde existe un mineral raro y muy preciado que puede solucionar la crisis energética existente en la Tierra.",
        releaseYear: 2009
    }

    const res=await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})

// Set Actors
test("POST -> '/movies/:id/actors', should return statusCode 200, and res.body.length=1", async()=> {
    actor= await Actor.create({
        firstName: "Jonathan",
        lastName: "Bailey",
        nationality: "Británico",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jonathan_Bailey_2015.jpg/220px-Jonathan_Bailey_2015.jpg",
        birthday: "1988-04-25"
    })
    const res=await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


// Set Directors
test("POST -> '/movies/:id/directors', should return statusCode 200, and res.body.length=1", async()=> {
    director= await Director.create({
        firstName: "Woody",
        lastName: "Allen",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Woody_Allen_Cannes_2016.jpg/220px-Woody_Allen_Cannes_2016.jpg",
        birthday: "1935-11-30"
    })
    const res=await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

// Set Genres
test("POST -> '/movies/:id/genres', should return statusCode 200, and res.body.length=1", async()=> {
    genre= await Genre.create({
        name: "Ciencia Ficción"
    })
    const res=await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


//Delete Of CRUD
test("DELETE -> '/movies/:id' should return status code 204", async()=>{
    const res=await request(app)
    .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
    await actor.destroy()
    await director.destroy()
    await genre.destroy()
})