import React, {useEffect , useState} from 'react'
import axios from 'axios'

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr"

export default function index(): JSX.Element {
  const [users , setUsers] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get("http://localhost:8000/api/user")
    .then(res => {
      setUsers(res.data.result)
    })
    console.log(users);}
  
  return (
    <div className='flex flex-wrap gap-8'>
      {users.map((e) => {
        return(
          <div className='w-48'>
            <h1>{e.firstName}</h1>
            <p>{e.Username}</p>
            <p>{e.email}</p>
            <div className='flex'>
              <GrEdit/>
              <RiDeleteBin6Line />
            </div>
          </div>
        )
      })}
    </div>
  )
}
