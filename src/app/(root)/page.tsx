"use client";

import React, { useEffect, useState } from "react";
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
  const [toList, setToList] = useState<string | null>(null);
  const [revertingCards, setRevertingCards] = useState<{ [key: string]: boolean }>({});
  const [draggedItem, setDraggedItem] = useState<RequestItem | null>(null);

  const onDragStart = (item: RequestItem, fromList: string) => {
    setFromList(fromList);
    setDraggedItem(item);
    setRevertingCards((prev) => ({ ...prev, [item.heading]: false }));
  };

  const onDragEnd = (info: PanInfo) => {
    if (!fromList || !draggedItem) return;
    console.log(info.point);

    const elementUnderCursor = document.elementFromPoint(
      info.point.x,
      info.point.y
    );
    let targetList = fromList;
    console.log(elementUnderCursor, elementUnderCursor.closest(".card-list-global"))

    if (elementUnderCursor) {
      const closestList = elementUnderCursor.closest(".card-list-global");
      if (closestList) {
        targetList = closestList.getAttribute("data-listname") ?? fromList;
      }
    }

    setToList(targetList);
    if(targetList === fromList) {
      setRevertingCards((prev) => ({ ...prev, [draggedItem.heading]: true }));
    }
  };

  useEffect(() => {
    if (fromList && toList && draggedItem && fromList !== toList) {
      setData((prevData) => {
        const updatedSourceList =
          prevData[fromList]?.filter(
            (i) => i.heading !== draggedItem.heading
          ) || [];
        const updatedDestinationList = [
          ...(prevData[toList] || []),
          draggedItem,
        ];

        return {
          ...prevData,
          [fromList]: updatedSourceList,
          [toList]: updatedDestinationList,
        };
      });

      setFromList(null);
      setToList(null);
      setDraggedItem(null);
    }
  }, [fromList, toList, draggedItem]);
  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);

  return (
    <section className={style.main_section}>
      {listMap.map((list) => (
        <div key={list}>
          <CardList
            listName={list}
            data={data[list]}
            onDragStart={(item) => onDragStart(item, list)}
            onDragEnd={onDragEnd}
            revertingCards={revertingCards}
          />
        </div>
      ))}
    </section>
  );
  
};

export default Home;
