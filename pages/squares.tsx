import React, { useState } from "react";
import Square from "@/components/square/Square";
import styles from "@/styles/squares.module.css";

const colors = ["primary", "secondary", "success"] as const;

const SquaresPage: React.FC = () => {
  const [color, setColor] = useState<"primary" | "secondary" | "success">("primary");

  const changeColor = () => {
    const newColors = colors.filter(c => c !== color);
    const randomColor = newColors[Math.floor(Math.random() * newColors.length)];
    setColor(randomColor);
  };

  return (
    <div className={styles["squares-main-container"]}>
      <h1>Color Clicker</h1>
      <p>Haz clic en el cuadrado para cambiar su color</p>
      <div className={styles["squares-box-container"]} onClick={changeColor}>
        <Square color={color} effect={false}/>
      </div>
    </div>
  );
};

export default SquaresPage;