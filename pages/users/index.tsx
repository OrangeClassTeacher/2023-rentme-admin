import React, { useEffect, useState } from "react";
import axios from "axios";

import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { IUser } from "../../interfaces/user";
import { CiCircleRemove } from "react-icons/ci";
import styles from "../Modal.module.css";

export default function index(): JSX.Element {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({});
  const [newUser, setNewUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const registerUser = async (event: any) => {
    console.log("chekc");
    event.preventDefault();
    const data: IUser = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      Username: event.target.username.value,
      birthDate: event.target.birthDate.value,
      email: event.target.email.value,
      phoneNumber: event.target.phoneNumber.value,
      address: event.target.address.value,
      role: event.target.role.value,
      favItems: ["HI"],
      gender: event.target.gender.value,
      profilePic: "hi",
      password: event.target.password.value,
    };

    if (id != "") {
      console.log("edit");

      setEditUser(data);
 
    } else if (!id) {
      setNewUser(data);
 
    }
    try {
      if (newUser && !id) {
        axios
          .post("http://localhost:8000/api/user", newUser)
          .then((res) => {console.log(res.data.result) , getData()})
          .catch((err) => console.log(err));
      } else if (editUser && id) {
        axios
          .put(`http://localhost:8000/api/user/${id}`, editUser)
          .then((res) => {console.log(res.data.result) , getData() })
          .catch((err) =>{ console.log(err);
          });
        
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
      .get(`http://localhost:8000/api/user/${id}`)
      .then((res) => setUserData(res.data.result));
      getData()
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("http://localhost:8000/api/users").then((res) => {
      setUsers(res.data.result);
    });
    console.log(users);
  };

  const deleteUser = (id: any) => {
    axios.delete(`http://localhost:8000/api/user/${id}`).then((res) => {
      console.log(res);
      getData();
    });
  };
  // console.log(id);

  return (
    <>
      <div className="flex flex-wrap gap-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleModal}
        >
          Create User
        </button>

        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border border-indigo-600">
                <th>№</th>
                <th>Нэр</th>
                <th>Овог</th>
                <th>Хэрэглэгчийн нэр</th>
                <th>Төрсөн өдөр</th>
                <th>Имэйл</th>
                <th>Утасны дугаар</th>
                <th>Хаяг</th>
                <th>Хүйс</th>
                <th>Хэрэглэгчийн төрөл</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, ind) => {
                return (
                  <tr className="border border-indigo-600">
                    <td>{ind + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.Username}</td>
                    <td>{item.birthDate}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.address}</td>
                    <td>{item.gender}</td>
                    <td>{item.role}</td>
                    <td className="flex gap-1">
                      <button
                        onClick={() => deleteUser(item?._id)}
                        className="bg-red-500 hover:bg-orange-700 text-white flex justify-center text-xl font-bold py-2 px-4 rounded "
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-
                        
                        font-bold py-2 px-4 flex text-xl justify-center rounded "
                        onClick={() => handleModal(item._id)}
                      >
                        <GrEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className={styles.modal}>
          <div onClick={handleModal} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            Create User
            <form onSubmit={registerUser} className="text-head">
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
                    defaultValue={id ? userData?.firstName : ""}
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
                    defaultValue={id ? userData?.lastName : ""}
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
                    defaultValue={id ? userData?.Username : ""}
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
                    defaultValue={id ? userData?.gender : ""}
                    className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                  >
                    <option value="0">Сонгох....</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                    defaultValue={id ? userData?.birthDate : ""}
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
                    defaultValue={id ? userData?.email : ""}
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
                    defaultValue={id ? userData?.phoneNumber : ""}
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
                    defaultValue={id ? userData?.address : ""}
                    className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                    placeholder="Оршин суугаа хаяг"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block mb-2 text-lg-medium text-teal-500"
                    htmlFor="role"
                  >
                    Хэрэглэгчийн төрөл
                  </label>
                  <select
                    name="role"
                    // defaultValue={id ? userData?.role : ""}
                    className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
                  >
                    <option value={"0"}>Сонгох...</option>
                    <option value={"User"}>Хэрэглэгч</option>
                    <option value={"Admin"}>Админ</option>
                  </select>
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  
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
  );
}
