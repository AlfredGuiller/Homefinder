import styles from "../styles/styles.module.css";
import React from "react";
import Link from "next/link";
 
export default function SideBar() {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2 className="text-2xl font-medium text-[#ff7f50] py-6">
            Home Finder
          </h2>
        </div>
        <ul className={styles.sidebar_ul}>
          <li className={styles.sidebar_li}>
            <Link href="/dashboard" passHref legacyBehavior>
              <a className={styles.sidebar_a}>Dashboard</a>
            </Link>
          </li>
          <li className={styles.sidebar_li}>
            <Link href="/dashboard/userslist" passHref legacyBehavior>
              <a className={styles.sidebar_a}>Users List</a>
            </Link>
          </li>
          <li className={styles.sidebar_li}>
            <Link href="/dashboard/pending-properties" passHref legacyBehavior>
              <a className={styles.sidebar_a}>Pending Properties</a>
            </Link>
          </li>
          <li className={styles.sidebar_li}>
            <Link href="/dashboard/tenant-list" passHref legacyBehavior>
              <a className={styles.sidebar_a}>Tenant List</a>
            </Link>
          </li>
          <li className={styles.sidebar_li}>
            <Link href="/dashboard/landlord-list" passHref legacyBehavior>
              <a className={styles.sidebar_a}>Landlord List</a>
            </Link>
          </li>
          <li className={styles.sidebar_li}>
            <Link href="/dashboard/approved-properties" passHref legacyBehavior>
              <a className={styles.sidebar_a}>Approved Properties</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
