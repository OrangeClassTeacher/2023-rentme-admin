import React, {useEffect , useState} from 'react'
import axios from 'axios'

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from "react-icons/gr"
import { IUser } from "../../interfaces/user";
import styles from "../Modal.module.css"

export default function index(): JSX.Element {
  const [users , setUsers] = useState([])


  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");

  const [newUser, setNewUser] = useState({});
  const [tempUser, setTempUser] = useState({
    firstName: "hi",
    lastName: "",
    Username: "",
    birthDate: "",
    email: "",
    phoneNumber: 0,
    address: "",
    role: "",
    favItems: [""],
    gender: "",
    profilePic: "",
    password: ""
  });
  const [editUser, setEditUser] = useState({});
  const registerUser = async (event: any) => {
    event.preventDefault();
    const data: IUser = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      Username: event.target.username.value,
      birthDate: event.target.birthDate.value,
      email: event.target.email.value,
      phoneNumber: event.target.phoneNumber.value,
      address: event.target.address.value,
      role: "User",
      favItems: ["HI"],
      gender: event.target.gender.value,
      profilePic: "hi",
      password: event.target.password.value,
    };
    // console.log(data);

    // if (event.target.password.value == event.target.rePassword.value) {
      setNewUser(data);
    // } else {
    //   alert("Нууц үг таарахгүй байна");
    // }

    try {
      if (newUser) {
        console.log(newUser);

        axios
          .post("http://localhost:8000/api/user", newUser)
          .then((res) => console.log(res.data.result))
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleModal = (id: any) => {
      setModal(!modal);
      setIsEditing(!isEditing);
      setId(id)
  }


  useEffect(() => {
    getData()
  }, [])


  const getData = () => {
    axios.get("http://localhost:8000/api/users")
    .then(res => {
      setUsers(res.data.result)
    })
    console.log(users);}


  //   const createUser = () => {
  //     axios.post("http://localhost:8000/api/category" , {
  //       {
  //         firstName : "BatErdene",
  //         lastName : "Ganzorig",
  //         Username : "Ganzo",
  //         email : "baterdeneganzorig99@gmail.com",
  //         birthDate : "2004-07-21",
  //         phoneNumber : 89018417,
  //         role : "Admin",
  //         address : "UB",
  //         password : "123",
  //         gender : "Male",
  //         favItems : ["hi"]
  //      } 
  //     })
  //     .then(res => {
  //         console.log(res)
  //         getData()
  //     })
  // }

  const deleteUser = (id : any) => {
      axios.delete(`http://localhost:8000/api/user/${id}`)
      .then(res => {
          console.log(res)
          getData()
      })
  }
     console.log(users);

  // const userEditor = (id : any) => {
  //     axios.put(`http://localhost:8000/api/category/${id}`,{
  //         parentId : parentId,
  //         categoryName: editCat
  //     })
  //     .then(res => {
  //         console.log(res)
  //         getData();
  //         handleModal()
  //     })
  // }

  
  return (
    <>
      <div className='flex flex-wrap gap-8'>
        <button
          onClick={() => handleModal()}>+
        </button>
        {users.map((item, ind) => {
          return(
            <div className='w-48'>
              <h1>{item.firstName}</h1>
              <p>{item.lastName}</p>
              <p>{item.Username}</p>
              <p>{item.birthDate}</p>
              <p>{item.email}</p>
              <p>{item.phoneNumber}</p>
              <p>{item.address}</p>
              <p>{item.role}</p>
              <p>{item.favItems}</p>
              <p>{item.gender}</p>
              <p>{item.profilePic}</p>
              <p>{item.password}</p>
              <div className='flex'>
                  <button 
                    onClick={()=> { console.log(item?._id); handleModal(item?._id)
                    // setTempUser({ 
                    //   firstName: {item?.firstName},
                    //   lastName: {item?.lastName},
                    //   Username: {item?.Username},
                    //   birthDate: {item?.birthDate},
                    //   email: {item?.email},
                    //   phoneNumber: {item?.phoneNumber},
                    //   address: {item?.address},
                    //   role: {item?.role},
                    //   favItems: {item?.favItems},
                    //   gender: {item?.gender}
                    //   profilePic: {item?.profilePic}
                    //   password: {item?.password}
                    // })
                  }}
                  >
                    <GrEdit/>
                  </button>
                  <button
                    onClick={()=>deleteUser(item?._id)}>
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
                    {/* <p>{id}</p>
                    <p>{catName}</p> */}
                    <form
        onSubmit={(event) => {
          registerUser(event);
        }}
        className="text-head"
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="firstName"
            >
              Нэр
            </label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Нэр"
              value={tempUser.firstName}
            />
          </div>

          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="lastName"
            >
              Овог
            </label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Овог"
            />
          </div>
          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="username"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              id="username"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Овог"
            />
          </div>
          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="gender"
            >
              Хүйс
            </label>
            <select
              name="gender"
              id="gender"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            >
              <option value="0">Сонгох....</option>
              <option value="Male">Эрэгтэй</option>
              <option value="Female">Эмэгтэй</option>
            </select>
          </div>
          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="birthDate"
            >
              Төрсөн өдөр
            </label>
            <input
              name="birthDate"
              type={"date"}
              id="birthDate"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            />
          </div>
          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="email"
            >
              И-мэйл
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="И-мэйл"
            />
          </div>

          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="phone"
            >
              Утасны дугаар
            </label>
            <input
              name="phoneNumber"
              type="number"
              id="phone"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Утасны дугаар"
            />
          </div>
          <div className="w-full">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="address"
            >
              Хаяг
            </label>
            <input
              name="address"
              type="text"
              id="address"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Оршин суугаа хаяг"
            />
          </div>
          <div className="w-[300px]">
            <label
              className="block mb-2 text-lg-medium text-teal-500"
              htmlFor="password"
            >
              Нууц үг
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Нууц үг"
            />
          </div>
        </div>

        <button
          type="submit"
          className="block w-full py-4 bg-color-6 text-head rounded-lg mb-5 hover:bg-color-6/70 duration-300 text-teal-500"
        >
          Бүртгүүлэх
        </button>

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
