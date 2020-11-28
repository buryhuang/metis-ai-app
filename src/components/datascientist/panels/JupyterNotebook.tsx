import React, {SyntheticEvent} from 'react';

// import './DataScientist.css';
import Grid from '@material-ui/core/Grid';
import Iframe from 'react-iframe'

interface JupyterNotebookProps {
        defaultQuery: string;
        tableName: string;
}

interface JupyterNotebookState {
    resultColumns: any;
    resultRows: any;
    queryString: string;
    tableName: string;
    errorMessage: string;
}

class JupyterNotebook extends React.Component<
    JupyterNotebookProps,
    JupyterNotebookState
    > {
    state: JupyterNotebookState;

    constructor(props: JupyterNotebookProps) {
        super(props);
        this.state = {
            resultColumns: [],
            resultRows: [],
            queryString: props.defaultQuery,
            tableName: props.tableName,
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
        fetch("https://hdhfcsdukf.execute-api.us-east-1.amazonaws.com/dev?query=" + encodeURI(this.state.queryString) + "&table=" + encodeURI(this.state.tableName), {
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
                this.setState({errorMessage: "Failed to load table data"});
            })
    }

    render() {
        return (
            <div>
                <Grid container>
                    <a>http://18.207.119.36:8888/</a>
                    <Iframe url="http://18.207.119.36:8888/"
                            width="450px"
                            height="450px"
                            id="myId"
                            className="myClassname"
                            display="inline"
                            position="relative"/>
                </Grid>
            </div>
        );
    }
}

export { JupyterNotebook };
