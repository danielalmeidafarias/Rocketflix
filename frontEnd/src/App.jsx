import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaRandom } from 'react-icons/fa'
import axios from 'axios'

function App() {

  const [movieTitle, setMovieTitle] = useState('')
  const [movieImage, setMovieImage] = useState('')
  const [movieDescription, setMovieDescription] = useState('')

  const [click, setClick] = useState(false)

  const [randomId, setRandomId] = useState('')
  console.log(randomId)

  const getMovie = async () => {

    const url = `https://api.themoviedb.org/3/keyword/${randomId}/movies?include_adult=false&language=pt-BR&page=1`

    const options = {

      method: 'GET',
      url: url,
      headers: {
        'accept' : 'aplication/json',
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjU3MzYyZjAwMjcyZjA1MDk2MjdmNGRmZTdlNWQwMSIsInN1YiI6IjY0YTYxOGM2Y2FlNjMyMDExZmEyY2EyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GWCoOFRyQYjAmV90XYZZrz4DF6PyG0y-XDBpHa2PRcA'
      }

    }

    axios(options)
      .then((response) => {
        console.log(response.data.results[0].title)
        setMovieTitle(response.data.results[0].title)
        setMovieImage(response.data.results[0].poster_path)
        setMovieDescription(response.data.results[0].overview)
      })
      .catch((err) => {
        console.error(err)
      })

  }

  const getRandomId = async () => {

    const response = await axios.get('http://localhost:5000/api/random')

    if (response) {

      setRandomId(response.data.id)

    }

  }


  useEffect(() => {

    getRandomId()
    getMovie()
    setClick(false)

  }, [click])


  return (
    <div className='w-screen h-screen flex flex-col items-center md:p-10 pt-8'>
      <div className='flex gap-2 justify-center items-center w-full'>
        <button 
        onClick={() => setClick(true)}
        className='btn w-20 flex items-center'>
          <FaRandom size={40}/>
        </button>
        <h1 className='text-5xl md:text-6xl'>Rocketflix</h1>
      </div>

      <div className='md:w-[60vw] w-screen justify-center flex flex-col md:flex-row md:p-10 p-3'>
        <div className='md:w-1/2 flex flex-col items-center gap-3'>
          <h2 className='text-3xl font-extrabold'>{movieTitle}</h2>
          <div className='w-full flex items-center justify-center'>
            <img className='border-[1px] border-zinc-300 rounded-md w-96 sm:w-52' src={`https://image.tmdb.org/t/p/w500${movieImage}`} alt="" />

          </div>
        </div>

        <div className='md:w-1/2 flex flex-col item-center justify-center p-3'>
          <p className='text-center md:text-md text-xl font-light'>{movieDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default App
