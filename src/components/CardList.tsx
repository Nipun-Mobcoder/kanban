"use client";

import { RequestItem } from "@/constants/requestData";
import React, { useRef } from "react";
import { Plus, Ellipsis } from "lucide-react";
import styles from "./components.module.css";
import HomeCard from "./HomeCard";
import { motion, PanInfo } from "framer-motion";

interface CardProp {
  listName: string;
  data: RequestItem[];
  onDragStart: (item: RequestItem, fromList: string) => void;
  onDragEnd: (info: PanInfo) => void;
  revertingCards: { [key: string]: boolean };
  // setRevertingCards: (val: { [key: string]: boolean }) => void;
}

const CardList: React.FC<CardProp> = ({
  listName,
  data,
  onDragStart,
  onDragEnd,
  revertingCards
}) => {
  const listRef = useRef(null);

  return (
    <motion.div
      ref={listRef}
      className={`${styles.card_list} card-list-global`}
      data-listname={listName}
    >
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
            <motion.div
              key={val.heading}
              className={styles.draggable_card}
              drag
              dragConstraints={false}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1, zIndex: 10, scaleX: 0.8, scaleY: 0.8 }}
              animate={revertingCards[val.heading] ? { x: 0, y: 0 } : {}}
              layout
              onDragStart={() => onDragStart(val, listName)} 
              onDragEnd={(event, info) => onDragEnd(info)}
            >
              <HomeCard value={val} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CardList;
