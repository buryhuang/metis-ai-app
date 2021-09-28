import React, { Fragment } from 'react';
import { Box, makeStyles, createStyles, Grid } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DownloadIcon from '../../../../assets/trending/download.png';
import BookmarkIcon from '../../../../assets/trending/bookmark.png';
import clsx from 'clsx';
import moment from 'moment';
const useStyles = makeStyles((theme) =>
    createStyles({
        cardStyle: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            transition: "1s all"
        },
        cardContainer: {
            marginLeft: 25,
            border: "2px solid #E2E8F0",
            width: 245,
            marginBottom: 30,
            [theme.breakpoints.down('md')]: {
                width: 300,
                justifyContent: "center",
                flexWrap: "nowrap"
            },
            [theme.breakpoints.down('sm')]: {
                width: "100%",
                justifyContent: "center",
                flexWrap: "nowrap"
            }
        },
        cardImage: {
            width: "100%",
            position: "relative"
        },
        cardTitle: {
            fontSize: 14,
            fontWeight: 700,
            color: "#000"
        },
        cardDetail: {
            fontSize: 11,
            fontWeight: 400,
            maxWidth: "75%"
        }
    })
);


const GridCard = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.cardStyle)} >
            {props.data && props.data.map((d, i) => (
                <Card elevation={0} key={d.id} className={classes.cardContainer} onClick={props.handleClick}>
                    <Box position="relative">
                        <Fragment>
                            <img src={props.images[i]} alt={d.ds_name} className={classes.cardImage} />
                            <Box position="absolute" top={15} right={20}>
                                <img src={BookmarkIcon} alt="bookmark record" />
                            </Box>
                        </Fragment>
                    </Box>
                    <CardContent style={{ position: "relative", padding: 16 }}>
                        <Grid container justify="space-between" alignItems="center">
                            <Box>
                                <Grid container >
                                    <Box p={0}>
                                        <p className={classes.cardTitle}>{d.ds_name}</p>
                                        <p className={classes.cardDetail}>{d.ds_description}</p>
                                        <p className={classes.cardDetail}>{d.ds_init_timestamp}</p>
                                        <p className={classes.cardDetail}>Usability {d.ds_usability}KB</p>
                                        <p className={classes.cardDetail}>{d.ds_files}  files (CSV)</p>
                                    </Box>
                                </Grid>
                            </Box>
                            <Box position="absolute" bottom={15} right={15}>
                                <img src={DownloadIcon} alt="download record" />
                            </Box>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default GridCard;