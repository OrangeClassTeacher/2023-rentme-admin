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
    <div className='flex flex-wrap gap-8'>
        {products.map((item, ind) => {
            return(
                <div className='w-48'>
                    <h1>{item.itemName}</h1>
                    <p>{item.description}</p>
                    <h3>{item.rentalPrice}$</h3>
                    <h4>{item.rentalDate}</h4>

                    <div className='flex'>
                        <GrEdit/>
                        <button onClick={() => { console.log(item?._id);
                        deleteProduct(item?._id) }}>
                        <RiDeleteBin6Line />
                    </button>
                    
                    </div>
                </div>
            )
        })}
    </div>
  )
}
