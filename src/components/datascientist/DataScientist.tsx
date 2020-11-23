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
    resultColumns: any;
    resultRows: any;
    queryString: string;
}

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
            currentHeaderMenu: 0,
            resultColumns: [],
            resultRows: [],
            queryString: "SELECT * FROM datastore.csv_sales_table1 LIMIT 100"
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.renderContentFrame = this.renderContentFrame.bind(this);
        this.getActiveStyle = this.getActiveStyle.bind(this);
        this.handleRunQuery = this.handleRunQuery.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    handleMenuClick(value: number): void {
        this.setState({
            currentHeaderMenu: value,
            resultRows: {}
        });
    }

    handleQueryChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        console.log(event?.target?.value);
        this.setState({ queryString: event?.target?.value });
    }

    handleRunQuery(): void {
        fetch("https://qvn38s6a8h.execute-api.us-east-1.amazonaws.com/dev", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                const data_obj = JSON.parse(data.body)
                this.setState({
                    resultColumns: data_obj['columns'].map((x: any) => {return {'field': x['name'], 'headerName': x['name'], 'width': 60}}),
                    resultRows: data_obj['rows'],
                })
            })
            .catch((error) => {
                console.log(error, "Failed to load table data");
                this.setState({errorMessage: error});
            })
    }

    getActiveStyle(currentMenu: number): string {
        if (currentMenu == this.state.currentHeaderMenu) {
            return "theme-menu-item-active";
        }
        return "theme-menu-item-inactive";
    }

    renderContentFrame() {
        const { currentHeaderMenu } = this.state;
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
                                    <Button className="theme-query-button" onClick={this.handleRunQuery}>RUN Query</Button>
                                </div>
                                <textarea onChange={this.handleQueryChange} className="theme-query-input-box" placeholder="Search for a data source" value={this.state.queryString}/>
                                <div className="theme-query-result" >
                                    <DataGrid rows={this.state.resultRows} columns={this.state.resultColumns} pageSize={10} />
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
