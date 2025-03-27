import styles from "./ui.module.css";

interface ButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  label = "Button",
  type = "button",
  disabled = false,
  style,
}) => {
  return (
    <button 
      type={type} 
      className={styles.button} 
      style={style} 
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
