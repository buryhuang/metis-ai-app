import React, { Fragment } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import LeftArrowIcon from '../../../../assets/leftArrow.png';
import RightArrowIcon from '../../../../assets/rightArrow.png';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    paginationCounterLabel: {
        margin: "0px 7px"
    }
})
);

const Pagination = ({ hasData, queryLoading }) => {
    const classes = useStyles();
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ pb: 0.7 }}>
            {hasData && queryLoading ?
                <CircularProgress sx={{ my: 2 }} size={14} color="primary" />
                :
                <Fragment>
                    <img src={LeftArrowIcon} alt="left arrow" />
                    <Typography className={classes.paginationCounterLabel}>1</Typography>
                    <Typography className={classes.paginationCounterLabel}>2</Typography>
                    <Typography className={classes.paginationCounterLabel}>3</Typography>
                    <Typography className={classes.paginationCounterLabel}>4</Typography>
                    <Typography className={classes.paginationCounterLabel}>...</Typography>
                    <Typography className={classes.paginationCounterLabel}>10</Typography>
                    <img src={RightArrowIcon} alt="left arrow" />
                </Fragment>
            }
        </Grid>
    );
}

export default Pagination;