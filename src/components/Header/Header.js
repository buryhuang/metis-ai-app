import React from 'react';
import { Box, makeStyles, createStyles, Grid, Button, Typography } from '@material-ui/core';
import Logo from '../../assets/logo.png'
import Signup from '../../Authentication/Signup/Signup';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: "11px 24px",
        },
    })
);

const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box className={classes.root}>
            <Grid container justify="space-between" alignItems="center">
                <Box>
                    <img src={Logo} alt="Logo" />
                </Box>
                <Button onClick={handleClickOpen} variant="contained" color="primary">
                    <Typography variant="subtitle1" color="textSecondary">Signup</Typography>
                </Button>
            </Grid>
            {open &&
                <Signup
                    open={open}
                    handleClose={handleClose}
                />
            }
        </Box>
    );
}

export default Header;