import React, {useEffect, useState} from 'react'
import axios from "axios"

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr";
import styles from "./Modal.module.css"



export default function index() : JSX.Element {
    const [categories , setCategories] = useState([])
    const [parentId , setParentId] = useState("")
    const [categoryName , setCategoryName] = useState("")
    const [id , setId] = useState("")

    const [modal, setModal] = useState(false);
    
    const handleModal = (id) => {
    setModal(!modal);
    setId(id)
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("http://localhost:8000/api/category")
        .then(res => {
            setCategories(res.data.result)
        })
        console.log(categories);}
    const createCategory = () => {
        axios.post("http://localhost:8000/api/category" , {
            parentId : parentId,
            categoryName: categoryName
        })
        .then(res => {
            console.log(res)
        })
        getData()
    }

    const deleteCategory = (id : any) => {
        axios.delete(`http://localhost:8000/api/category/${id}`)
        .then(res => {
            console.log(res)
        })
        getData()
    }
       console.log(categories);

    const editCategory = (id : any) => {
        axios.put(`http://localhost:8000/api/category/${id}`)
        .then(res => {
            console.log(res)
        })}
       
  return (
    <>
        <div className='flex flex-wrap gap-8'>
            <div className='w-48'>
                <input type='text' onChange={(e) => {setParentId(e.target.value)}}/>
                <input type='text' onChange={(e) => {setCategoryName(e.target.value)}}/>
                <button onClick={createCategory}>Create</button>
            </div>
            {categories.map((item, ind) => {
                return(
                    <div className='w-48' key={ind}>
                        <h1>{item.categoryName}</h1>
                        <div className='flex'>
                            <button 
                                onClick={()=> handleModal(item._id)}
                                // onClick={() => { console.log(item?._id);
                                // editCategory(item?._id) }}
                                >
                                <GrEdit/>
                            </button>
                            
                            <button 
                                onClick={() => { console.log(item?._id);
                                deleteCategory(item?._id) }}>
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        {modal && (
            <div className={styles.modal}>
                <div 
                    onClick={handleModal} 
                    className={styles.overlay}>
                </div>
                <div className={styles.modalContent}>
                    <h2>Hello modal</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum beatae saepe nesciunt veritatis omnis expedita consequuntur minus obcaecati. Temporibus beatae, illo exercitationem ut laboriosam iste nulla officiis sint corrupti non fugiat aliquam voluptatum consequuntur, tempore architecto delectus debitis repellat? Non labore similique obcaecati, vero culpa dolore libero adipisci veniam dolorem?
                    </p>
                    <p>{id}</p>
                <button 
                className={styles.closeModal}
                onClick={handleModal}
                >
                    Close
                </button>
            </div>
        </div>
        )}
       
    </>
  )
}

