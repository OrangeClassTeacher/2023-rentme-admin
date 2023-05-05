import React , {useEffect , useState} from 'react'
import axios from "axios"

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr"
import { CiCircleRemove } from "react-icons/ci";
import styles from "../Modal.module.css";

export default function Index() : JSX.Element {
    const [products , setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState("");
    const [itemData, setItemData] = useState({});
    const [categories , setCategories] = useState([])
    const [thumbImg , setThumbImg] = useState("")

    const getCatergories = () => {
        axios.get("http://localhost:8000/api/category")
        .then(res => {
            setCategories(res.data.result)
        })
        console.log(categories);}


    const createItem = async (event: any) => {
        event.preventDefault();
        const data = {
          itemName: event.target.itemName.value,
          itemPhoto: thumbImg,
          itemSlidePhoto: event.target.itemSlidePhoto.value,
          categoryId: event.target.categoryId.value,
          phoneNumber: event.target.phoneNumber.value,
          rating: event.target.rating.value,
          itemComment: event.target.itemComment.value,
          rentalPrice: event.target.rentalPrice.value,
          rentalStartDate: event.target.rentalStartDate.value,
          rentalEndDate: event.target.rentalEndDate.value,
          description: event.target.description.value,
        };
        try {
          if (id) {
            console.log("editItem", data);
    
            axios
              .put(`http://localhost:8000/api/item/${id}`, data)
              .then((res) => {
                handleModal();
                getData();
              })
              .catch((err) => {
                console.log(err);
              });
            setId("");
          } else {
            console.log("createItem", data);
    
            axios
              .post("http://localhost:8000/api/item", data)
              .then((res) => {
                handleModal();
                console.log(res.data.result);
              })
              .catch((err) => console.log(err));
            getData();
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleModal = (id: any) => {
        setModal(!modal);
        setIsEditing(!isEditing);
        setId(id);
    
        axios
          .get(`http://localhost:8000/api/item/${id}`)
          .then((res) => setItemData(res.data.result));
        getData();
      };

    useEffect(() => {
        getData()
        getCatergories()
    }, [])


    const getData = () => {
        axios.get("http://localhost:8000/api/item")
            .then(res => {
                setProducts(res.data.result)
            })
            console.log(products);}

    const deleteItem = (id : any) => {
        axios.delete(`http://localhost:8000/api/item/${id}`)
        .then(res => {
            console.log(res)
        })
        getData()
    }

  return (
    <>
    <div className='flex flex-wrap '>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleModal(), setId("");
          }}
        >
          Create Item
        </button>
        {products.map((item, ind) => {
            return(
                <div className='w-1/3 border border-indigo-500 rounded px-3 py-3'>
                    <img src={item.itemPhoto}/>
                    <h1>{item.itemName}</h1>
                    <p>{item.description}</p>
                    <h3>{item.rentalPrice}$</h3>
                    <h4>{item.rentalDate}</h4>

                    <div className='flex w-full'>
                        <button className='bg-yellow-500 hover:bg-yellow-700 text-font-bold py-2 px-4 flex text-xl justify-center rounded w-2/4'
                            onClick={() => handleModal(item._id)}
                            ><GrEdit/>
                        </button>
                        <button 
                            className='bg-red-500 hover:bg-orange-700 text-white flex justify-center text-xl font-bold py-2 px-4 rounded w-2/4'
                            onClick={() => deleteItem(item?._id)} 
                            ><RiDeleteBin6Line />
                        </button>
                    
                    </div>
                </div>
            )
        })}
    </div>
          {modal && (
            <div className={styles.modal}>
              <div onClick={handleModal} className={styles.overlay}></div>
              <div className={styles.modalContent}>
                Create item
                <form onSubmit={createItem} className="text-head">
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="itemName"
                      >
                        Нэр
                      </label>
                      <input
                        name="itemName"
                        type="text"
                        id="itemName"
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Нэр"
                        defaultValue={id ? itemData?.itemName : ""}
                      />
                    </div>
    
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="itemPhoto"
                      >
                        itemPhoto
                      </label>
                      <input
            placeholder="Item Photo..."
            type={"file"}
            name="itemPhoto"
            onChange={(e) => {
              const url = "https://api.cloudinary.com/v1_1/lwvom2iu/upload";
              const formData = new FormData();
              let file: any = e.target.files[0];
              formData.append("file", file);
              formData.append("api_key", "384825931744178");
              formData.append("folder", "RentMeProduct");
              formData.append("upload_preset", "lwvom2iu");

              axios.post(url, formData).then((res) => {
                setThumbImg(res.data.secure_url);
              });
            }}
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
          />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="itemSlidePhoto"
                      >
                        itemSlidePhoto
                      </label>
                      <input
                        name="itemSlidePhoto"
                        type="text"
                        id="itemSlidePhoto"
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Photos"
                        defaultValue={id ? itemData?.itemSlidePhoto : ""}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="categoryId"
                      >
                        Категори
                      </label>
                      <select
                        name="categoryId"
                        id="categoryId"
                        defaultValue={id ? itemData?.categoryId : ""}
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                      > 
                        {categories.map((item, ind) => {
                            return(
                                <option value={item.categoryName}>{item.categoryName}</option>
                            )
                        })}
                        {/* <option value="0">Сонгох....</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option> */}
                      </select>
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="phoneNumber"
                      >
                        Утасны дугаар
                      </label>
                      <input
                        name="phoneNumber"
                        type="tel"
                        id="phoneNumber"
                        placeholder="Утас"
                        defaultValue={id ? itemData?.phoneNumber : ""}
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="rating"
                      >
                        Үнэлгээ
                      </label>
                      <input
                        name="rating"
                        type="number"
                        id="rating"
                        defaultValue={id ? itemData?.rating : ""}
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Үнэлгээ"
                      />
                    </div>
    
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="itemComment"
                      >
                        Коммент
                      </label>
                      <input
                        name="itemComment"
                        type="text"
                        id="itemComment"
                        defaultValue={id ? itemData?.itemComment : ""}
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Коммент"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="rentalPrice"
                      >
                        rentalPrice
                      </label>
                      <input
                        name="rentalPrice"
                        type="number"
                        id="rentalPrice"
                        defaultValue={id ? itemData?.rentalPrice : ""}
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Үнэ"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="rentalStartDate"
                      >
                        Түрээслэх огноо
                      </label>
                      <input
                        name="rentalStartDate"
                        type="date"
                        id="rentalStartDate"
                        defaultValue={id ? itemData?.rentalStartDate : ""}
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Түрээслэх огноо"
                      />
                    </div>
                    <div className="w-[300px]">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="rentalEndDate"
                      >
                        Дуусах огноо
                      </label>
                      <input
                        name="rentalEndDate"
                        type="date"
                        id="rentalEndDate"
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Дуусах огноо"
                      />
                    </div>
                    <div className="w-[300px]">
                      <label
                        className="block mb-2 text-lg-medium text-teal-500"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <input
                        name="description"
                        type="text"
                        id="description"
                        className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                        placeholder="Тайлбар"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                    //     onSubmit={handleModal}
                        // onClick={handleModal}
                      className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
                {/* <button
                            onClick={()=> { console.log(id, editCat)
                                catEditor(id, editCat)}}
                        >
                            Save
                        </button> */}
                <button className={styles.closeModal} onClick={handleModal}>
                  <CiCircleRemove className="text-xl" />
                </button>
              </div>
            </div>
          )}
        </>
  )
}
