"use client";

import { dropdown } from "@/config/routes";
import { Add } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

type Route = {
  path: string;
  name: string;
};

type Routes = {
  [key: string]: Route[];
};

const routes: Routes = {
  dropdown,
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/">Despesas App</Link>
          </Typography>

          <Box>
            <Link href="/expenses">
              <Button variant="outlined" color="inherit" startIcon={<Add />}>
                Cadastrar despesa
              </Button>
            </Link>
            <Button
              id="menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="text"
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
            >
              Cadastro
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "menu",
              }}
            >
              {Object.entries(routes).map(([key, value]) => (
                <Box key={key}>
                  {value.map((route) => (
                    <Link href={route.path} key={route.path}>
                      <MenuItem key={route.path} onClick={handleClose}>
                        {route.name}
                      </MenuItem>
                    </Link>
                  ))}
                </Box>
              ))}
            </Menu>
          </Box>
          <Link href="/login">
            <Button variant="text" color="inherit">
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
