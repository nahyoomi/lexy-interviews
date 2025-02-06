import React from "react";
import Square from "@/components/square/Square";
import styles from "@/styles/squares.module.css";

const SquaresPage: React.FC = () => {
    return (
        <div className={styles["squares-main-container"]}>
            <h1>Creating new page with square</h1>
            <Square color="primary" />
        </div>
    );
};

export default SquaresPage;