import React, { Fragment } from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DownloadIcon from '../../../../../assets/trending/download.png';
import BookmarkIcon from '../../../../../assets/trending/bookmark.png';
import clsx from 'clsx';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
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
        '&:first-child': {
            marginLeft: 0,
        },
        [theme.breakpoints.down('md')]: {
            width: 300,
            justify: "center",
            flexWrap: "nowrap",
            marginLeft: 0,
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            justify: "center",
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
        maxWidth: "100%"
    }
})
);


const GridCard = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.cardStyle)} >
            {props.data && props.data.map((d, i) => (
                <Card elevation={0} key={d.id} className={classes.cardContainer} onClick={() => props.handleClick(d)}>
                    <Box position="relative">
                        <Fragment>
                            <img src={d.image_url} alt={d.name} className={classes.cardImage} />
                            <Box position="absolute" top={15} right={20}>
                                <img src={BookmarkIcon} alt="bookmark record" />
                            </Box>
                        </Fragment>
                    </Box>
                    <CardContent style={{ position: "relative", padding: 16 }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Box>
                                <Grid container >
                                    <Box p={0}>
                                        <p className={classes.cardTitle}>{d.name}</p>
                                        <p className={classes.cardDetail}>{d.description}</p>
                                        <p className={classes.cardDetail}>{d.created_at}</p>
                                        <p className={classes.cardDetail}>Usability {d.usability}KB</p>
                                        <p className={classes.cardDetail}>{d.files}  files (CSV)</p>
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