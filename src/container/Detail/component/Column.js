import { Typography } from '@mui/material';
import React from 'react';

const Column = (props) => {
    const { isHeader, title, bold } = props;
    return (
        <Typography
            component="span"
            style={{
                fontSize: isHeader && !bold ? 14 : 12,
                fontWeight: props.isHeader || bold ? 700 : 400,
                color: "#000"
            }}>{title}</Typography>
    );
}

export default Column;