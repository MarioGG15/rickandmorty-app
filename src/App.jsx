import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import CharacterCard from './components/CharacterCard'
import imagen1 from "./assets/images/Imagen1.png"

function App() {
  const [ramLocation, setRamLocation] = useState({})

  const [searchId, setSearchId] = useState("")

  useEffect(() => {

    const randomLocation = Math.floor(Math.random()* 126) + 1

    axios.get(`https://rickandmortyapi.com/api/location/${randomLocation}`)
      .then(res => setRamLocation(res.data))
  }, [])

  console.log(ramLocation)

  const searchLocation = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${searchId}`)
      .then(res => setRamLocation(res.data))
  }

  return (
    <div className="App">
      <div className='header-container'>
        <img src={imagen1} alt="" className='banner-header' />
        <div className='search-container'>
          <input type="text" placeholder='Type a location ID' value={searchId} onChange={e => setSearchId(e.target.value)} />
          <button onClick={searchLocation} >Search</button>
        </div>
      </div>
      <div className='planet-card'>
        <h1>{ramLocation.name}</h1>
        <div className='planet-info'>
          <div className='planet-data'>
            <h2>Type:</h2>
            <p>{ramLocation.type}</p>
          </div>
          <div className='planet-data'>
            <h2>Dimension:</h2>
            <p>{ramLocation.dimension}</p>
          </div>
          <div className='planet-data'>
            <h2>Population:</h2>
            <p>{ramLocation.residents?.length}</p>
          </div>
        </div>
      </div>
      <ul className='grid-container'>
        {
          ramLocation.residents?.map(resident => (
            <CharacterCard characterUrl={resident} search={searchLocation} key={resident}/>
          ))
        }
      </ul>
    </div>
  )
}

export default App
