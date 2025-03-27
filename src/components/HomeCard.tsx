import Image from "next/image";
import styles from "./components.module.css";
import { RequestItem } from "@/constants/requestData";
import Tags from "./ui/tags";

interface HomeCardProps {
  value: RequestItem;
}
const HomeCard = ({ value }: HomeCardProps) => {
  return (
    <div className={styles.home_card} onClick={() => {}}>
      {value?.img ? (
        <div className={styles.home_image}>
          <img src={value.img} alt="" />
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
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
