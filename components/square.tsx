import React from "react";

interface ISquare {
    color: string;
    onDelete:() => void;
}

const Square: React.FC<ISquare> = ({ color, onDelete }) => {
    return (
        <div
            style={{
                width: "100px",
                height: "100px",
                backgroundColor: color,
            }}
            onClick={onDelete}
        />
    );
};

export default Square;