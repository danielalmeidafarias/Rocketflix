import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
const movies = './output.json'

const fs = require('fs');
const readline = require('readline');


// export interface Movies {
//     adult: boolean;
//     id: number;
//     original_title: string;
//     popularity: number;
//     video: boolean;
// }

async function main() {

  const leitor = readline.createInterface({
    input: fs.createReadStream(movies),
    output: process.stdout,
    terminal: false
  });

  leitor.on('line', async (movieResponse: string) => {
    const movie = JSON.parse(movieResponse)
    const movieId = movie.id
    await prisma.movieID.createMany({
      data: {
        id: movieId
        // adult: movie.adult,
        // original_title: movie.original_title,
        // popularity: movie.popularity,
        // video: movie.video
      }
    })

    console.log(movieId)


  });

  leitor.on('close', () => {
    console.log('Leitura concluída');
  });


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })