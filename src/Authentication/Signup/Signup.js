import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Box, IconButton, TextField, Typography, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MessageIcon from '../../assets/message.png';
import { postRequest } from '../../Utils/FetchRequest';
import { useTheme } from '@emotion/react';

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
    },
    error: {
        color: "red",
        fontSize: 14,
        marginTop: 10
    },
})
);

export default function Signup({ open, handleClose }) {
    const classes = useStyles();
    const theme = useTheme();
    const [thankYou, setthankYou] = useState(false);
    const ValidationSchema = Yup.object().shape({
        email: Yup.string().email("Email Address is invalid.").required("Email Address is required."),
    });

    const handleSignup = (values, action) => {
        const requestBody = {
            name: values.name,
            email: values.email,
            message: values.request
        }
        console.log("🚀 ~ file: Signup.js ~ line 70 ~ handleSignup ~ requestBody", requestBody)

        postRequest('auth/register', requestBody).then(res => {
            console.log("🚀 ~ file: Signup.js ~ line 59 ~ postRequest ~ res.data", res.data);
            setthankYou(true);
            action.resetForm();
            action.setErrors(false);
        }).catch(error => {
            if (error.response) {
                console.log("🚀 ~ file: Signup.js ~ line 78 ~ axios.post ~ error.response", error.response.data)
            } else if (error.request) {
                console.log("🚀 ~ file: Signup.js ~ line 83 ~ axios.post ~ error.request", error.request)
            } else if (error.message) {
                console.log("🚀 ~ file: Signup.js ~ line 88 ~ axios.post ~ error.message", error.message)
            } else {
                console.log("🚀 ~ file: Signup.js ~ line 88 ~ axios.post ~ error.else", error)
            }
            action.setSubmitting(false);
        }).finally(() => {
            action.setSubmitting(false);
        })
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
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    request: ''
                                }}
                                validationSchema={ValidationSchema}
                                onSubmit={(values, action) => {
                                    console.log("🚀 ~ file: Signup.js ~ line 119 ~ Signup ~ values", values)
                                    handleSignup(values, action)
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                    <Fragment>
                                        <span className={classes.title} id="signup-dialog-slide-title">Signup for More Data</span>

                                        <Box mt={5} id="signup-dialog-slide-description">
                                            <Box mb={3}>
                                                <span className={classes.inputLabel}>Name (optional)</span>
                                                <TextField
                                                    fullWidth
                                                    value={values.name}
                                                    label=" "
                                                    type="text"
                                                    name="name"
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                            </Box>
                                            <Box mb={3}>
                                                <span className={classes.inputLabel}>Email (required)</span>
                                                <TextField
                                                    fullWidth
                                                    value={values.email}
                                                    type="email"
                                                    name="email"
                                                    label=" "
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <p className={classes.error}>
                                                    {errors.email && touched.email && errors.email}
                                                </p>
                                            </Box>
                                            <Box mb={3}>
                                                <span className={classes.inputLabel}>Additional Request (optional)</span>
                                                <TextField
                                                    fullWidth
                                                    value={values.request}
                                                    label=" "
                                                    name="request"
                                                    multiline
                                                    rows={5}
                                                    variant="outlined"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </Box>
                                        </Box>

                                        {!thankYou &&
                                            <DialogActions>
                                                <Button className={classes.actionBtn} onClick={handleClose} size="large" color="primary">
                                                    <Typography variant="subtitle1" >Cancel</Typography>
                                                </Button>
                                                <LoadingButton loading={isSubmitting} className={classes.actionBtn} onClick={handleSubmit} size="large" variant="contained" color="primary" autoFocus>
                                                    <Typography variant="subtitle1" sx={{ color: "#fff" }}>Sign up</Typography>
                                                </LoadingButton >
                                            </DialogActions>
                                        }
                                    </Fragment>
                                )}
                            </Formik>
                        }
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
