import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const api = axios.create({
    baseURL : 'http://localhost:5173',
    withCredentials : true
})

const useApi = ()=>{
    const {accessToken}  = useAuth()

    if(!accessToken){
        
    }
}