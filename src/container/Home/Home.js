import React, { Fragment, useState } from 'react';
import { Box, makeStyles, createStyles, Button, TextField, InputAdornment, Divider, Grid } from '@material-ui/core';
import Header from '../../components/Header/Header';
import { Search, Close, } from "@material-ui/icons";
import DataList from './component/List';
import TrendingIcon from '../../assets/trending.png';
import FilterIcon from '../../assets/filter.png';
import DatabaseIcon from '../../assets/carbon_data-base.png';
import StarIcon from '../../assets/star.png';
import Image1 from '../../assets/trending/1.png';
import Image2 from '../../assets/trending/2.png';
import Image3 from '../../assets/trending/3.png';
import Image4 from '../../assets/trending/4.png';
import Image5 from '../../assets/trending/5.png';
import { useHistory } from 'react-router';
import { fetchRequest } from '../../Utils/FetchRequest';

const popularData = [
    {
        id: 1,
        image: Image1,
        ds_name: 'Amazon.com, Inc. (AMZN)',
        ds_description: 'Stock Price of Amazon.com from Sep 1 1997 to Sep 1 2021.',
        ds_init_timestamp: ' Updated 2 weeks ago',
        usability: 'Usability 1.0, 13KB',
        counter: '15 files (CSV)',
    },
    {
        id: 2,
        image: Image2,
        ds_name: '2021 Olympic in Toyko',
        ds_description: 'Data about Athletes, Teams, Coaches, Events.',
        ds_init_timestamp: ' Updated 3 weeks ago',
        usability: 'Usability 3.0, 390KB',
        counter: '2 Tasks, 5 files (CSV)',
    },
    {
        id: 3,
        image: Image3,
        ds_name: 'Red Wine Quality',
        ds_description: 'Simple and clean practice dataset for regression',
        ds_init_timestamp: ' Updated 13 hours ago',
        usability: 'Usability 1.0, 329KB',
        counter: '4 files (CSV)',
    },
    {
        id: 4,
        image: Image4,
        ds_name: 'Bitcoin tweets - 16M tweets',
        ds_description: 'Market Based Sentiment Assignment with Stock Data',
        ds_init_timestamp: ' Updated 4 hours ago',
        usability: 'Usability 5.0, 3KB',
        counter: '1 Tasks,1 files (CSV)',
    },
    {
        id: 5,
        image: Image5,
        ds_name: 'Google Play Store Apps',
        ds_description: 'Web scraped data of 10k Play Store apps.',
        ds_init_timestamp: ' Updated 3 weeks ago',
        usability: 'Usability 3.0, 514KB',
        counter: '7 tasks, 25 files (CSV)',
    },
];

const selectedTabData = [
    {
        id: 1,
        image: Image1,
        ds_name: 'Amazon.com, Inc. (AMZN)',
        ds_description: 'Stock Price of Amazon.com from Sep 1 1997 to Sep 1 2021.',
        ds_init_timestamp: ' Updated 2 weeks ago',
        usability: 'Usability 1.0, 13KB',
        counter: '15 files (CSV)',
    },
    {
        id: 2,
        image: Image2,
        ds_name: '2021 Olympic in Toyko',
        ds_description: 'Data about Athletes, Teams, Coaches, Events.',
        ds_init_timestamp: ' Updated 3 weeks ago',
        usability: 'Usability 3.0, 390KB',
        counter: '2 Tasks, 5 files (CSV)',
    },
    {
        id: 3,
        image: Image3,
        ds_name: 'Red Wine Quality',
        ds_description: 'Simple and clean practice dataset for regression',
        ds_init_timestamp: ' Updated 13 hours ago',
        usability: 'Usability 1.0, 329KB',
        counter: '4 files (CSV)',
    },
    {
        id: 4,
        image: Image4,
        ds_name: 'Bitcoin tweets - 16M tweets',
        ds_description: 'Market Based Sentiment Assignment with Stock Data',
        ds_init_timestamp: ' Updated 4 hours ago',
        usability: 'Usability 5.0, 3KB',
        counter: '1 Tasks,1 files (CSV)',
    },
    {
        id: 5,
        image: Image5,
        ds_name: 'Google Play Store Apps',
        ds_description: 'Web scraped data of 10k Play Store apps.',
        ds_init_timestamp: ' Updated 3 weeks ago',
        usability: 'Usability 3.0, 514KB',
        counter: '7 tasks, 25 files (CSV)',
    },
    {
        id: 6,
        image: Image1,
        ds_name: 'Amazon.com, Inc. (AMZN)',
        ds_description: 'Stock Price of Amazon.com from Sep 1 1997 to Sep 1 2021.',
        ds_init_timestamp: ' Updated 2 weeks ago',
        usability: 'Usability 1.0, 13KB',
        counter: '15 files (CSV)',
    },
    {
        id: 7,
        image: Image2,
        ds_name: '2021 Olympic in Toyko',
        ds_description: 'Data about Athletes, Teams, Coaches, Events.',
        ds_init_timestamp: ' Updated 3 weeks ago',
        usability: 'Usability 3.0, 390KB',
        counter: '2 Tasks, 5 files (CSV)',
    },
    {
        id: 8,
        image: Image3,
        ds_name: 'Red Wine Quality',
        ds_description: 'Simple and clean practice dataset for regression',
        ds_init_timestamp: ' Updated 13 hours ago',
        usability: 'Usability 1.0, 329KB',
        counter: '4 files (CSV)',
    },
    {
        id: 9,
        image: Image4,
        ds_name: 'Bitcoin tweets - 16M tweets',
        ds_description: 'Market Based Sentiment Assignment with Stock Data',
        ds_init_timestamp: ' Updated 4 hours ago',
        usability: 'Usability 5.0, 3KB',
        counter: '1 Tasks,1 files (CSV)',
    },
    {
        id: 10,
        image: Image5,
        ds_name: 'Google Play Store Apps',
        ds_description: 'Web scraped data of 10k Play Store apps.',
        ds_init_timestamp: ' Updated 3 weeks ago',
        usability: 'Usability 3.0, 514KB',
        counter: '7 tasks, 25 files (CSV)',
    },
]

const images = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
]



const useStyles = makeStyles((theme) =>
    createStyles({
        innerContainer: {
            paddingTop: 32,
            paddingLeft: 42.79,
            paddingRight: 24
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
    const [data, setdata] = useState(popularData);


    const changeTabHandler = tab => {
        setactiveButton(tab);
        if (tab === 0) {
            getDatasets();
        } else {
            setdata(selectedTabData);
        }
    }

    const getDatasets = () => {
        fetchRequest('datasets?page=1&per_page=10').then(res => {
            setdata(res.data);
        }).catch(err => {
            console.log('err.message', err.message)
        })
    }



    return (
        <Fragment>
            <Header />
            <Box className={classes.innerContainer}>
                <p className={classes.ds_name}>Datasets</p>
                <p className={classes.heroLine}>Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.</p>
                <Box position="relative">
                    <TextField
                        fullWidth
                        value={search}
                        style={{ position: "relative" }}
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
                        <Button>
                            <Grid container alignItems="center">
                                <img src={FilterIcon} />
                                <span style={{ marginLeft: 10, fontSize: 14, fontWeight: 700, textTransform: "uppercase" }}>Filter</span>
                            </Grid>
                        </Button>
                    </Box>
                </Box>
                <Box>
                    {activeButton === -1 ?
                        datasetArr.map((d, i) => (
                            <Button onClick={() => changeTabHandler(i)} className={classes.filterButton}
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
                                    setdata(popularData)
                                }} />
                            </Box>
                        </Button>
                    }
                </Box>
                {activeButton === -1 ?
                    <section>
                        <DataList
                            icon={TrendingIcon}
                            title="Trending Datasets"
                            data={data}
                            images={images}
                        />
                    </section>
                    :
                    <section>
                        <DataList
                            icon={DatabaseIcon}
                            title={`${data?.length} Datasets`}
                            data={data}
                            images={images}
                            icons
                        />
                    </section>
                }
            </Box>
            {
                activeButton === -1 &&
                <Fragment>
                    <Box width="100%" borderBottom="2px solid #E2E8F0" mt={7} />
                    <Box className={classes.innerContainer}>
                        <section>
                            <DataList
                                icon={StarIcon}
                                title="Popular Datasets"
                                data={data}
                                images={images}
                            />
                        </section>
                    </Box>
                    <Box width="100%" borderBottom="2px solid #E2E8F0" mt={7} />

                </Fragment>
            }
        </Fragment >
    );
}

export default Home;