/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./components.module.css";
import { RequestItem } from "@/constants/requestData";
import Tags from "./ui/tags";
import { motion } from "framer-motion";
import { ThumbsUp, MessageCircleMore } from "lucide-react";

interface HomeCardProps {
  value: RequestItem;
}
const HomeCard = ({ value }: HomeCardProps) => {
  return (
    <motion.div
      className={styles.home_card}
      whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
    >
      {value?.img ? (
        <div className={styles.home_image}>
          <img src={value.img} alt="" />
        </div>
      ) : null}
      {value?.lines ? (
        <div className={styles.card_line}>
          {value.lines.map((line) => {
            return (
              <div
                key={line}
                style={{
                  backgroundColor: `${line}`,
                }}
              ></div>
            );
          })}
        </div>
      ) : null}
      <div className={styles.home_text}>
        <h3 className={styles.home_heading}>{value.heading}</h3>
        <div className={styles.home_tags}>
          {value.tags.map((tag, index) => {
            return <Tags tagText={tag} key={index} />;
          })}
        </div>
        <div className={styles.home_user}>
          {value?.assigned ? (
            <div>
              <Image
                src={value.assigned.avatar}
                alt=""
                width={32}
                height={32}
              />
            </div>
          ) : null}
          <p className={styles.home_description}>{value.date}</p>
          <div className={styles.home_likes_comments}>
            {value.comments ? (
              <div>
                <MessageCircleMore width={16} height={16} color="#94A3B8" />
                <div style={{ color: "#1E293B" }}>{value.comments}</div>
              </div>
            ) : null}
            {value.likes ? (
              <div>
                <ThumbsUp width={16} height={16} color="#94A3B8" />
                <div style={{ color: "#1E293B" }}>{value.likes}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCard;
