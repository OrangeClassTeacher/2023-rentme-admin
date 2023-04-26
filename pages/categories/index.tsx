import React, {useEffect, useState} from 'react'
import axios from "axios"

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr";
import styles from "./Modal.module.css"
import { Console } from 'console';



export default function index() : JSX.Element {
    const [categories , setCategories] = useState([])
    const [parentId , setParentId] = useState("")
    const [newCat , setNewCat] = useState("")
    const [id , setId] = useState("")
    const [catName , setCatName] = useState("")

    const [modal, setModal] = useState(false);
    const [editCat, setEditCat] = useState("");
    
    const handleModal = (id, catName) => {
        setModal(!modal);
        setId(id)
        setCatName(catName)
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
            categoryName: newCat
        })
        .then(res => {
            console.log(res)
            getData()
        })
    }

    const deleteCategory = (id : any) => {
        axios.delete(`http://localhost:8000/api/category/${id}`)
        .then(res => {
            console.log(res)
            getData()
        })
    }
       console.log(categories);

    const catEditor = (id : any) => {
        axios.put(`http://localhost:8000/api/category/${id}`,{
            parentId : parentId,
            categoryName: editCat
        })
        .then(res => {
            console.log(res)
            getData();
            handleModal()
        })
    }
       
  return (
    <>
        <div className='flex flex-wrap gap-8'>
            <div className='w-48'>
                <input type='text' onChange={(e) => {setParentId(e.target.value)}}/>
                <input type='text' onChange={(e) => {setNewCat(e.target.value)}}/>
                <button onClick={createCategory}>Create</button>
            </div>
            {categories.map((item, ind) => {
                return(
                    <div className='w-48' key={ind}>
                        <h1>{item.categoryName}</h1>
                        <div className='flex'>
                            <button 
                                onClick={()=> handleModal(item._id, item.categoryName)}
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
                    <p>{id}</p>
                    <p>{catName}</p>
                    <form>
                        <label>Өөрчлөх утгаа оруулна уу</label>
                        <input 
                            type="text" 
                            onChange={(e) => {setEditCat(e.target.value)}}
                        />
                    </form>
                    <button
                        onClick={()=> { console.log(id, editCat)
                            catEditor(id, editCat)}}
                    >
                        Save
                    </button>
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

