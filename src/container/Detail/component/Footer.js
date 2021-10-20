import React from 'react';
import { Grid, Typography } from '@mui/material';


const Footer = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" >
            <Typography sx={{ color: "#718096", fontSize: 12, fontWeight: 600 }}>107 views - 5 downloads - 1 notebook - 0 topics</Typography>
        </Grid>
    );
}

export default Footer;