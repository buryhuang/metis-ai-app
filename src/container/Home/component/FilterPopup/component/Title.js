import React from 'react';
import { Typography } from '@mui/material';

const FilterTitle = ({ title }) => {
    return (
        <Typography sx={{ my: 1.5, color: "#828282", fontWeight: 700, fontSize: 14 }}>{title}</Typography>
    );
}

export default FilterTitle;