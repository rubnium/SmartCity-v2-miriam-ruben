import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from "react";

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)',
  };

export default function Main() {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25, ml: '10px', mt: '10px' }}>
                <Typography variant="h7" className="page-title">Paradas</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} style={cardStyle}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <p>Hola mundo</p>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <p>Holas</p>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
};
