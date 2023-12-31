import styles from "../styles/styles.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import SideBar from "../pages/sidebar";
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartOptions, setPieChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://29a8-136-158-25-146.ngrok-free.app/v1/test/property");
        const data = await response.json();

        const cities = data.map((apartment) => apartment.address);
        const cityCounts = cities.reduce((counts, city) => {
          counts[city] = (counts[city] || 0) + 1;
          return counts;
        }, {});
        const labels = Object.keys(cityCounts);
        const cityData = Object.values(cityCounts);

        const propertyTypes = data.map((apartment) => apartment.propertyType);
        const typeCounts = propertyTypes.reduce((counts, propertyType) => {
          counts[propertyType] = (counts[propertyType] || 0) + 1;
          return counts;
        }, {});
        const typeLabels = Object.keys(typeCounts);
        const typeData = Object.values(typeCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Cities",
              data: cityData,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(53, 162, 235, 0.4)",
            },
          ],
        });
        setChartOptions({
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Cities",
            },
          },
          maintainAspectRatio: false,
          responsive: true,
        });

        setPieChartData({
          labels: typeLabels,
          datasets: [
            {
              data: typeData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
            },
          ],
        });
        setPieChartOptions({
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Property Types",
            },
          },
          maintainAspectRatio: false,
          responsive: true,
        });
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  
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
              <h1 className={styles.h1_header}>Dashboard</h1>
              <div className={styles.logout}>
                <h5 className={styles.adminName}>Joshua</h5>
                <Link href="/" passHref legacyBehavior>
                  <button className={styles.logoutbtn}>Logout</button>
                </Link>
              </div>
            </div>
            <div className={styles.page_content}>
              <div className={styles.cards}>
                <div className={styles.cards_content}>
                  <div className={styles.account_header}>
                    <h4>Tenants</h4>
                  </div>
                  <div className={styles.account_total}>0</div>
                </div>
                <div className={styles.cards_content}>
                  <div className={styles.account_header}>
                    <h4>Landlords</h4>
                  </div>
                  <div className={styles.account_total}>0</div>
                </div>
                <div className={styles.cards_content}>
                  <div className={styles.account_header}>
                    <h4>Pending Properties</h4>
                  </div>
                  <div className={styles.account_total}>59</div>
                </div>
                <div className={styles.cards_content}>
                  <div className={styles.account_header}>
                    <h4>Approved Properties</h4>
                  </div>
                  <div className={styles.account_total}>59</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[40rem] md:col-span-2 relative lg:h-[60vh] h-[50vh] p-4 border rounded-lg bg-white mt-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                  <Bar data={chartData} options={chartOptions}></Bar>
                </div>
                <div className="w-[23rem] md:col-span-2 relative lg:h-[40vh] h-[50vh] p-4 border rounded-lg bg-white mt-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
