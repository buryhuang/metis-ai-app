import React from 'react';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Column from '../Column';


const useStyles = makeStyles((theme) => ({
    table: {
        borderLeft: "1px solid #C2CEDB",
        overflow: "auto",
        maxHeight: document.body.scrollHeight / 3
    },
    cellStyle: {
        borderLeft: "1px solid #C2CEDB",
    }

})
);


const FrameTable = ({ labels, data }) => {
    const classes = useStyles();

    const addTableRow = (result, index) => {
        const record = Object.keys(result).map((item) => {
            return (
                <TableCell key={item} sx={{ background: index % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                    <Column title={data[index][item]} />
                </TableCell>
            );
        });
        return record;

    }

    return (
        <TableContainer className={classes.table}>
            <Table aria-label="Event Exploration table" stickyHeader>
                <TableHead>
                    <TableRow>
                        {labels && labels.map((l, i) => (
                            <TableCell key={i} sx={{ background: "#fff", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column isHeader title={l} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((d, i) => (
                        <TableRow>
                            {addTableRow(d, i)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FrameTable;