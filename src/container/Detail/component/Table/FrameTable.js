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

    return (
        <TableContainer className={classes.table}>
            <Table aria-label="Event Exploration table" stickyHeader>
                <TableHead>
                    <TableRow>
                        {labels && labels.map((l, i) => (
                            <TableCell key={i} width={i == labels.length - 1 ? "30%" : "10%"} sx={{ background: "#fff", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column title={l} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((d, i) => (
                        <TableRow>
                            <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column title={d.schema} />
                            </TableCell>
                            <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column title={d.owner} />
                            </TableCell>
                            <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column title={d.row} />
                            </TableCell>
                            <TableCell key={i} width={"10%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column title={d.sizes} />
                            </TableCell>
                            <TableCell key={i} width={"30%"} sx={{ background: i % 2 !== 0 ? "#fff" : "rgba(35, 61, 145, 0.05)", py: 1 }} align="center" className={classes.cellStyle}>
                                <Column title={d.comment} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FrameTable;