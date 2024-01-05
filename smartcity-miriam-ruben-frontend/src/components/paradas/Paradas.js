import { memo, useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Card, CardContent, Grid, Tab, Tabs, Typography } from '@mui/material';
import { CtxPopupProvider } from './ContextoPopup';


import MapaParadas from "./MapaParadas";

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)',
};

const pestanas = [ "Autobús", "Cercanías", "Interurbano", "Metro", "Metro ligero"];
const pestanasContenido = ['autobus', 'cercanias', 'interurbano', 'metro', 'metroLigero'];

function a11yProps(index) {
    return {
      id: `tab-transporte-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

export default function Paradas(props) {
    const {tabTitle} = props;
    document.title = tabTitle;
    const [tabValor, setTab] = useState(0);
    const [tabContent, setTabContent] = useState(pestanasContenido[0]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setTabContent(pestanasContenido[newValue]);
    };

    const MemoizedMapaParadas = memo(MapaParadas);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -4.25, ml: '10px', mt: '10px' }}>
                <Typography variant="h5" className="page-title"><PlaceIcon sx={{ fontSize: 28, verticalAlign: 'middle', marginRight: 1 }}/>Paradas de transporte público</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} style={cardStyle}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <p>Hola mundo</p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxWidth: { xs: 320, sm: 480 }, /*width: '100%',*/ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs variant="scrollable" scrollButtons="auto" value={tabValor} onChange={handleTabChange}>
                                        {pestanas.map((pestana, index) => (
                                            <Tab key={index} label={pestana} {...a11yProps(index)} />
                                        ))}
                                    </Tabs>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <CtxPopupProvider><MemoizedMapaParadas tipo={tabContent} /></CtxPopupProvider>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
}