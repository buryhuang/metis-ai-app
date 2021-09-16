import React, { useState } from 'react';
import { Box, makeStyles, createStyles, Button, Grid, List as SortList } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ListItem from '@material-ui/core/ListItem';

import { useHistory } from 'react-router';
import GridIcon from '../../../assets/grid.png';
import ListIcon from '../../../assets/list.png';
import SortIcon from '../../../assets/sort.png';
import ListCard from './component/ListCard';
import GridCard from './component/GridCard';
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            paddingTop: 32,
        },
        titleContainer: {
            marginTop: 44,
            marginBottom: 44,
        },
        titleIcon: {
            width: 25.52,
            height: 25.52,
            marginRight: 20.74
        },
        title: {
            fontWeight: 700,
            color: "#000",
            fontSize: 24,
            margin: 0
        },

        sortDropdownContainer: {
            background: "#FFFFFF",
            boxShadow: "0px 4px 10px #00000030",
            cursor: "pointer",
            width: 157,
            borderRadius: "10px",
            border: "1px solid #FFF",
            padding: "13px 20px"
        },
        listItemStyle: {
            // padding: "5px 10px",
        },
        listItemLabel: {
            fontSize: 16,
            letterSpacing: 0.88,
            textTransform: "capitalize",
            color: theme.palette.primary.main
        }

    })
);

const sortData = [
    {
        id: 1,
        title: 'new'
    },
    {
        id: 2,
        title: 'Updated'
    },
    {
        id: 3,
        title: 'Popular'
    },
    {
        id: 4,
        title: 'Usability'
    },

]


const List = (props) => {
    const classes = useStyles();
    const [active, setactive] = useState(1);
    const [currentSort, setCurrentSort] = React.useState(sortData[0]);
    const history = useHistory()

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Grid container alignItems="baseline" justify="space-between">
                    <Box>
                        <Grid container alignItems="center">
                            <img src={props.icon} alt={props.title} className={classes.titleIcon} />
                            <p className={classes.title}>{props.title}</p>
                            {props.icons &&
                                <Box ml={2}>
                                    <img src={GridIcon} alt="grid icon" onClick={() => setactive(1)} style={{ marginRight: 16 }} />
                                    <img src={ListIcon} alt="list icon" onClick={() => setactive(0)} />
                                </Box>
                            }
                        </Grid>
                    </Box>
                    {active === 1 ?
                        <Button >See All</Button>
                        :
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <div>
                                    <Grid {...bindTrigger(popupState)} justify="space-between" container alignItems="center" className={classes.sortDropdownContainer}>
                                        <span style={{ marginRight: 10, fontSize: 14, fontWeight: 700, textTransform: "uppercase" }}>SOrt By</span>
                                        <img src={SortIcon} />
                                    </Grid>
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <Box width={157} mt={2} borderRadius={5} >
                                            <SortList component="nav">
                                                {sortData.map(sort => (
                                                    <ListItem
                                                        onClick={() => setCurrentSort(sort)}
                                                        className={classes.listItemStyle}
                                                        button
                                                        style={{ backgroundColor: currentSort?.id === sort.id ? "#C4C4C4" : "transparent" }}
                                                    >
                                                        <p className={classes.listItemLabel}>{sort.title}</p>
                                                    </ListItem>
                                                ))}

                                            </SortList>
                                        </Box>
                                    </Popover>
                                </div>
                            )}
                        </PopupState>
                    }
                </Grid>
            </Box>
            {active === 0 ?
                <ListCard
                    data={props.data}
                    handleClick={() => history.push("/detail")}
                />
                :
                <GridCard
                    data={props.data}
                    handleClick={() => history.push("/detail")}
                />
            }
        </Box >
    );
}

export default List;