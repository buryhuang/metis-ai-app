import React, { Fragment, useEffect, useState } from 'react';
import { Box, Button, InputAdornment, Grid, TextField, Popover } from '@mui/material';
import Header from '../../components/Header/Header';
import { Search, Close, } from "@mui/icons-material";
import DataList from './component/List/List';
import TrendingIcon from '../../assets/trending.png';
import FilterIcon from '../../assets/filter.png';
import DatabaseIcon from '../../assets/carbon_data-base.png';
import StarIcon from '../../assets/star.png';
import { makeStyles } from '@mui/styles';
import { fetchRequest } from '../../Utils/FetchRequest';
import { toast } from '../../Utils/Toast';
import FilterPopup from './component/FilterPopup/FilterPopup';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


const useStyles = makeStyles((theme) => ({
    innerContainer: {
        paddingLeft: 42.79,
        background: "#FFF",
        paddingRight: 24,
        width: "97%",
        margin: "auto"
    },
    ds_name: {
        fontWeight: 700,
        fontSize: "36px"
    },
    heroLine: {
        fontSize: 15,
        color: "#718096"
    },
    inputRoot: {
        border: "2px solid #E2E8F0"
    },
    filterButton: {
        border: "2px solid #E2E8F0",
        borderRadius: 5,
        padding: "10px 12px",
        marginTop: 15,
        textTransform: "capitalize",
        minWidth: 102,
        outline: "none"
    },
    filterButtonLabel: {
        fontSize: 14,
        color: "#9A9999"
    }
})
);

const datasetArr = ["Datasets", "Tasks", "Computer Sciences", "Classification", "Education", "NLP", "Computer Vision", "Data Visualization", "Data sandbox"];
const Home = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [activeButton, setactiveButton] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [data, setdata] = useState(null);
    const [page, setpage] = useState(1);
    const [perPage, setperPage] = useState(10);
    const changeTabHandler = tab => {
        setactiveButton(tab);
        // // if (tab === 0) {
        // getDatasets();
        // // } else {
        // //     setdata(selectedTabData);
        // // }
    }

    const getDatasets = () => {
        setLoading(true);
        fetchRequest(`datasets?page=${page}&per_page=${perPage}`).then(res => {
            setdata(res.data);
            setLoading(false)
        }).catch(err => {
            console.log('err.message', err.message);
            toast(err.message, "error")
            setLoading(false);
        })
    }

    useEffect(() => {
        getDatasets();
    }, [])



    return (
        <Fragment>
            <Header />
            <Box className={classes.innerContainer} sx={{ margin: "auto", marginTop: "32px !important", pt: 2 }}>
                <p className={classes.ds_name}>DATASETS</p>
                <p className={classes.heroLine}>Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.</p>
                <Box position="relative">
                    <TextField
                        fullWidth
                        value={search}
                        style={{ position: "relative" }}
                        id="search-bar-for-data-soruces"
                        label="Search for data sources"
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
                    <Box position="absolute" top={10} right={8}>

                        <PopupState variant="popover" popupId="filter-popup">
                            {(popupState) => (
                                <div>
                                    {activeButton === -1 &&
                                        <Button {...bindTrigger(popupState)}>
                                            <Grid container alignItems="center">
                                                <img src={FilterIcon} />
                                                <span style={{ marginLeft: 10, fontSize: 14, fontWeight: 700, textTransform: "uppercase" }}>Filters</span>
                                            </Grid>
                                        </Button>
                                    }
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorReference="anchorPosition"
                                        anchorPosition={{ top: 625, left: window.innerWidth - 60 }}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <FilterPopup />
                                    </Popover>
                                </div>
                            )}
                        </PopupState>
                    </Box>
                </Box>
                <Box>
                    {activeButton === -1 ?
                        datasetArr.map((d, i) => (
                            <Button key={i} onClick={() => changeTabHandler(i)} className={classes.filterButton}
                                style={{ marginLeft: i > 0 ? 13 : 0 }} variant="outlined">
                                <span className={classes.filterButtonLabel}>{d}</span>
                            </Button>
                        ))
                        :
                        <Button
                            className={classes.filterButton}
                            style={{ position: "relative", paddingRight: "50px", marginLeft: 0, border: "3px solid #000000" }}
                            variant="outlined"
                        >
                            <span className={classes.filterButtonLabel} style={{ color: "#000000" }}>{datasetArr[activeButton]}</span>
                            <Box position="absolute" top="9px" right="8px">
                                <Close color="primary" fontSize="medium" onClick={() => {
                                    setactiveButton(-1);
                                }} />
                            </Box>
                        </Button>
                    }
                </Box>
                {activeButton === -1 ?
                    <section>
                        <DataList
                            loading={loading}
                            icon={TrendingIcon}
                            title="Trending Datasets"
                            data={data?.items}
                            activeButton={activeButton}
                        />
                    </section>
                    :
                    <section>
                        <DataList
                            loading={loading}
                            icon={DatabaseIcon}
                            title={`${data?.total_items || 0} Datasets`}
                            data={data?.items}
                            activeButton={activeButton}
                            icons
                        />
                    </section>
                }
            </Box>
            {
                activeButton === -1 &&
                <Fragment>
                    <Box width="100%" borderBottom="2px solid #E2E8F0" />
                    <Box className={classes.innerContainer}>
                        <section>
                            <DataList
                                loading={loading}
                                icon={StarIcon}
                                title="Popular Datasets"
                                data={data?.items}
                                activeButton={activeButton}
                            />
                        </section>
                    </Box>
                </Fragment>
            }
        </Fragment >
    );
}

export default Home;