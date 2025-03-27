import React from 'react'
import styles from "./ui.module.css"

const Input = ({ type, ...props }: React.ComponentProps<"input">) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={styles.custom_input}
        {...props}
      />
    )
  }

export default Input