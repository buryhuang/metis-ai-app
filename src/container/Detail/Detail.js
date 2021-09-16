import React, { Fragment, useState } from 'react';
import { Box, makeStyles, createStyles, Button, TextField, InputAdornment, Divider, Grid } from '@material-ui/core';
import Header from '../../components/Header/Header';
import { Search } from "@material-ui/icons";

import RefreshIcon from '../../assets/refresh.png';
import LeftArrowIcon from '../../assets/leftArrow.png';
import RightArrowIcon from '../../assets/rightArrow.png';

const useStyles = makeStyles((theme) =>
    createStyles({
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
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    return (
        <Fragment>
            <Header />
            <Box className={classes.innerContainer}>
                <Grid container alignItems="center">
                    <Grid item sm={3}>
                        <Box>
                            <span style={{ fontWeight: 700 }}>SQL QUERY</span>
                        </Box>
                    </Grid>
                    <Grid item sm={2}>
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
                    </Grid>
                </Grid>
            </Box>
            <Box mt={3} style={{ background: "#F3F5F9" }}>
                <Box className={classes.innerContainer} >
                    <Grid container>
                        <Grid item sm={10}>
                            <p style={{ color: "#718096" }}>Metis A.I. Select supports only the SELECT SQL command. Using the Data Analyst console, you can extract up to 40 MB of records from an object that is up to 128 MB in size. To work with larger files or more records, for more complex SQL queries, use Data Science console.</p>
                        </Grid>
                        <Grid item sm={2} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start" }}>
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
                        <Grid container justify="space-around">
                            <span className={classes.actionBtn} style={{ color: "#828282" }}>RECENT TABLES</span>
                            <img src={RefreshIcon} alt="refresh icon" />
                        </Grid>
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
                        <Grid container justify="space-between" alignItems="center" direction="column" style={{ height: "96%" }}>
                            <Box>
                                <p>No Rows</p>
                            </Box>
                            <Box>
                                <Grid container justify="center" alignItems="center" >
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