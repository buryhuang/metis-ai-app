import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, Typography, Button, TextField, Tabs, Tab, ButtonBase, CircularProgress } from '@mui/material';
import Header from '../../components/Header/Header';
import DownloadIcon from '../../assets/download-blue.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '../../assets/refresh.png';
import { useHistory, useLocation } from 'react-router';
import { fetchRequest } from '../../Utils/FetchRequest';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsLight";
import FrameTable from './component/Table/FrameTable';
import Pagination from './component/Table/Pagination';
import Footer from './component/Footer';
import Sidebar from './component/Sidebar/Sidebar';
import { toast } from '../../Utils/Toast';



const useStyles = makeStyles((theme) => ({
    innerContainer: {
        width: "97%",
        height: "80%"
    },
    table: {
        borderLeft: "1px solid #C2CEDB",
        overflow: "auto",
        maxHeight: document.body.scrollHeight / 3.15
    },
    cellStyle: {
        borderLeft: "1px solid #C2CEDB",
    },
    paginationCounterLabel: {
        margin: "0px 7px"
    },
    filterRoot: {
        width: 300,
        boxShadow: "0px 6px 4px rgba(222, 219, 219, 0.25)",
        background: "#fff"
    },
    inputStyle: {
        [`& fieldset`]: {
            borderRadius: 5,
        },
    },
    textAreaRoot: {
        background: "#fff"
    },
    textareaInput: {
        fontsize: 11,
    },
    textareaStyle: {
        '&:focus': {
            outline: "none",
            borderRadius: 0,
            border: 0
        },
        [`& fieldset`]: {
            borderRadius: 0,
            border: 0,
            outline: "none",

        },
    }

})
);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`detail-tab-${index}`}
            aria-labelledby={`detail tabs-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DetailTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#233D91',
        padding: "4px 0",
        borderRadius: 100
    },
});

const DetailTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    textTransform: "none",
    fontsize: 15,
    letterSpacing: 0.95,
    marginRight: theme.spacing(1),
    color: '#233D91',
    '&.Mui-selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#828282',
    },
}));

const styles = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        borderTop: "3px solid #EDF2F7",
        borderLeft: "1px solid #C2CEDB",
        borderBottom: "1px solid #C2CEDB",
        height: "30vh",
        padding: 0,
        overflow: "auto",
        ...theme.plain,
    }
}

const Detail = () => {
    const classes = useStyles();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('select * from ');
    const [dsID, setdsID] = useState(null);
    const [leftSidebarData, setleftSidebarData] = useState(null);
    const [queryLoading, setqueryLoading] = useState(false);
    const [value, setValue] = React.useState(0);
    const [tableKeys, settableKeys] = useState(null);
    const [tableRows, settableRows] = useState(null);
    const [dataInCSV,setDataInCSV] = useState(null);
    const id = useQuery().get('id');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getDatasetByID = () => {
        fetchRequest(`datasets/${id}`).then(res => {
            setleftSidebarData(res.data);
        }).catch(err => {
            console.log('err.message', err.message)
        })
    }

    useEffect(() => {
        getDatasetByID();
    }, [id])

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }


    const highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language="sql">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Fragment>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                        </div>
                    ))}
                </Fragment>
            )}
        </Highlight>
    );

    const ToastMsg = () => (
        <div>
          There is an error for query !<br/>
          <a style={{color:'blue'}}onClick={()=>window.open('https://www.mysqltutorial.org/mysql-select-statement-query-data.aspx','_blank')}>More Information</a>
        </div>
      )
    
    const runQuery = () => {
        let url = `dataframes/query?df_id=${dsID}&select_sql_stmt=${query}`
        if (!dsID || !query) return false;
        setqueryLoading(true);
        console.log(url);
        fetchRequest(url).then(res => {
            console.log(`🚀 ~ file: Detail.js ~ line 204 ~ fetchRequest ~ res.data`, res.data);
            setdsID(dsID);
            setDataInCSV(res.data);
            const result = JSON.parse(res.data);
            if (result.length > 0) {
                settableKeys(Object.keys(result[0]));
                settableRows(result);
            } else {
                settableKeys([]);
                settableRows([]);
                toast("No record found regarding query.")
            }
            setqueryLoading(false)
        }).catch(err => {
            console.log(`🚀 ~ file: Detail.js ~ line 204 ~ fetchRequest ~ err`, err);
            setqueryLoading(false);
            toast(ToastMsg, "error")
        });
    }


    return (
        <Fragment>
            <Header />
            <Box className={classes.innerContainer} >
                <Box maxHeight={300}>
                    <Grid pl={5} py={1} container alignItems="center" sx={{ mt: 3 }}>
                        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => history.goBack()} fontSize="large" />
                        <Box sx={{ fontWeight: 600, fontSize: 12, ml: 1.5, textTransform: "uppercase", color: "#4F4F4F" }}>Datasets</Box>
                    </Grid>

                </Box>
                <Grid container ml={5} mr={5}>
                    <Grid item sm={2} sx={{ background: "#FFF", }}>
                        <Box paddingBottom="20px" borderBottom="1px solid #EDF2F7">
                            <Box maxWidth="95%" pt={1} pl={1}>
                                <Typography sx={{ color: "##4F4F4F", fontSize: 12, mb: 1, fontWeight: 500 }} >Find Database objects</Typography>
                                <TextField
                                    fullWidth
                                    value={search}
                                    id="find-database-object"
                                    label="Starting with..."
                                    variant="outlined"
                                    className={classes.inputStyle}
                                    onChange={e => setSearch(e.target.value)}
                                    size="small"
                                />
                            </Box>
                        </Box>
                        <Box my={3} pl={1}>
                            {
                                !leftSidebarData ?
                                    <Grid container justifyContent="center" sx={{ mt: 1.5 }}>
                                        <CircularProgress size={14} color="primary" />
                                    </Grid>
                                    :
                                    <Sidebar onDoubleClick={(id,name) => {
                                        setdsID(id);
                                        setQuery(query + name);
                                    }} pid={id} data={leftSidebarData} />
                            }
                        </Box>
                    </Grid>
                    <Grid item sm={10}>
                        <Box sx={{ background: "rgba(35, 61, 145, 0.05)", mr: 3 }}>
                            <Box>
                                <Box sx={{ background: "#fff", pt: 3.5, pb: 2.9, px: 3, borderLeft: "1px solid #C2CEDB" }}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        { dsID ? 
                                            <Button disabled={query === '' || !dsID} onClick={() => runQuery()} variant="contained" sx={{ px: 6, py: 0.85, background: "#4680C2" }}>
                                                <Typography sx={{ color: "#fff" }}>run</Typography>
                                            </Button> : 
                                            <Button disabled={query === '' || !dsID} onClick={() => runQuery()} variant="contained" sx={{ px: 4.5, py: 0.85, background: "#4680C2" }}>
                                                <Typography sx={{ color: "#fff" }}>select</Typography>
                                            </Button>
                                        }
                                    </Grid>
                                </Box>
                                <Box>
                                    <Editor
                                        value={query}
                                        onValueChange={code => setQuery(code)}
                                        highlight={highlight}
                                        style={styles.root}
                                        textareaClassName={classes.textareaStyle}
                                    />
                                </Box>
                                <Box sx={{ background: "#fff", border: "1px solid rgba(35, 61, 145, 0.2)" }}>
                                    <DetailTabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="detail tabs"
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                    >
                                        <DetailTab label="Result" {...a11yProps(0)} />
                                    </DetailTabs>
                                </Box>
                                <Box sx={{ background: "#fff", py: 2, pr: 3, border: "1px solid rgba(35, 61, 145, 0.2)", borderTop: 0 }}>
                                    <Grid container justifyContent="flex-end" alignItems="center">
                                        <Box mr={4}>
                                            <TextField
                                                value={filter}
                                                id="filter-result"
                                                label="Filter result..."
                                                classes={{ root: classes.filterRoot }}
                                                variant="outlined"
                                                onChange={e => setFilter(e.target.value)}
                                                className={classes.inputStyle}
                                                size="small"
                                            />
                                        </Box>
                                        <a href={`data:text/csv;charset=utf-8,${escape(dataInCSV)}`} download="Records.csv">
                                            <img src={DownloadIcon} alt="download record" style={{ marginRight: 25, height: 20 }} />
                                        </a>
                                    </Grid>
                                </Box>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Grid container justifyContent="space-between" alignItems="center" direction="column">
                                    {tableKeys ?
                                        <FrameTable data={tableRows} labels={tableKeys} />
                                        :
                                        queryLoading ?
                                            <CircularProgress sx={{ my: 2 }} size={14} color="primary" />
                                            :

                                            <Typography variant="subtitle1" component="h4" sx={{ py: 1 }}>No Record</Typography>
                                    }
                                    <Box pb={1} pt={1.5} border="1px solid #C2CEDB" width="100%">
                                        {tableRows && tableRows.length > 10 && <Pagination hasData={tableKeys ? true : false} queryLoading={queryLoading} />}
                                        <Footer />
                                    </Box>
                                </Grid>
                            </TabPanel>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment >
    );
}

export default Detail;