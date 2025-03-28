import React from "react";

import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
import styles from "./root.module.css"

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main style={{ position: "relative", backgroundColor: "#F8FAFC" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* <Sidebar /> */}
        <section className={styles.child_section}>
          <div style={{ width: "100%" }}>{children}</div>
        </section>
      </div>
      Footer
    </main>
  );
};

export default HomeLayout;
