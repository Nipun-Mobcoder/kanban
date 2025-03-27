"use client";

import { RequestItem } from "@/constants/requestData";
import React from "react";
import { Plus, Ellipsis } from "lucide-react";
import styles from "./components.module.css";
import HomeCard from "./HomeCard";

interface CardProp {
  listName: string;
  data: RequestItem[];
}

const CardList: React.FC<CardProp> = ({ listName, data }) => {
  return (
    <div>
      <div className={styles.card_text}>
        <h3 className={styles.card_heading}>{listName}</h3>
        <div>
          <Plus width={24} height={24} className={styles.card_icon} />
          <Ellipsis width={24} height={24} className={styles.card_icon} />
        </div>
      </div>
      <div className={styles.card_data}>
        {data.map((val) => {
          return (
            <div key={val.heading}>
              <HomeCard value={val} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
