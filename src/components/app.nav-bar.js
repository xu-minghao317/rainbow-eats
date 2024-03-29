import React from "react";

// mui
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Avatar from "boring-avatars";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// components
import SideDrawer from "./app.side-drawer";
import LangSwitch from "./app.lang-switch";
import Notifications from "./app.notifications";
import Cart from "./app.cart";

// i18n
import { useTranslation } from "react-i18next";

function timeToGreetings() {
  const { t } = useTranslation();
  const now = new Date();
  const hour = now.getHours();

  // we will not handle opening time and user authentication at this moment
  if (hour < 8) {
    // "Have a good dream 🌙";
    return t("app.nav-bar.midnight");
  } else if (hour < 12) {
    // "Good Morning 🌅";
    return t("app.nav-bar.morning");
  } else if (hour < 18) {
    // "Good Afternoon ☀️";
    return t("app.nav-bar.afternoon");
  } else {
    // "Good Evening ✨";
    return t("app.nav-bar.evening");
  }
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    "&:focus": {
      width: "40ch",
    },
  },
}));

export default function NavBar() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "menu-account";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      autoFocus={false}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      width="50"
    >
      <MenuItem key="greetings" disableRipple>
        {timeToGreetings()}
      </MenuItem>
      <MenuItem key="logout" disableRipple onClick={handleMenuClose}>
        <LogoutIcon sx={{ mr: "1rem" }} />
        {t("app.nav-bar.logout")}
      </MenuItem>
      <MenuItem key="profile" disableRipple onClick={handleMenuClose}>
        <AccountBoxIcon sx={{ mr: "1rem" }} />
        {t("app.nav-bar.profile")}
      </MenuItem>
      <MenuItem key="settings" disableRipple onClick={handleMenuClose}>
        <SettingsIcon sx={{ mr: "1rem" }} />
        {t("app.nav-bar.settings")}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <SideDrawer />
          <img
            alt="Rainbow Eats logo"
            src="./logo192.png"
            width="45"
            style={{
              borderRadius: "10%",
              marginRight: "1rem",
              marginLeft: "1rem",
            }}
          />
          <Typography variant="h4" noWrap color="primary" sx={{ mr: "0.5rem" }}>
            Rainbow
          </Typography>
          <Typography variant="h4" noWrap color="#fff">
            Eats
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t("app.nav-bar.search")}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>

            <LangSwitch />

            <Cart />

            <Notifications />

            <IconButton
              disableRipple
              size="small"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.25),
                },
              }}
            >
              <Avatar
                size={40}
                name="Mahalia Jackson"
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
