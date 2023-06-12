import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.css";
import Link from "next/link";
import Head from "next/head";
import { data } from "../../../data/data";
import SideBar from "../../pages/sidebar";
import axios from "axios";


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3c11-64-224-97-221.ngrok-free.app/v1/test/User-dash"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  interface User {
    firstName: string;
    profile: {
      firstname: string;
      lastname: string;
    };
    email: string;
    roles: string;
  }

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const openModalAddd = () => {
    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  return (
    <>
      <div>
        <Head>
          <title>Admin Dashboard</title>
        </Head>
      </div>
      <main>
        <div className={styles.dashboard_container}>
          <SideBar></SideBar>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.h1_header}>Account Lists</h1>
              <div className={styles.logout}>
                <h5 className={styles.adminName}>Joshua</h5>
                <Link href="/" passHref legacyBehavior>
                  <button className={styles.logoutbtn}>Logout</button>
                </Link>
              </div>
            </div>
            <div className="">
              <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto h-[38em] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <div className="flex">
                  <div>
                    <button
                      className={styles.addnewbtn}
                      onClick={() => openModalAddd()}
                    >
                      + Add New
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="shadow appearance-none border rounded w-[300px] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ms-3"
                    />
                  </div>
                </div>
                <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-4 items-center justify-between cursor-pointer">
                  <span className="sm:text-left text-right">Firstname</span>
                  <span className="sm:text-left text-right">Lastname</span>
                  <span className="hidden md:grid">Email</span>
           
                  <span className="hidden sm:grid justify-center">Actions</span>
                </div>
                <ul>
                  {users
                    .filter((user) => {
                      const username = user.email;
                      return username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    })
                    .filter((user) => {
                        const landlords = user.userType === "landlord";
                        return landlords
                      })
                    .map((user, id) => (
                      <li
                        key={id}
                        className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-4 items-center"
                      >
                        <div className="flex items-center">
                          <p className="pl-4">{user.firstName}</p>
                        </div>
                        <div className="flex">
                          <p className="">{user.lastName}</p>
                        </div>
                        <div className="flex items-center justify-start">
                          <p className="">{user.email}</p>
                        </div>
                    
                        <div className="sm:flex hidden justify-center items-center">
                          <button
                            className={styles.updatebtn}
                            onClick={() => openModal(user)}
                          >
                            Edit
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className="font-medium text-xl border-b-2 border-solid border-indigo-500 mb-3">
              Account Details
            </h2>
            {selectedUser && (
              <>
                <div className="mb-5 grid grid-cols-7 gap-0 border-b-2 border-solid border-indigo-500 mb-3">
                  <label className="font-medium text-l col-span-1 items-center">
                    Firstname:
                  </label>
                  <p className="col-span-2">{selectedUser.firstName}</p>
                  <label className="font-medium text-l col-span-1">
                    Lastname:
                  </label>
                  <p className="col-span-3">{selectedUser.lastName}</p>
                  <label className="font-medium text-l col-span-1">
                    Email:
                  </label>
                  <p className="col-span-2">{selectedUser.email}</p>
                  <label className="font-medium text-l col-span-1">
                    Age:
                  </label>
                  <p className="col-span-3">{selectedUser.age}</p>
                  <label className="font-medium text-l col-span-1">Gender:</label>
                  <p className="col-span-6 mb-3">{selectedUser.gender}</p>
                </div>

                <form className={styles.addForm}>
                  <div className="grid gap-3 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 font-medium text-l">
                        Firstname:
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                          type="text"
                          value={selectedUser.firstName}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-l">
                        Lastname:
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                          type="text"
                          value={selectedUser.lastName}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-l">
                        Email:
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                          type="text"
                          value={selectedUser.email}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-l">
                        Age:
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                          type="text"
                          value={selectedUser.age}
                        />
                      </label>
                    </div>
              
                  </div>
                  <div className="flex justify-end">
                    <button className={styles.closeBtn} onClick={closeModal}>
                      Close
                    </button>
                    <button type="submit" className={styles.addnewbtn}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      {isModalOpenAdd && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className="font-medium text-xl border-b-2 border-solid border-indigo-500 mb-3">
              Add New Account
            </h2>
            <form>
              <div className="grid gap-3 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-l">
                    Firstname:
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-l">
                    Lastname:
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-l">
                    Email:
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                      type="email"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-l">
                    Password
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-2.5 outline-none"
                      type="password"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button className={styles.closeBtn} onClick={closeModalAdd}>
                  Close
                </button>
                <button type="submit" className={styles.addnewbtn}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}