import React from 'react';

import './Sidebar.css';
import { Search } from '@mui/icons-material';

import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import { API, graphqlOperation } from "aws-amplify";
import { listDataSources } from '../../../graphql/queries';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Modal } from "react-bootstrap";
import { ProviderCsv } from "../../datasources/providers/ProviderCsv";
import { updateDataSource } from "../../../graphql/mutations";
import { DropzoneDialog } from 'material-ui-dropzone'
import axios from 'axios';

interface SidebarProps {
    handleListClick: any;
}

interface SidebarState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
    resultColumns: any,
    resultRows: any,
    tableList: any,
    jobList: any,
    menuButton: any,
    openFileUploadDialog: boolean,
}

class Sidebar extends React.Component<
    SidebarProps,
    SidebarState
> {
    state: SidebarState;

    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            email: '-',
            code: '',
            errorMessage: '',
            showModal: false,
            resultColumns: [],
            resultRows: [],
            tableList: [],
            jobList: [],
            menuButton: null,
            openFileUploadDialog: false
        };
        this.handleRefreshTable = this.handleRefreshTable.bind(this);
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
        this.loadJobList();
        this.loadTableList();
    }

    async loadJobList() {
        const result: any = await API.graphql(graphqlOperation(listDataSources, { user_id: "0dffa840-c3cf-459c-8052-1e3877037e5f" }));
        this.setState({
            jobList: result.data.listDataSources.items.map((x: any) => { return x['table_name'] })
        })
    }

    async loadTableList() {
        const listTableQuery = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'datastore'";
        fetch("https://hdhfcsdukf.execute-api.us-east-1.amazonaws.com/dev?query=" + encodeURI(listTableQuery) + "&table=" + encodeURI("pg_tables"), {
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
                    resultColumns: data_obj['columns'].map((x: any) => { return { 'field': x['name'], 'headerName': x['name'] } }),
                    resultRows: data_obj['rows'],
                    tableList: data_obj['rows'].map((x: any) => { return x['schemaname'] }),
                })
            })
            .catch((error) => {
                console.log(error, "Failed to load table data");
                this.setState({ errorMessage: error });
            })
    }

    handleRefreshTable(tableName: string) {
        const dataSource = { user_id: "0dffa840-c3cf-459c-8052-1e3877037e5f", table_name: tableName, refresh_request: Date.now() };
        API.graphql(graphqlOperation(updateDataSource, { input: dataSource }))
    }

    handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({ menuButton: event.currentTarget });
    };

    handleMenuClose() {
        this.setState({ menuButton: null });
    }

    async handleUploadFilesSave(files: File[], event: React.SyntheticEvent) {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        const file = files[0]
        formData.append(
            file.name,
            file
        );
        await axios.post("https://hdhfcsdukf.execute-api.us-east-1.amazonaws.com/dev/upload",
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } });

        this.setState({ openFileUploadDialog: false });
    }

    handleUploadFilesClose() {
        this.setState({ openFileUploadDialog: false });
    }

    render() {
        return (
            <div className="theme-sidebar">
                <input className="theme-sidebar-input" placeholder="Search for a data source" />&nbsp;<a><Search className="theme-button-icon" /></a>
                <div />
                <Grid container>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={4}>
                        <Button onClick={this.handleMenuClick.bind(this)}><AddCircleIcon className="theme-button" /></Button>
                        <Menu anchorEl={this.state.menuButton} open={Boolean(this.state.menuButton)} onClose={this.handleMenuClose.bind(this)}>
                            <MenuItem onClick={() => this.setState({ showModal: true, menuButton: null })}>Data Source From Url</MenuItem>
                            <MenuItem onClick={() => this.setState({ openFileUploadDialog: true, menuButton: null })}>Upload Files</MenuItem>
                        </Menu>
                        {this.state.showModal && <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}> <ProviderCsv onSave={() => this.setState({ showModal: false })} /> </Modal>}
                        <DropzoneDialog
                            open={this.state.openFileUploadDialog}
                            onSave={this.handleUploadFilesSave.bind(this)}
                            acceptedFiles={['.csv', 'text/csv']}
                            showPreviews={true}
                            maxFileSize={50000000}
                            onClose={this.handleUploadFilesClose.bind(this)}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <div className="theme-sidebar-list-title">RECENT TABLES</div>
                <Divider />
                <List className="theme-sidebar-list">
                    {this.state.jobList.map((text: string, index: number) => (
                        <ListItem className="theme-sidebar-menu-item" button key={text} onClick={() => this.props.handleListClick(text)}>
                            <ListItemIcon>{this.state.tableList.indexOf(text) == -1 ? <MoreHorizIcon /> : <CheckCircleIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                            <Button onClick={() => { this.handleRefreshTable(text) }}><RefreshIcon /></Button>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export { Sidebar };
