"use client";

import React, { useState } from "react";
import style from "./root.module.css";
import CardList from "@/components/CardList";
import { requestData, RequestItem } from "@/constants/requestData";
import { PanInfo } from "framer-motion";

const Home = () => {
  const listMap = ["New Request", "Assigned", "InProgress", "Approved"];
  const [data, setData] = useState<{ [key: string]: RequestItem[] }>(
    requestData
  );

  const [fromList, setFromList] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<RequestItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [revert, setRevert] = useState<boolean>(false);
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onDragStart = (item: RequestItem, fromList: string, info: PanInfo) => {
    setFromList(fromList);
    setDraggedItem(item);
    setRevert(false);
    setInitialPosition({ x: info.offset.x, y: info.offset.y });
  };

  const onDragEnd = (info: PanInfo) => {
    if (!fromList || !draggedItem) return;

    const elementUnderCursor = document.elementFromPoint(
      info.point.x,
      info.point.y
    );
    let targetList = fromList;
    let targetIndex = -1;
    let isDroppedOutside = true;

    if (elementUnderCursor) {
      const closestList = elementUnderCursor.closest(".card-list-global");
      if (closestList) {
        targetList = closestList.getAttribute("data-listname") ?? fromList;
        isDroppedOutside = false;
      }

      const closestCard = elementUnderCursor.closest(".draggable-card");
      if (closestCard && closestCard.parentNode) {
        targetIndex = Array.from(closestCard.parentNode.children).indexOf(
          closestCard
        );
      }
    }

    if (isDroppedOutside || targetList === fromList) {
      setRevert(true);
      setTimeout(() => {
        setRevert(false);
        setDraggedItem(null);
      }, 300);
    } else {
      setData((prevData) => {
        const updatedSourceList =
          prevData[fromList]?.filter(
            (i) => i.heading !== draggedItem.heading
          ) || [];

        const updatedDestinationList = [...(prevData[targetList] || [])];
        if (targetIndex >= 0) {
          updatedDestinationList.splice(targetIndex, 0, draggedItem);
        } else {
          updatedDestinationList.push(draggedItem);
        }

        return {
          ...prevData,
          [fromList]: updatedSourceList,
          [targetList]: updatedDestinationList,
        };
      });

      setFromList(null);
      setTimeout(() => setDraggedItem(null), 100);
    }
  };

  return (
    <section className={style.main_section}>
      {listMap.map((list) => (
        <div key={list}>
          <CardList
            listName={list}
            data={data[list]}
            onDragStart={(item, _val, info) => onDragStart(item, list, info)}
            onDragEnd={onDragEnd}
            draggedItem={draggedItem}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
            revert={revert}
            setRevert={setRevert}
            setDraggedItem={setDraggedItem}
            initialPosition={initialPosition}
            setInitialPosition={setInitialPosition}
          />
        </div>
      ))}
    </section>
  );
};

export default Home;
