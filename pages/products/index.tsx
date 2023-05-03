import React , {useEffect , useState} from 'react'
import axios from "axios"

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr"

export default function Index() : JSX.Element {
    const [products , setProducts] = useState([])
    useEffect(() => {
        getData()
    }, [])


    
    const getData = () => {
        axios.get("http://localhost:8000/api/item")
            .then(res => {
                setProducts(res.data.result)
            })
           
            console.log(products);}

        const deleteProduct = (id : any) => {
        axios.delete(`http://localhost:8000/api/item/${id}`)
        .then(res => {
            console.log(res)
        })
        getData()
    }
  return (
    <div className='flex flex-wrap '>
        {products.map((item, ind) => {
            return(
                <div className='w-1/3 border border-indigo-500 rounded px-3 py-3'>
                    <img src={item.itemPhoto}/>
                    <h1>{item.itemName}</h1>
                    <p>{item.description}</p>
                    <h3>{item.rentalPrice}$</h3>
                    <h4>{item.rentalDate}</h4>

                    <div className='flex w-full'>
                        <button className='bg-yellow-500 hover:bg-yellow-700 text-
                        
                        font-bold py-2 px-4 flex text-xl justify-center rounded w-2/4'>
                        <GrEdit/>
                        </button>
                        
                        <button onClick={() => { console.log(item?._id);
                        deleteProduct(item?._id) }} className='bg-red-500 hover:bg-orange-700 text-white flex justify-center text-xl font-bold py-2 px-4 rounded w-2/4'>
                        <RiDeleteBin6Line />
                    </button>
                    
                    </div>
                </div>
            )
        })}
    </div>
  )
}
