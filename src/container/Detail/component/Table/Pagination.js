import React from 'react';
import { Grid, Typography } from '@mui/material';
import LeftArrowIcon from '../../../../assets/leftArrow.png';
import RightArrowIcon from '../../../../assets/rightArrow.png';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    paginationCounterLabel: {
        margin: "0px 7px"
    }
})
);

const Pagination = () => {
    const classes = useStyles();
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ pb: 0.7 }}>
            <img src={LeftArrowIcon} alt="left arrow" />
            <Typography className={classes.paginationCounterLabel}>1</Typography>
            <Typography className={classes.paginationCounterLabel}>2</Typography>
            <Typography className={classes.paginationCounterLabel}>3</Typography>
            <Typography className={classes.paginationCounterLabel}>4</Typography>
            <Typography className={classes.paginationCounterLabel}>...</Typography>
            <Typography className={classes.paginationCounterLabel}>10</Typography>
            <img src={RightArrowIcon} alt="left arrow" />
        </Grid>
    );
}

export default Pagination;