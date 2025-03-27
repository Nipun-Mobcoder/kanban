import React from "react";
import styles from "./page.module.css";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={styles.main_layout}>
      {children}
    </main>
  );
};

export default AuthLayout;
