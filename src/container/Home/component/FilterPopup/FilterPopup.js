import React, { Fragment, useState } from 'react';
import { Box } from '@mui/system';
import { Checkbox, FormControlLabel, FormGroup, Grid, InputAdornment, TextField, Button, Typography } from '@mui/material';
import FilterTitle from './component/Title';
import { Search } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';

const selectData = [
    {
        value: 'kb',
        label: 'KB',
    },
    {
        value: 'mb',
        label: 'MB',
    },
    {
        value: 'gb',
        label: 'GB',
    },
];

const FilterPopup = () => {
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        search: '',
        from: '',
        to: '',
        fromSelect: 'kb',
        toSelect: 'mb',
        task: false
    });

    const handleChange = (type, value) => {
        setForm({ ...form, [type]: value });
    };

    const handleFormClear = () => {
        setForm({
            search: '',
            from: '',
            to: '',
            fromSelect: 'kb',
            toSelect: 'mb',
            task: false
        });
    }
    return (
        <Box minWidth={382} mt={2} p={2.8} borderRadius={5} >
            <Fragment>
                <FilterTitle title="Tags" />
                <TextField
                    fullWidth
                    id="search-bar-for-data-soruces"
                    label=" "
                    placeholder="Search for data sources"
                    variant="outlined"
                    value={form.search}
                    onChange={e => handleChange("search", e.target.value)}
                    InputProps={{
                        type: "search",
                        style: {
                            height: 40,
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search style={{ color: "#9A9999", fontSize: 27, marginRight: 5 }} />
                            </InputAdornment>

                        ),
                    }}
                />
            </Fragment>
            <Fragment>
                <FilterTitle title="File Sizes" />
                <Grid container alignItems="center">
                    <TextField
                        sx={{ mr: 1 }}
                        id="from-file-size"
                        label=" "
                        variant="outlined"
                        value={form.from}

                        onChange={e => handleChange("from", Math.ceil(e.target.value))}
                        InputProps={{
                            type: "number",
                            inputProps: {
                                min: 1
                            },
                            style: {
                                height: 40,
                                width: 77
                            },
                        }}
                    />
                    <TextField
                        sx={{ mx: 1 }}
                        id="sizeFrom"
                        label=" "
                        select
                        value={form.fromSelect}
                        onChange={e => handleChange("fromSelect", e.target.value)}
                        InputProps={{
                            style: {
                                height: 40,
                                width: 70
                            },
                        }}

                    >
                        {selectData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography sx={{ color: "#828282", fontSize: 16, mx: 1 }}>To</Typography>
                    <TextField
                        sx={{ mx: 1.5 }}
                        id="to-file-size"
                        label=" "
                        variant="outlined"
                        value={form.to}
                        onChange={e => handleChange("to", Math.ceil(e.target.value))}
                        InputProps={{
                            type: "number",
                            inputProps: {
                                min: 1
                            },
                            style: {
                                height: 40,
                                width: 77
                            },
                        }}
                    />
                    <TextField
                        sx={{ ml: 1 }}
                        id="sizeTo"
                        select
                        label=" "
                        value={form.toSelect}
                        InputProps={{
                            style: {
                                height: 40,
                                width: 70
                            },
                        }}
                        onChange={e => handleChange("toSelect", e.target.value)}
                    >
                        {selectData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Fragment>
            <Fragment>
                <FilterTitle title="Tasks" />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                value={form.task}
                                onChange={e => handleChange("task", e.target.value)}
                            />
                        }
                        label={
                            <Typography sx={{ color: "#373F41", fontWeight: 600, fontSize: 14 }}>
                                Only Datasets with Tasks
                            </Typography>
                        }
                    />
                </FormGroup>
            </Fragment>
            <Fragment>
                <Grid container alignItems="center" justifyContent="flex-end">
                    <Button onClick={handleFormClear}>
                        <Typography>Clear</Typography>
                    </Button>
                    <Button variant="contained" sx={{ ml: 1 }}>
                        <Typography sx={{ color: "#fff" }}>Apply</Typography>
                    </Button>
                </Grid>
            </Fragment>
        </Box>
    );
}

export default FilterPopup;