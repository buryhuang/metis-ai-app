import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Box, IconButton, TextField, Typography, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import MessageIcon from '../../assets/message.png';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    paperRoot: {
        width: 600,
        height: 743
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        color: "#828282"
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 400,
        color: "#718096",
        marginTop: 10
    },
    actionBtn: {
        padding: "10px 30px"
    },
    thankMessage: {
        fontWeight: 700,
        fontSize: 18,
        marginTop: 20,
        lineHeight: 2.2,
        textAlign: "center",
        color: "#828282"
    }
})
);

export default function Signup({ open, handleClose }) {
    const classes = useStyles();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [request, setrequest] = useState('');
    const [thankYou, setthankYou] = useState(false);


    const handleSubmit = () => {
        setthankYou(true)
    }
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                classes={{ paper: classes.paperRoot }}
                onClose={handleClose}
                aria-labelledby="signup-dialog-slide-title"
                aria-describedby="signup-dialog-slide-description"
            >
                <DialogContent>
                    <Box width="85%" marginX="auto" pt={10} pb={10} height="100%">
                        <Box position="absolute" top={10} right={10}>
                            <IconButton onClick={handleClose} >
                                <Close />
                            </IconButton>
                        </Box>
                        {thankYou ?
                            <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                                <img src={MessageIcon} alt="message Icon" />
                                <p className={classes.thankMessage}>Thank You for Signup!
                                    <br></br>
                                    We will contact you and get you more data soon!</p>
                            </Grid>
                            :
                            <Fragment>
                                <span className={classes.title} id="signup-dialog-slide-title">Signup for More Data</span>
                                <Box mt={5} id="signup-dialog-slide-description">
                                    <Box mb={3}>
                                        <span className={classes.inputLabel}>Name (optional)</span>
                                        <TextField
                                            fullWidth
                                            value={name}
                                            label=" "
                                            type="text"
                                            variant="outlined"
                                            onChange={e => setname(e.target.value)}
                                        />
                                    </Box>
                                    <Box mb={3}>
                                        <span className={classes.inputLabel}>Email (required)</span>
                                        <TextField
                                            fullWidth
                                            value={email}
                                            type="email"
                                            label=" "
                                            variant="outlined"
                                            onChange={e => setemail(e.target.value)}
                                        />
                                    </Box>
                                    <Box mb={3}>
                                        <span className={classes.inputLabel}>Additional Request (optional)</span>
                                        <TextField
                                            fullWidth
                                            value={request}
                                            label=" "
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            onChange={e => setrequest(e.target.value)}

                                        />
                                    </Box>
                                </Box>
                            </Fragment>
                        }
                        {!thankYou &&
                            <DialogActions>
                                <Button className={classes.actionBtn} onClick={handleClose} size="large" color="primary">
                                    <Typography variant="subtitle1" >Cancel</Typography>

                                </Button>
                                <Button className={classes.actionBtn} onClick={handleSubmit} size="large" variant="contained" color="primary" autoFocus>
                                    <Typography variant="subtitle1" color="textSecondary">Sign up</Typography>
                                </Button>
                            </DialogActions>
                        }
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
