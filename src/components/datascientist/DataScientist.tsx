import React, {SyntheticEvent} from 'react';

import './DataScientist.css';
import Grid from '@material-ui/core/Grid';
import {Sidebar} from "../shared/sidebar/Sidebar";
import {Dashboard} from "../dashboard/Dashboard";
import {DataSources} from "../datasources/DataSources";
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

interface DataScientistProps {}

interface DataScientistState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
    currentHeaderMenu: number;
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: any) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

class DataScientist extends React.Component<
    DataScientistProps,
    DataScientistState
    > {
    state: DataScientistState;

    constructor(props: DataScientistProps) {
        super(props);
        this.state = {
            email: '-',
            code: '',
            errorMessage: '',
            showModal: false,
            currentHeaderMenu: 0
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.renderContentFrame = this.renderContentFrame.bind(this);
        this.getActiveStyle = this.getActiveStyle.bind(this);
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    handleMenuClick(value: number): void {
        this.setState({ currentHeaderMenu: value });
    }

    getActiveStyle(currentMenu: number): string {
        if (currentMenu == this.state.currentHeaderMenu) {
            return "theme-menu-item-active";
        }
        return "theme-menu-item-inactive";
    }

    renderContentFrame() {
        const { currentHeaderMenu } = this.state;
        console.log(currentHeaderMenu);

        switch (currentHeaderMenu) {
            case 0:
                return <Dashboard />;
            case 1:
                return <DataSources />;
            case 2:
                return <DataScientist />;
        }
    }

    render() {
        const { code, errorMessage } = this.state;

        return (
            <div className="main-area">
                <div className="main-area-contents">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Sidebar />
                        </Grid>
                        <Grid item xs={8} className="">
                            <Grid container>
                                <a className={this.getActiveStyle(0)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                                    this.handleMenuClick(0)
                                }>SQL QUERY</a>
                                <a className={this.getActiveStyle(1)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                                    this.handleMenuClick(1)
                                }>JUPYTER NOTEBOOK</a>
                                <a  className={this.getActiveStyle(2)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                                    this.handleMenuClick(2)
                                }>R ANALYSIS</a>
                            </Grid>
                            <Grid container>
                                <div className="theme-description-box">
                                    <p>Metis A.I. Select supports only the SELECT SQL command. Using the Data Analyst console, you can extract up to 40 MB of records from an object that is up to 128 MB in size. To work with larger files or more records, for more complex SQL queries, use Data Science console.</p>
                                    <Button className="theme-query-button">RUN Query</Button>
                                </div>
                                <textarea className="theme-query-input-box" placeholder="Search for a data source" value="/* To create reference point for writing SQL queries, you can display the first 5 records of input data by running the following SQL query: SELECT * FROM s3object s LIMIT 5 */
SELECT * FROM s3object s LIMIT 5"/>
                                <div className="theme-query-result" >
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export { DataScientist };
