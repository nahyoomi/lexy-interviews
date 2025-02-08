import styles from "@/styles/Interview.module.css";
import Button from "@mui/material/Button";
import CloseIcon from "@/components/buttons/icons/CloseIcon";
import AccountCard from "@/components/accountCard/AccountCard";
import { useState } from "react";
import Square from "@/components/square/Square";
import { squares } from "@/data/squaresData";
import { IProfile, profile1, profile2  } from "@/data/profileData";
import ProfileModal from "@/components/modals/ProfileModal";


const Interview = () => {
  const [ boxes, setBoxes ] = useState(squares);
  const [profiles, setProfiles] = useState([profile1, profile2]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileSelected, setProfileSelected] = useState<IProfile | null >(null);

  const handleDelete = (id: number) => {
    setBoxes(prev => prev.filter(square => square.id !== id));
  }


  return (
    <div className={styles["interview-main-container"]}>
      <div className={styles["interview-boxes-container"]}>
        {boxes.map((box) =>(
          <div className={styles["interview-box-container"]} key={box.id}>
            <Square color={box.color} effect={true} />
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
          setProfileSelected={setProfileSelected}
        />
      </div>
      <ProfileModal
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profileSelected={profileSelected}
      />
    </div>
  );
};

export default Interview;
