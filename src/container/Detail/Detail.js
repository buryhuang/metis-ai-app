import React, { Fragment, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Table, Typography, CircularProgress, Button, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import Header from '../../components/Header/Header';
import DownloadIcon from '../../assets/trending/download.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '../../assets/refresh.png';
import LeftArrowIcon from '../../assets/leftArrow.png';
import RightArrowIcon from '../../assets/rightArrow.png';
import { useHistory, useLocation } from 'react-router';
import { fetchRequest } from '../../Utils/FetchRequest';
import { makeStyles } from '@mui/styles';
import Column from './component/Column';

const useStyles = makeStyles((theme) => ({
    innerContainer: {
        minWidth: "97%",
        margin: "auto",
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
    table: {
        borderLeft: "1px solid #C2CEDB",
        overflow: "auto",
        maxHeight: document.body.scrollHeight - 360
    },
    cellStyle: {
        borderLeft: "1px solid #C2CEDB",
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
    const [data, setdata] = useState(null);
    const [leftSidebarData, setleftSidebarData] = useState(null);
    const id = useQuery().get('id');

    const getDatasetByID = () => {
        fetchRequest(`datasets/${id}`).then(res => {
            console.log('res.data', res.data)
            setdata(res.data);
        }).catch(err => {
            console.log('err.message', err.message)
        })
    }

    useEffect(() => {
        getDatasetByID();
    }, [id])

    useEffect(() => {
        getSidebarData();
    }, []);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }


    const getSidebarData = () => {
        fetchRequest('dataframes').then(res => {
            setleftSidebarData(res.data);
        }).catch(err => {
            console.log('err.message', err.message)
        })
    }

    const labels = [
        "Schema",
        "Owner",
        "Row",
        "Sizes",
        "Comment"
    ]
    const dummyData = [
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        }, {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },
        {
            schema: "test schema",
            owner: "admin",
            row: "43",
            sizes: "28KB",
            comment: "this is the dummy comment which will repeat in all rows."
        },

    ]

    return (
        <Fragment>
            <Header />
            <Box className={classes.innerContainer} >
                <Box maxHeight={300}>
                    <Grid pl={5} py={1} container alignItems="center" sx={{ mt: 3, background: "#FFF" }}>
                        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => history.goBack()} fontSize="large" />
                        <Box sx={{ fontWeight: 700, fontSize: 15, ml: 3 }}>SQL QUERY</Box>
                    </Grid>
                    <Box pl={5} py={2} mr={3} sx={{ background: "#FFF", border: "2px solid rgba(35, 61, 145, 0.2)" }} height={108}>
                        {!data ?
                            <Grid container alignItems="center" justifyContent="center" sx={{ width: "100wh" }}>
                                < CircularProgress size={17} />
                            </Grid>
                            :
                            <Grid mt={2.5} container alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography sx={{ fontWeight: 500, fontSize: 15 }}>{data.name} (13KB)</Typography>
                                    <Typography sx={{ fontSize: 12 }}>{data.description}</Typography>
                                </Box>
                                <Box>
                                    <Grid container alignItems="center">
                                        <Typography sx={{ fontSize: 11 }}><Typography component="span" sx={{ fontSize: 11, textDecoration: "underline" }}> Updated 3 hours ago</Typography> |  Usability 1.0, 13KB  |  1 Task, 15 files (CSV)</Typography>
                                        <Box ml={4}>
                                            <Grid container>
                                                <img src={DownloadIcon} alt="download record" style={{ marginRight: 25, height: 20, marginTop: 6 }} />
                                                <MoreHorizIcon fontSize="large" />
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Grid>
                        }
                    </Box>
                </Box>
                <Grid container>
                    <Grid item sm={2} pl={5} pt={4.5} sx={{ background: "#FFF", }}>
                        <Grid container justifyContent="space-between">
                            <Box>
                                <Typography sx={{ color: "#828282", fontSize: 12, fontWeight: 700 }} >Data Explorer (2MB)</Typography>
                                <Typography sx={{ color: "#828282", fontSize: 11 }} >Last refresh: 11:59pm</Typography>
                            </Box>
                            <IconButton sx={{ mr: 1.5 }}>
                                <img src={RefreshIcon} alt="refresh icon" style={{ height: 18, width: 15 }} />
                            </IconButton>
                        </Grid>
                        <Box my={3}>
                            <Grid container direction="column" alignItems="flex-start">
                                {leftSidebarData?.length > 0 && leftSidebarData.map((d, i) => (
                                    <Button key={i} sx={{ pl: 0 }}>
                                        <Typography color="primary" sx={{ my: 1.5, fontWeight: 500, fontSize: 12 }}>{d.name}</Typography>
                                    </Button>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item sm={10}>
                        <Box sx={{ background: "rgba(35, 61, 145, 0.05)", pt: 4, mr: 3 }}>
                            <Grid container justifyContent="space-between" alignItems="center" direction="column" style={{ height: document.body.scrollHeight - 300 }}>
                                <TableContainer className={classes.table}>
                                    <Table aria-label="Event Exploration table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                {labels.map((l, i) => (
                                                    <TableCell key={i} width={i == labels.length - 1 ? "30%" : "10%"} sx={{ background: "#fff", py: 1 }} align="center" className={classes.cellStyle}>
                                                        <Column title={l} />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dummyData.map((d, i) => (
                                                <TableRow>
                                                    <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                                        <Column title={d.schema} />
                                                    </TableCell>
                                                    <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                                        <Column title={d.owner} />
                                                    </TableCell>
                                                    <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                                        <Column title={d.row} />
                                                    </TableCell>
                                                    <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                                        <Column title={d.sizes} />
                                                    </TableCell>
                                                    <TableCell key={i} width={"30%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                                        <Column title={d.comment} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box pb={1}>
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
                                    <Typography sx={{ color: "#718096", fontSize: 12, fontWeight: 600 }}>107 views - 5 downloads - 1 notebook - 0 topics</Typography>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment >
    );
}

export default Detail;