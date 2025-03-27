import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Search, Share2 } from "lucide-react";
import MobileNav from "./MobileNav";
import NavAvatar from "./NavAvatar";
import styles from "./components.module.css";
import Input from "./ui/Input";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.home}>
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Logo"
          className={styles.logo_image}
        />
        <p className={styles.title}>Kanban</p>
      </Link>
      <div>
        <div className={styles.input_container}>
          <Search className={styles.search_icon} />
          <Input type="text" placeholder="Search tasks..." />
        </div>
        <NavAvatar />
        <button className={styles.share_button}>
          <div>
            <Share2 className={styles.share_icon} />
            <span>Share</span>
          </div>
        </button>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
