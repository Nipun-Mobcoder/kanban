import SignIn from "@/components/SignIn";
import styles from "./signIn.module.css"

const page = () => {
  return (
    <div className={styles.main_div}>
      <div>
        <div className={styles.welcome}>Welcome</div>
        <div className={styles.sign_in}>Sign in to get explored</div>
        <SignIn />
      </div>
    </div>
  );
};

export default page;
