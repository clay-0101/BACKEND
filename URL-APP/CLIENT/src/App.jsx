
import AllUrl from './feature/Get-Saved-Url/ui/AllUrl'
import UrlInput from './feature/Create-Short-Url/ui/UrlInput'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [urlData, seturlData] = useState([])
  async function getUrlData() {

    let response = await axios.get('http://localhost:5173/api/all')
    seturlData(response.data.data.allURLs)

  }

  useEffect(() => {
    getUrlData()
  }, [])
  return (
    <div className=' h-screen flex flex-col justify-center items-center'>
      <UrlInput getUrlData={getUrlData}/>
      <AllUrl  urlData={urlData}/>
    </div>
  )
}

export default App