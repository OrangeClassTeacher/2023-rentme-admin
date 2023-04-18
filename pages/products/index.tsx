import React , {useEffect , useState} from 'react'
import axios from "axios"

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

            
  return (
    <div className='flex flex-wrap gap-8'>
        {products.map((e) => {
            return(
                <div className='w-48'>
                    <h1>{e.itemName}</h1>
                    <p>{e.description}</p>
                    <h3>{e.rentalPrice}$</h3>
                    <h4>{e.rentalDate}</h4>
                </div>
            )
        })}
    </div>
  )
}
