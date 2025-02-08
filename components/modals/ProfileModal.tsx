import React from "react";
import { Modal, Box, Typography, Avatar, Grid, Divider } from "@mui/material";
import { IProfile } from "@/data/profileData";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileSelected: IProfile | null;
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

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, profileSelected }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {profileSelected && (
          <>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={profileSelected.avatar}
                  alt={profileSelected.username}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "2px solid #1976d2",
                  }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="h5" gutterBottom>
                  {profileSelected.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Platform: {profileSelected.platform}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Tastes:
            </Typography>
            {profileSelected.tastes.map(({ title, elements }, index) => (
              <Box key={`${profileSelected.id}-${index}`} sx={{ mt: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  {elements.join(", ")}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ProfileModal;