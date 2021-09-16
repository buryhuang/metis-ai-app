import React from 'react';
import { Box, makeStyles, createStyles, Grid } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DownloadIcon from '../../../../assets/trending/download.png';
import BookmarkBlackIcon from '../../../../assets/bookmark-black.png';
import clsx from 'clsx';
const useStyles = makeStyles((theme) =>
    createStyles({
        cardStyle: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        },
        cardContainer: {
            border: "2px solid #E2E8F0",
            width: "100%",
            marginBottom: 30
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


const ListCard = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.cardStyle)} onClick={props.handleClick}>
            {props.data && props.data.map(d => (
                <Card key={d.id} elevation={0} key={d.id} className={classes.cardContainer}>
                    <CardContent style={{ position: "relative", padding: 16 }}>
                        <Grid container justify="space-between" alignItems="center">
                            <Box>
                                <Grid container >
                                    <img src={d.image} alt={d.title} />
                                    <Box p={2}>
                                        <p className={classes.cardTitle}>{d.title}</p>
                                        <p className={classes.cardDetail}>{d.description}</p>
                                        <p className={classes.cardDetail}>{d.updatedAt} | {d.usability} | {d.counter}</p>
                                    </Box>
                                </Grid>
                            </Box>
                            <Box mr={5}>
                                <Grid container >
                                    <img src={DownloadIcon} alt="download record" style={{ marginRight: 33 }} />
                                    <img src={BookmarkBlackIcon} alt="bookmark record" />
                                </Grid>
                            </Box>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box >
    );
}

export default ListCard;