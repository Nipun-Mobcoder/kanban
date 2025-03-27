"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./components.module.css";
import Input from "./ui/Input";
import Button from "./ui/Button";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    router.push("/");
  };
  return (
    <section>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Please enter your email address"
            style={{ marginBottom: "1.5rem" }}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            id="password"
            placeholder="Please enter your Password"
            style={{ marginBottom: "3.5rem" }}
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <Button style={{ width: "50%" }} type="submit" label=" Sign in" />
      </form>
      <div style={{ paddingTop: "0.5rem" }}>
        Don&apos;t have an account?
        <span
          className={styles.sign_span}
          onClick={() => router.push("/sign_up")}
        >
          Sign up
        </span>
      </div>
    </section>
  );
};

export default SignIn;
