import React, {useEffect, useState} from 'react'
import axios from "axios"

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr";


//trying to make a modal for confirmation
{/* <div className = "flex ml-auto mr-auto">XP; {currentExp}</div>
    {confirmationModalOpen && (
    <ConfitmationModal
        isOpen={confirmationModalOpen}
        handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
            <div className='flex flex-col justify-between h-full w-full'>
                <div className='flex flex-col mb-auto items-center p-8'>
                    <span>Are you sure </span>
                    <span>Helllooo</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-8 align-center">
                    <button 
                        className="bg-red-500 text-white p-2 rounded-md" 
                        onClick={() => 
                            setConfirmationModalOpen(!confirmationModalOpen)}>Cancel
                    </button>
                    <button 
                        className="bg-green-500 text-white p-2 rounded-md"
                        onClick={() => handleCancelPomodoro()}
                    >Cancel Pomodoro</button>

                </div>
            </div>
    </ConfitmationModal> */}




export default function index() : JSX.Element {
    const [categories , setCategories] = useState([])
    const [parentId , setParentId] = useState("")
    const [categoryName , setCategoryName] = useState("")
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
        })

       
  return (
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
                    <button onClick={() => { console.log(item?._id);
                    editCategory(item?._id) }}>
                    }}><GrEdit/></button>
                    
                    <button onClick={() => { console.log(item?._id);
                    deleteCategory(item?._id) }}>
                    <RiDeleteBin6Line />
                    </button>
                    
                    </div>
                </div>
            )
        })}
    </div>
  )
}

