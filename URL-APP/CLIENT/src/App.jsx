
import AllUrl from './feature/Get-Saved-Url/ui/AllUrl'
import UrlInput from './feature/Create-Short-Url/ui/UrlInput'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CurrentUrl from './feature/CurrentUrl/ui/CurrentUrl'

const App = () => {
  const [urlData, seturlData] = useState([])
  const [currentUlr, setCurrentUlr] = useState(null)
  async function getUrlData() {

    let response = await axios.get('http://localhost:5173/api/all')
    seturlData(response.data.data.allURLs)


  }

  useEffect(() => {
    getUrlData()
  }, [])


  return (
    <div className=' h-screen flex flex-col gap-5 justify-center items-center'>
      <UrlInput getUrlData={getUrlData} setCurrentUlr={setCurrentUlr}/>
      <CurrentUrl currentUlr={currentUlr}/>
      <AllUrl  urlData={urlData} getUrlData={getUrlData}/>
    </div>
  )
}

export default App