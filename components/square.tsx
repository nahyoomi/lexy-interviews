import { Box } from "@mui/material";
import React from "react";

interface ISquare {
    color: string;
}



const Square: React.FC<ISquare> = ({ color }) => {
    return (
        <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor:`${color}.dark`,
              "&:hover": {
                backgroundColor: `${color}.main`,
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
    );
};

export default Square;