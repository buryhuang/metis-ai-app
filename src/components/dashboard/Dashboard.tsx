import React from 'react';

import './Dashboard.css';
import {Button, Form, Modal, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import { Search } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface DashboardProps {}

interface DashboardState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
}

class Dashboard extends React.Component<
    DashboardProps,
    DashboardState
    > {
    state: DashboardState;

    constructor(props: DashboardProps) {
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
                    <img src={process.env.PUBLIC_URL + "assets/pipline_example.png"} />
                </div>
            </div>
        );
    }
}

export { Dashboard };
