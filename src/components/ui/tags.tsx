import React from "react";
import styles from "./ui.module.css";
import { tagColor } from "@/constants/tagColor";

const Tags = ({tagText}: {tagText: string}) => {
  return (
    <div className={styles.tag} style={{ backgroundColor: tagColor[tagText], border: `1px solid ${tagColor[tagText]}` }}>
        <div className={styles.tag_text}>{tagText}</div>
    </div>
  );
};

export default Tags;
