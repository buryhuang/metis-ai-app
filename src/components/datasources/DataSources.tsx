import React from 'react';

import './DataSources.css';
import {Button, Form, Modal, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ProviderCsv} from "./providers/ProviderCsv";
import { Search } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navbar from "react-bootstrap/Navbar";

interface DataSourcesProps {}

interface DataSourcesState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
}

class DataSources extends React.Component<
    DataSourcesProps,
    DataSourcesState
    > {
    state: DataSourcesState;

    constructor(props: DataSourcesProps) {
        super(props);
        this.state = {
            email: '-',
            code: '',
            errorMessage: '',
            showModal: false
        };
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    // handleSuccess = (data) => {
    //     this.setState({
    //         code: data.code,
    //         errorMessage: '',
    //     });
    // };
    //
    // handleFailure = (error) => {
    //     this.setState({
    //         code: '',
    //         errorMessage: error.errorMessage,
    //     });
    // };

    render() {
        const { code, errorMessage } = this.state;

        return (
            <div className="main-area">
                <div className="main-area-contents">
                    <Grid container spacing={3}>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={6}>
                            <input className="theme-input" placeholder="Search for a data source"/>&nbsp;<a><Search className="theme-button-icon" /></a>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <a className="theme-content-menu-item active">Popular</a>
                                </Grid>
                                <Grid item xs>
                                    <a className="theme-content-menu-item">Analytics</a>
                                </Grid>
                                <Grid item xs>
                                    <a className="theme-content-menu-item">Social Media</a>
                                </Grid>
                                <Grid item xs>
                                    <a className="theme-content-menu-item">Marketing</a>
                                </Grid>
                                <Grid item xs>
                                    <a className="theme-content-menu-item">Database</a>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <hr className="theme-content-menu-divider"/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <div className="datasources-box">
                                <p><img className="datasources-img" src="https://images.ctfassets.net/3n0fku9d0jjr/1caC38kuhK8WusWKQGIeAO/6a35483a56960b0ff258e5c6acb9c0d7/csv-autofetch.svg" /></p>
                                {/*<a >Link Account</a>*/}
                                <a onClick={() => this.setState({showModal: true})}>Link Account</a>
                                {this.state.showModal && <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}> <ProviderCsv onSave={() => this.setState({showModal: false})} /> </Modal>}
                            </div>
                        </Grid>
                        <Grid item xs>
                            <div className="datasources-box"></div>
                        </Grid>
                        <Grid item xs>
                            <div className="datasources-box"></div>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                    <div className="row theme-row">
                        <hr  style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: .5,
                            borderColor : '#000000'
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export { DataSources };
