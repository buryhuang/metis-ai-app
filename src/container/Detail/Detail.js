import React, { Fragment, useEffect, useState } from 'react';
import { Box, Button, TextField, ListItemButton, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import { Search } from "@mui/icons-material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RefreshIcon from '../../assets/refresh.png';
import LeftArrowIcon from '../../assets/leftArrow.png';
import RightArrowIcon from '../../assets/rightArrow.png';
import { useHistory } from 'react-router';
import { fetchRequest } from '../../Utils/FetchRequest';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    innerContainer: {
        paddingTop: 32,
        paddingLeft: 44.79,
        width: "97%",
        marginLeft: 39,
        paddingRight: 24
    },
    runQueryStyle: {
        background: "#FA7E11",
        color: "white",
        padding: "6px 40px",
    },
    actionBtn: {
        fontWeight: 700,

    },
    rootInput: {
        border: "3px solid #718096",
        boxShadow: " 0px 6px 4px rgba(222, 219, 219, 0.25)",
        height: 35,
        borderRadius: 5,
    },
    paginationCounterLabel: {
        margin: "0px 7px"
    }

})
);


const Detail = () => {
    const classes = useStyles();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [leftSidebarData, setleftSidebarData] = useState(null);


    useEffect(() => {
        getSidebarData();
    }, [])


    const getSidebarData = () => {
        fetchRequest('dataframes').then(res => {
            console.log('res.data', res.data);
            setleftSidebarData(res.data);
        }).catch(err => {
            console.log('err.message', err.message)
        })
    }




    return (
        <Fragment>
            <Header />
            <Box className={classes.innerContainer}>
                <Grid container alignItems="center">
                    <Grid item sm={1}>
                        <IconButton onClick={() => history.goBack()}>
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    </Grid>
                    <Grid item sm={2}>
                        <Box>
                            <span style={{ fontWeight: 700 }}>SQL QUERY</span>
                        </Box>
                    </Grid>
                    {/* <Grid item sm={2}>
                        <span className={classes.actionBtn}>JUPYTER NOTEBOOK</span>
                    </Grid>
                    <Grid item sm={7}>
                        <TextField
                            fullWidth
                            margin="dense"
                            value={search}
                            placeholder="Search for data sources"
                            variant="outlined"
                            onChange={e => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search style={{ color: "#9A9999", fontSize: 27, marginRight: 5 }} />
                                    </InputAdornment>

                                ),
                            }}
                        />
                    </Grid> */}
                </Grid>
            </Box>
            <Box mt={3} style={{ background: "#F3F5F9" }}>
                <Box className={classes.innerContainer} >
                    <Grid container>
                        <Grid item sm={10}>
                            <p style={{ color: "#718096" }}>Metis A.I. Select supports only the SELECT SQL command. Using the Data Analyst console, you can extract up to 40 MB of records from an object that is up to 128 MB in size. To work with larger files or more records, for more complex SQL queries, use Data Science console.</p>
                        </Grid>
                        <Grid item sm={2} style={{ display: "flex", flexDirection: "row", justify: "flex-end", alignItems: "flex-start" }}>
                            <Button className={classes.runQueryStyle} variant="contained">
                                <span style={{ fontSize: 16, color: "white" }}>Run Query</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={classes.innerContainer} style={{ paddingTop: 0 }}>
                <Grid container>
                    <Grid item sm={3} style={{ marginTop: 30 }}>
                        <Grid container justifyContent="space-around">
                            <span className={classes.actionBtn} style={{ color: "#828282" }}>RECENT TABLES</span>
                            <IconButton>
                                <img src={RefreshIcon} alt="refresh icon" />
                            </IconButton>
                        </Grid>
                        <Box>
                            <List>
                                {leftSidebarData?.length > 0 && leftSidebarData.map((d, i) => (
                                    <ListItem key={i}>
                                        <ListItemButton>
                                            <Typography color="GrayText" primary="subtitle">{d.name}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item sm={9} style={{ height: "70vh" }}>
                        <TextField
                            fullWidth
                            value={query}
                            placeholder="SELECT * FROM "

                            variant="outlined"
                            onChange={e => setQuery(e.target.value)}
                            InputProps={{
                                classes: {
                                    input: classes.rootInput
                                },
                            }}
                        />
                        <Grid container justifyContent="space-between" alignItems="center" direction="column" style={{ height: "96%" }}>
                            <Box>
                                <p>No Rows</p>
                            </Box>
                            <Box>
                                <Grid container justifyContent="center" alignItems="center" >
                                    <img src={LeftArrowIcon} alt="left arrow" />
                                    <span className={classes.paginationCounterLabel}>1</span>
                                    <span className={classes.paginationCounterLabel}>2</span>
                                    <span className={classes.paginationCounterLabel}>3</span>
                                    <span className={classes.paginationCounterLabel}>4</span>
                                    <span className={classes.paginationCounterLabel}>...</span>
                                    <span className={classes.paginationCounterLabel}>10</span>
                                    <img src={RightArrowIcon} alt="left arrow" />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Fragment >
    );
}

export default Detail;