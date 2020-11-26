import React, {SyntheticEvent} from 'react';

// import './DataScientist.css';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";

interface SqlQueryProps {
}

interface SqlQueryState {
    resultColumns: any;
    resultRows: any;
    queryString: string;
    tableName: string;
    errorMessage: string;
}

class SqlQuery extends React.Component<
    SqlQueryProps,
    SqlQueryState
    > {
    state: SqlQueryState;

    constructor(props: SqlQueryProps) {
        super(props);
        this.state = {
            resultColumns: [],
            resultRows: [],
            queryString: "SELECT * FROM datastore.csv_sales_table1 LIMIT 15",
            tableName: "csv_sales_table1",
            errorMessage: ""
        };
        this.handleRunQuery = this.handleRunQuery.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    handleQueryChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ queryString: event?.target?.value });
    }

    handleRunQuery(): void {
        fetch("https://cs2vycpq5j.execute-api.us-east-1.amazonaws.com/dev?query=" + encodeURI(this.state.queryString) + "&table=" + encodeURI(this.state.tableName), {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data_obj) => {
                this.setState({
                    resultColumns: data_obj['columns'].map((x: any) => {return {'field': x['name'], 'headerName': x['name']}}),
                    resultRows: data_obj['rows'],
                })
            })
            .catch((error) => {
                console.log(error, "Failed to load table data");
                this.setState({errorMessage: error});
            })
    }

    render() {
        return (
            <div>
                <Grid container>
                    <div className="theme-description-box">
                        <p>Metis A.I. Select supports only the SELECT SQL command. Using the Data Analyst console, you can extract up to 40 MB of records from an object that is up to 128 MB in size. To work with larger files or more records, for more complex SQL queries, use Data Science console.</p>
                        <Button className="theme-query-button" onClick={this.handleRunQuery}>RUN Query</Button>
                    </div>
                    <textarea onChange={this.handleQueryChange} className="theme-query-input-box" placeholder="Search for a data source" value={this.state.queryString}/>
                    <div className="theme-query-result" >
                        <DataGrid rows={this.state.resultRows} columns={this.state.resultColumns} pageSize={10} />
                        <div>{this.state.errorMessage}</div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export { SqlQuery };
