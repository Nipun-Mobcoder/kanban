"use client";

import { RequestItem } from "@/constants/requestData";
import React, { useRef } from "react";
import { Plus, Ellipsis } from "lucide-react";
import styles from "./components.module.css";
import HomeCard from "./HomeCard";
import { motion, PanInfo, AnimatePresence } from "framer-motion";

interface CardProp {
  listName: string;
  data: RequestItem[];
  onDragStart: (item: RequestItem, fromList: string, info: PanInfo) => void;
  onDragEnd: (info: PanInfo) => void;
  draggedItem: RequestItem | null;
  hoveredCard: string | null;
  setHoveredCard: (val: string | null) => void;
  revert: boolean | null;
  setRevert: (val: boolean) => void;
  setDraggedItem: (val: RequestItem | null) => void;
  initialPosition: { x: number; y: number } | null;
  setInitialPosition: (val: { x: number; y: number } | null) => void;
}

const CardList: React.FC<CardProp> = ({
  listName,
  data,
  onDragStart,
  onDragEnd,
  draggedItem,
  hoveredCard,
  setHoveredCard,
  revert,
  setRevert,
  setDraggedItem,
  initialPosition,
  setInitialPosition,
}) => {
  const listRef = useRef(null);
  const cardPositions = useRef<{ [key: string]: { x: number; y: number } }>({});

  const handleDragStart = (item: RequestItem, fromList: string, info: PanInfo) => {
    setRevert(false);
    onDragStart(item, fromList, info);

    cardPositions.current[item.heading] = { x: info.point.x, y: info.point.y };
  };
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
      <motion.div className={styles.card_data}>
        <AnimatePresence>
          {data.map((val) => {
            return (
              <motion.div
                key={val.heading}
                layoutId={val.heading}
                className={`${styles.draggable_card} draggable-card`}
                drag
                dragConstraints={false}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                whileDrag={{ scale: 0.9, zIndex: 40 }}
                animate={
                  revert && draggedItem?.heading === val.heading
                    ? { x: initialPosition?.x || 0, y: initialPosition?.y || 0 }
                    : {
                        opacity: 1,
                        y: hoveredCard === val.heading ? -10 : 0,
                        transition: { type: "spring", stiffness: 150 },
                      }
                }
                exit={{ opacity: 0, y: 10 }}
                onDragStart={(_, info) => handleDragStart(val, listName, info)}
                onDragEnd={(event, info) => onDragEnd(info)}
                onMouseEnter={() => setHoveredCard(val.heading)}
                onMouseLeave={() => setHoveredCard(null)}
                onAnimationComplete={() => {
                  if (revert) {
                    setRevert(false);
                    setDraggedItem(null);
                    setInitialPosition(null);
                  }
                }}
              >
                <HomeCard value={val} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CardList;
