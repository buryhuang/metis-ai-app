import React from 'react';

import {Button, Form} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";

import { API, graphqlOperation } from "aws-amplify";
import { createUser } from '../../../graphql/mutations';

interface ProviderCsvProps {
    onSave: any;
}

interface ProviderState {
    tableName: string;
    dataUrl: string;
    errorMessage: string;
}

class ProviderCsv extends React.Component<
    ProviderCsvProps,
    ProviderState
    > {
    state: ProviderState;

    constructor(props: ProviderCsvProps) {
        super(props);
        this.state = {
            tableName: 'csv-link-table-1',
            dataUrl: 'https://testcsvselect.s3.amazonaws.com/matching_results.csv',
            errorMessage: '',
        };
        this.handleTableNameChange = this.handleTableNameChange.bind(this);
        this.handleDataUrlChange = this.handleDataUrlChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    handleTableNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event?.target?.value);
        this.setState({ tableName: event?.target?.value });
    }

    handleDataUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event?.target?.value);
        this.setState({ dataUrl: event?.target?.value });
    }

    handleSave() {
        console.log(this.state);

        const userData = { email: "david@johnsongroup.org", data: JSON.stringify(this.state) };

        API.graphql(graphqlOperation(createUser, {input: userData}))
        this.props.onSave();
    }

    render() {
        return (
            <div className="theme-modal-dialog">
                <Grid container spacing={3}>
                    &nbsp;
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={8}>
                        <p>Table Name:</p>
                        <input className="theme-input-border" value={this.state.tableName} placeholder="Table name" onChange={this.handleTableNameChange}/>
                        <p>Data Url:</p>
                        <input className="theme-input-border" value={this.state.dataUrl} placeholder="Link to the csv file" onChange={this.handleDataUrlChange}/>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={this.handleSave}>Save</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export { ProviderCsv };
