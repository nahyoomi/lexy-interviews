import { Box } from "@mui/material";
import React from "react";

interface ISquare {
    color: string;
    effect: boolean;
}

const Square: React.FC<ISquare> = ({ color, effect }) => {
  const hoverStyles = effect
    ? {
        "&:hover": {
          backgroundColor: `${color}.main`,
          opacity: [0.9, 0.8, 0.7],
        },
      }
    : {};

    return (
        <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor:`${color}.dark`,
              ...hoverStyles,
            }}
          />
    );
};

export default Square;