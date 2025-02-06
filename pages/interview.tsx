import styles from "../styles/Interview.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from "@/components/buttons/icons/CloseIcon";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AccountCard from "@/components/accountCard/AccountCard";
import { useState } from "react";
import Square from "@/components/square/Square";

type IPlatform = "facebook" | "instagram" | "linkedin";

interface IProfile {
  id: string;
  avatar: string;
  platform: IPlatform;
  username: string;
  tastes: any;
}

const squares = [
  { id: 1, color: "secondary" },
  { id: 2, color: "primary" },
  { id: 3, color: "success" },
]

const Interview = ({ props }) => {
  const [ boxes, setBoxes ] = useState(squares);

  const handleDelete = (id: number) => {
    setBoxes(prev => prev.filter(square => square.id !== id));
  }
  
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const profile1: IProfile = {
    id: "id1",
    avatar: "/pictures/cat-face-1.jpg",
    platform: "facebook",
    username: "The Cat Fancy",
    tastes: [
      {
        title: "Favorites 1",
        elements: ["Meat", "Fish"],
      },
      {
        title: "Favorites 2",
        elements: ["Run", "Hunt"],
      },
    ],
  };

  const profile2: IProfile = {
    id: "id2",
    avatar: "/pictures/woman-face-1.jpg",
    platform: "facebook",
    username: "Woman",
    tastes: [
      {
        title: "Favorites 1",
        elements: ["Hummus", "Oranges", "Tortilla"],
      },
      {
        title: "Favorites 2",
        elements: ["Saber y Ganar", "Pasapalabra"],
      },
      {
        title: "Favorites 3",
        elements: ["Coding"],
      },
    ],
  };

  const [profiles, setProfiles] = useState([profile1, profile2]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <div className={styles["interview-main-container"]}>
      <div className={styles["interview-boxes-container"]}>
        {boxes.map((box) =>(
          <div className={styles["interview-box-container"]} key={box.id}>
            <Square color={box.color} />
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              onClick={() => handleDelete(box.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div>
        <AccountCard
          profiles={profiles}
          editable={false}
          id="id-x-1"
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
      </div>
      <Modal
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Body
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Interview;
