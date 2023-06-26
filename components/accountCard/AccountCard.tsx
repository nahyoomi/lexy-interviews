import { useEffect, useState } from "react";

import { Card } from "@mui/material";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./AccountCard.module.css";
import Link from "next/link";

type IPlatform = "facebook" | "instagram" | "linkedin";

interface IProfile {
  id: string;
  avatar: string;
  platform: IPlatform;
  username: string;
  tastes: any;
}

export interface IAccountCard {
  profiles: IProfile[];
  id: string;
  editable?: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountCard: React.FC<IAccountCard> = ({
  profiles,
  editable,
  id,
  setIsProfileModalOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [integrations, setIntegrations] = useState<IProfile[]>([]);

  useEffect(() => {
    setIntegrations(profiles);
  }, []);

  return (
    <Card>
      <div className={styles["card"]}>
        {integrations.map((item, index) => (
          <Button key='k1' onClick={() => setIsProfileModalOpen(true)}>
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
            <Button >
              <span className={styles["link"]}>Add a new Profile</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccountCard;
