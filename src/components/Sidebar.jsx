import React, { useMemo } from "react"; // React və useMemo əlavə edildi
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Home from "@mui/icons-material/Home";
import Article from "@mui/icons-material/Article";
import Group from "@mui/icons-material/Group";
import Storefront from "@mui/icons-material/Storefront";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import AccountBox from "@mui/icons-material/AccountBox";
import ModeNight from "@mui/icons-material/ModeNight";

const Sidebar = ({ mode, setMode }) => {
  // PERFORMANCE: Massivi useMemo ilə keşləyirik ki, hər renderdə yenidən yaranmasın
  const menuItems = useMemo(() => [
    { text: "Homepage", icon: <Home /> },
    { text: "Pages", icon: <Article /> },
    { text: "Groups", icon: <Group /> },
    { text: "Marketplace", icon: <Storefront /> },
    { text: "Friends", icon: <Person /> },
    { text: "Settings", icon: <Settings /> },
    { text: "Profile", icon: <AccountBox /> },
  ], []);

  console.log("render olundu sidebar");

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component="a" href={`#${item.text.toLowerCase()}`}>
                <ListItemIcon 
                  sx={{ color: mode === "dark" ? "white" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight sx={{ color: mode === "dark" ? "white" : "inherit" }} />
              </ListItemIcon>
              {/* Switch-in vəziyyətini mode-a bağlayırıq */}
              <Switch 
                checked={mode === "dark"}
                onChange={() => setMode(mode === "light" ? "dark" : "light")} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

// PERFORMANCE: React.memo lüzumsuz renderlərin qarşısını alır
export default React.memo(Sidebar);