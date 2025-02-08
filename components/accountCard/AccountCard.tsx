import { useEffect, useState } from "react";

import { Card } from "@mui/material";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./AccountCard.module.css";

import { ITaste, IProfile } from "@/data/profileData";
import NewProfileModal from "@/components/modals/NewProfileModal";


export interface IAccountCard {
  profiles: IProfile[];
  id: string;
  editable?: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileSelected: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

const AccountCard: React.FC<IAccountCard> = ({
  profiles,
  editable,
  id,
  setIsProfileModalOpen,
  setProfileSelected,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [integrations, setIntegrations] = useState<IProfile[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newProfile, setNewProfile] = useState<IProfile>({
    id: "",
    avatar: "",
    platform: "facebook",
    username: "",
    tastes: [],
  });
  const [newTaste, setNewTaste] = useState({title: "", elements: ""});
  const [showTastes, setShowTastes] = useState(false);


  useEffect(() => {
    setIntegrations(profiles);
  }, [profiles]);

  const handleProfileDetails = (profile: IProfile) => {
    setIsProfileModalOpen(true);
    setProfileSelected(profile);
  };


  const handleNewProfileChange = (field: keyof IProfile, value: string) => {
    setNewProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTaste = () => {
    if(!newTaste.title || !newTaste.elements){
      setErrorMessage("Por favor, llena todos los campos de gustos requeridos.");
      return;
    }
    const tasteObj: ITaste = {
      title: newTaste.title,
      elements: newTaste.elements.split(",").map((element) => element.trim()),
    };
    setNewProfile(prev => ({ ...prev, tastes: [...prev.tastes, tasteObj] }));
    setNewTaste({ title: "", elements: "" });
    setShowTastes(false);
    setErrorMessage("");
  }


  const handleAddProfile = () => {
    const checkId = integrations.find((profile) => profile.id === newProfile.id);
    if (checkId) {
      setErrorMessage("El ID ya existe");
      return;
    }
    if (!newProfile.id || !newProfile.username || !newProfile.platform || !newProfile.avatar) {
      
      setErrorMessage("Por favor, llena todos los campos requeridos.");
      return;
    }else if(newProfile.tastes.length === 0){
      setErrorMessage("Por favor, agrega al menos un gusto.");
      return
    }
    setIntegrations(prev => [...prev, newProfile]);
    alert("Perfil creado con éxito");
    setIsModalOpen(false);
    setNewProfile({ id: "", avatar: "", platform: "facebook", username: "", tastes: [] });
  };



  return (
    <Card>
      <div className={styles["card"]}>
        {integrations.map((item, index) => (
          <Button key={`${newProfile.id}-${index}`} onClick={() => handleProfileDetails(item)}>
            <Avatar alt={item.username} src={item.avatar} />
            {item.username}
          </Button>
        ))}
        {editable ? (
          <div>
            <Button onClick={() => setIsModalOpen(true)} />
            <div className={styles["add-button-text"]}>Add</div>
          </div>
        ) : (
          <div className={styles["empty-accounts"]}>
            <Button onClick={() => {
              setIsModalOpen(true);
              setNewProfile({ id: "", avatar: "", platform: "facebook", username: "", tastes: [] });
              setShowTastes(false);
              setErrorMessage("");
            }}>
              <span className={styles["link"]}>Add a new Profile</span>
            </Button>
          </div>
        )}
      </div>
      
      <NewProfileModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newProfile={newProfile}
        handleNewProfileChange={handleNewProfileChange}
        newTaste={newTaste}
        setNewTaste={setNewTaste}
        showTastes={showTastes}
        setShowTastes={setShowTastes}
        handleAddTaste={handleAddTaste}
        handleAddProfile={handleAddProfile}
        errorMessage={errorMessage}
      />
    </Card>
  );
};

export default AccountCard;
