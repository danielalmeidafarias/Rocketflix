const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.get('/api', async (req, res) => {
    try {
        const movies = await prisma.movieID.findMany()
        res.send(movies)
    } catch(error) {
        console.error(error)
    }
})

app.get('/api/random', async (req, res) => {
    try {
        const movies = await prisma.movieID.findMany({
            select: {
                id: true
            }
        }) 

        let movies_id = []

        movies.map(id => {
            id = id.id
            movies_id.push(id)
        })

        var indiceAleatorio = Math.floor(Math.random() * movies_id.length);
        var numeroSorteado = movies_id[indiceAleatorio];

        const movie = await prisma.movieID.findFirst({
            where: {
                id: Number(numeroSorteado)
            }
        })

        res.send(movie)
    } catch(error) {
        console.error(error)
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando em http:localhost:${port}`)
})
