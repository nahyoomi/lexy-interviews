import React from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import { IProfile } from "@/data/profileData";

interface NewProfileModalProps {
  open: boolean;
  onClose: () => void;
  newProfile: IProfile;
  handleNewProfileChange: (field: keyof IProfile, value: string) => void;
  newTaste: { title: string; elements: string };
  setNewTaste: React.Dispatch<
    React.SetStateAction<{ title: string; elements: string }>
  >;
  showTastes: boolean;
  setShowTastes: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTaste: () => void;
  handleAddProfile: () => void;
  errorMessage: string;
}

const stylesModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto", 
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewProfileModal: React.FC<NewProfileModalProps> = ({
  open,
  onClose,
  newProfile,
  handleNewProfileChange,
  newTaste,
  setNewTaste,
  showTastes,
  setShowTastes,
  handleAddTaste,
  handleAddProfile,
  errorMessage,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={stylesModal}>
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
          type="url"
          value={newProfile.avatar}
          onChange={(e) => handleNewProfileChange("avatar", e.target.value)}
          fullWidth
          margin="normal"
          helperText="Verifica que la URL sea válida"
        />
        <TextField
          label="Platform"
          value={newProfile.platform}
          onChange={(e) => handleNewProfileChange("platform", e.target.value)}
          fullWidth
          margin="normal"
        />
        <div>
          <Button
            variant="outlined"
            onClick={() => setShowTastes(!showTastes)}
            sx={{ mt: 2, mb: 2 }}
          >
            {showTastes ? "Hide tastes" : "Add taste"}
          </Button>
        </div>
        {showTastes && (
          <div style={{ margin: "20px" }}>
            <TextField
              label="Title"
              value={newTaste.title}
              onChange={(e) =>
                setNewTaste({ ...newTaste, title: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Elements"
              value={newTaste.elements}
              onChange={(e) =>
                setNewTaste({ ...newTaste, elements: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <Button
              variant="outlined"
              onClick={handleAddTaste}
              sx={{ mt: 1, mb: 2 }}
            >
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
        )}
        <Button variant="contained" fullWidth onClick={handleAddProfile}>
          Save
        </Button>

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default NewProfileModal;