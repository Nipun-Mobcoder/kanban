import React from "react";
import style from "./root.module.css";
import CardList from "@/components/CardList";
import { requestData } from "@/constants/requestData";

const Home = () => {
  const listMap = ["New Request", "Assigned", "InProgress", "Approved"];
  return (
    <section className={style.main_section}>
      {listMap.map((list) => {
        return (
          <div key={list}>
            <CardList listName={list} data={requestData[list]} />
          </div>
        );
      })}
    </section>
  );
};

export default Home;
