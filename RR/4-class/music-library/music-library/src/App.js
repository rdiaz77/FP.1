import { useEffect, useState } from 'react'
import Gallery from './Gallery'
import Searchbar from './SearchBar'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    
    const handleSearch = (e,term) =>{
      e.preventDefault()
      setSearch(term)
    }

    const API_URL = 'https://itunes.apple.com/search?term='

    useEffect(() =>{

      if(search){
      const fetchData = async () =>{
        document.title = `${search} Music`
        const response = await fetch('https://itunes.apple.com/search?term=the%20grateful%20dead')
        const resData = await response.json()
        // console.log(response)
        console.log(resData)
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not found')
        }

      }
      fetchData()
    }

    }, [search])



    return (
        <div>

     
          <Searchbar handleSearch = {handleSearch} />
            {message}
            <Gallery data = {data} />
           
        </div>
    )
}

export default App

