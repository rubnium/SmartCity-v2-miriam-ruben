import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from "@mui/icons-material/Menu";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import NavListDrawer from "./NavListDrawer";

const navLinks = [
    { title: "Inicio", path: "/", icon: <HomeIcon /> },
    { title: "Paradas", path: "#", icon:"" },
    { title: "Bicicletas", path: "/bicicletas", icon: <PedalBikeIcon /> },
    { title: "GitHub", path: "https://github.com/rubnium/SmartCity-miriam-ruben", icon: <GitHubIcon />}
]

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" size="large" onClick={() => setOpen(true)} sx={{ display: { xs:"flex", sm:"none" }}} edge="start"> 
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1}}>Título</Typography>
                    <Box sx={{ display: { xs:"none", sm:"block" }}}>
                        {navLinks.map(item => (
                            <Button color="inherit" key={item.title} component="a" href={item.path}>{item.title}</Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer open={open} anchor="left" onClose={() => setOpen(false)} sx={{ display: { xs:"flex", sm:"none" }}}>
                <NavListDrawer navLinks={navLinks} />
            </Drawer>
        </>
    )
}