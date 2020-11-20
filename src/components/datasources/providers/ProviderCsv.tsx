import React from 'react';

// import './DataSources.css';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

interface ProviderCsvProps {}

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
                <div className="row">
                    <div className="col-sm">
                    </div>
                    <div className="col-sm">
                        <input className="theme-input" placeholder="Search for a data source"/><Button variant="outline-success"><i className="fas fa-search" /></Button>
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm"><a>Popular</a></div>
                    <div className="col-sm"><a>Analytics</a></div>
                    <div className="col-sm"><a>Social Media</a></div>
                    <div className="col-sm"><a>Marketing</a></div>
                    <div className="col-sm"><a>Database</a></div>
                    <div className="col-sm"></div>
                </div>
                <div className="row">
                    <hr  style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor : '#000000'
                    }}/>
                </div>
                <div className="row">
                    <div className="col-sm" />
                    <div className="col-sm">
                        <div className="datasources-box">
                            <p><img className="datasources-img" src="https://images.ctfassets.net/3n0fku9d0jjr/1caC38kuhK8WusWKQGIeAO/6a35483a56960b0ff258e5c6acb9c0d7/csv-autofetch.svg" /></p>
                            <Link to="#">Link Account</Link>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="datasources-box">
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="datasources-box">
                        </div>
                    </div>
                    <div className="col-sm" />
                    <div className="col-sm" />
                    <div className="col-sm" />
                </div>
            </div>
        );
    }
}

export { ProviderCsv };
