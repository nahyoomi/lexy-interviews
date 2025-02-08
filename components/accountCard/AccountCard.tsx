import { useEffect, useState } from "react";

import { Box, Card, List, ListItem, ListItemText, Modal, TextField } from "@mui/material";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./AccountCard.module.css";
import Link from "next/link";

import { ITaste, IProfile } from "@/pages/interview";

type IPlatform = "facebook" | "instagram" | "linkedin";


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
  const [newProfile, setNewProfile] = useState<IProfile>({
    id: "",
    avatar: "",
    platform: "facebook",
    username: "",
    tastes: [],
  });

  const [newTaste, setNewtaste] = useState({title: "", elements: ""});
  const [showTastes, setShowTastes] = useState(false);
  const stylesModal = {
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
      alert("Por favor llena todos los campos requeridos (title y elements).");
      return;
    }
    const tasteObj: ITaste = {
      title: newTaste.title,
      elements: newTaste.elements.split(",").map((element) => element.trim()),
    };
    setNewProfile(prev => ({ ...prev, tastes: [...prev.tastes, tasteObj] }));
    setNewtaste({ title: "", elements: "" });
    setShowTastes(false);
  }


  const handleAddProfile = () => {
    const checkId = integrations.find((profile) => profile.id === newProfile.id);
    if (checkId) {
      alert("El ID ya existe");
      return;
    }
    if (!newProfile.id || !newProfile.username || !newProfile.platform || !newProfile.avatar) {
      
      alert("Por favor llena todos los campos requeridos (ID, username, platform, avatar.");
      return;
    }else if(newProfile.tastes.length === 0){
      alert("Por favor agrega al menos un gusto.");
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
        {integrations.map((item) => (
          <Button key={item.id} onClick={() => handleProfileDetails(item)}>
            <Avatar alt={item.username} src={item.avatar} />
            {item.username}
          </Button>
        ))}
        {editable && (
          <div>
            <Button onClick={() => setIsModalOpen(true)} />
            <div className={styles["add-button-text"]}>Add</div>
          </div>
        )}
        {!editable && (
          <div className={styles["empty-accounts"]}>
            <Button onClick={()=>{
              setIsModalOpen(true);
              setNewProfile({ id: "", avatar: "", platform: "facebook", username: "", tastes: [] });
              setShowTastes(false);
            }}>
              <span className={styles["link"]}>Add a new Profile</span>
            </Button>
          </div>
        )}
      </div>
      
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ ...stylesModal }}>
          <h2>Añadir nuevo perfil</h2>
          <TextField
            label="ID"
            value={newProfile.id}
            onChange={(e) => handleNewProfileChange("id", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            value={newProfile.username}
            onChange={(e) => handleNewProfileChange("username", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Avatar URL"
            value={newProfile.avatar}
            onChange={(e) => handleNewProfileChange("avatar", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Platform"
            value={newProfile.platform}
            onChange={(e) => handleNewProfileChange("platform", e.target.value)}
            fullWidth
            margin="normal"
          />
          <div>
            <Button variant="outlined" onClick={()=> {setShowTastes(!showTastes)}} sx={{ mt: 2, mb: 2 }}>
             {showTastes ? "Hide tastes" : "Add taste"} 
            </Button>
          </div>

          {showTastes && (
            <div style={{margin: "20px"}}>
              <TextField
                label="Title"
                value={newTaste.title}
                onChange={(e) => setNewtaste({ ...newTaste, title: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Elements"
                value={newTaste.elements}
                onChange={(e) => setNewtaste({ ...newTaste, elements: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button variant="outlined" onClick={handleAddTaste} sx={{ mt: 1, mb: 2 }}>
                Save taste
              </Button>
            </div>
          )}
          {newProfile.tastes.length > 0 && (
            <List>
              {newProfile.tastes.map((taste, index) => (
                <ListItem key={`${newProfile.id}-${index}`}>
                <ListItemText
                  primary={taste.title}
                  secondary={taste.elements.join(", ")}
                />
              </ListItem>
              ))}
            </List>
          )

          }
          <Button variant="contained" fullWidth onClick={handleAddProfile}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default AccountCard;
