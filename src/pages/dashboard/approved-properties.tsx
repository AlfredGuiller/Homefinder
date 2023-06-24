import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.css";
import Link from "next/link";
import Head from "next/head";
import { PendingApartment } from "../../../data/pendingApartment";
import SideBar from "../../pages/sidebar";
import axios from "axios";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pending, setPending] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://29a8-136-158-25-146.ngrok-free.app/v1/test/property-fetching/APPROVED", { headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'ngrok-skip-browser-warning':  true
          }
        });
      
        setPending(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  interface User {
    _id: String;
    index: Number;
    city: "Unionville";
    picture: "http://placehold.it/32x32";
    apartmentName: "Ollie Johnston";
    address: "258 Ralph Avenue, Allamuchy, Delaware, 3599";
    apartmentType: "for sale";
    paymentMode: "per month";
    bedroom: 4;
    bathroom: 2;
    price: 1000;
    appliances: ["aircon", "aircon"];
    security: ["electric fan", "aircon"];
    amenities: ["washing machine", "washing machine"];
    registered: "2017-04-24T03:49:52 -08:00";
  }

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
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
              <h1 className={styles.h1_header}>Approved Properties</h1>
              <div className={styles.logout}>
                <h5 className={styles.adminName}>Admin</h5>
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
                <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-5 items-center justify-between cursor-pointer">
                  <span className="ms-4 col-span-1">City</span>
                  <span className="sm:text-left text-right col-span-2">
                    Address
                  </span>
                  <span className="flex sm:text-left text-right justify-center">
                    Apartment Type
                  </span>
           
                  <span className="hidden sm:grid justify-center">Actions</span>
                </div>
                <ul>
                  {pending.filter((order) => {
                    const address = order.address;
                    return address
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                  }).map((order, id) => (
                    <li
                      key={id}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-5 items-center"
                    >
                      <div className="flex items-center justify-start">
                        <p className="pl-4">{order.address}</p>
                      </div>
                      <div className="flex items-center justify-start col-span-2">
                        <p className="">{order.landmark}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="col-span-1">{order.propertyType}</p>
                      </div>
                      {/* <div className="flex items-center justify-center">
                          <p className="">{order.roles}</p>
                        </div> */}
                      <div className="sm:flex hidden justify-center items-center">
                        <button
                          className={styles.updatebtn}
                          onClick={() => openModal(order)}
                        >
                          View More
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
            <h2 className="font-medium text-xl border-b-2 border-solid border-gray-300 mb-3">
              Apartment Details
            </h2>
            {selectedUser && (
              <>
                <div className="mb-5 pb-3 grid grid-cols-8 gap-0 mb-3">
                  <div className="col-span-8 border-b-2 border-solid border-gray-300">
                    <label className="font-medium text-l col-span-1">
                      Land Mark:
                    </label>
                    <p className="mb-2">{selectedUser.landmark}</p>
                  </div>
                  <div className="col-span-3 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      City:
                    </label>
                    <p className="">{selectedUser.address}</p>
                  </div>
                  <div className="col-span-3 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      Apartment Type:
                    </label>
                    <p className="">{selectedUser.propertyType}</p>
                  </div>
                  <div className="col-span-2 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      Mode of Payment:
                    </label>
                    <p className="">{selectedUser.paymentMode}</p>
                  </div>
                  <div className="col-span-3 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      No. of Bedrooms:
                    </label>
                    <p className="">{selectedUser.numOfBedrooms}</p>
                  </div>
                  <div className="col-span-3 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      No. of Bathrooms:
                    </label>
                    <p className="">{selectedUser.numOfBathrooms}</p>
                  </div>
                  <div className="col-span-2 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      Price:
                    </label>
                    <p className="">{selectedUser.price}</p>
                  </div>
                  <div className="col-span-3 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      Appliances:
                    </label>
                      <p className="">{selectedUser.applianceAmenities}</p>
                  </div>
                  <div className="col-span-3 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      Security:
                    </label>
                      <p className="">{selectedUser.securityAmenities}</p>
                  </div>
                  <div className="col-span-2 border-b-2 border-solid border-gray-300 py-2">
                    <label className="font-medium text-l col-span-1">
                      Facility Amenities:
                    </label>
                      <p className="">{selectedUser.facilityAmenities}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className={styles.closeBtn} onClick={closeModal}>
                    Close
                  </button>
                 
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}