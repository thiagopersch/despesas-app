"use client";

import { dropdown } from "@/config/routes";
import { Add } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import * as S from "./styles";

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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Typography color="inherit" component="div" sx={{ flexGrow: 1 }}>
              <S.TitleWrapper>
                <Link href="/">Despesas App</Link>
              </S.TitleWrapper>
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: "2rem",
              }}
            >
              <S.WrapperNavbar>
                <Link href="/expenses/create">
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<Add />}
                  >
                    Criar despesa
                  </Button>
                </Link>
              </S.WrapperNavbar>
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
                Ações
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
                <S.WrapperIconNavbar>
                  <Link href="/expenses/create">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<Add />}
                    >
                      Criar despesa
                    </Button>
                  </Link>
                </S.WrapperIconNavbar>
                <S.Ocult>
                  <Divider />
                </S.Ocult>
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
              <Link href="/login">
                <Button variant="text" color="inherit">
                  Login
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
