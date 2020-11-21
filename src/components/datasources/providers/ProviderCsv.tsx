import React from 'react';

import {Button, Form} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";

interface ProviderCsvProps {
    onSave: any;
}

interface ProviderState {
    email: string;
    code: string;
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
            email: '-',
            code: '',
            errorMessage: '',
        };
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    render() {
        const { code, errorMessage } = this.state;

        return (
            <div className="theme-modal-dialog">
                <Grid container spacing={3}>
                    &nbsp;
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={8}>
                        <input className="theme-input" placeholder="Table name"/>
                        <input className="theme-input" placeholder="Link to the csv file"/>
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
                        <Button onClick={this.props.onSave}>Save</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export { ProviderCsv };
