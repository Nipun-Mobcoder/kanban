import React from "react";
import styles from "./components.module.css";
import Image from "next/image";

const MobileNav = () => {
  return (
    <div className={styles.mobile_nav}>
      <Image
        src="/icons/hamburger.svg"
        width={36}
        height={36}
        alt="hamburger Icon"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default MobileNav;
