import React from 'react';

import './Sidebar.css';
import {Search} from '@material-ui/icons';

import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import { API, graphqlOperation } from "aws-amplify";
import { listDataSources } from '../../../graphql/queries';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

interface SidebarProps {}

interface SidebarState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
    resultColumns: any,
    resultRows: any,
    tableList: any,
    jobList: any
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
            jobList: []
        };
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
        this.loadJobList();
        this.loadTableList();
    }

    async loadJobList() {
        const result: any = await API.graphql(graphqlOperation(listDataSources, {user_id: "0dffa840-c3cf-459c-8052-1e3877037e5f"}));
        this.setState({
            jobList: result.data.listDataSources.items.map((x: any) => {return x['table_name']})
        })
    }

    async loadTableList() {
        const listTableQuery = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'datastore'";
        fetch("https://cs2vycpq5j.execute-api.us-east-1.amazonaws.com/dev?query=" + encodeURI(listTableQuery) + "&table=" + encodeURI("pg_tables"), {
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
                    tableList: data_obj['rows'].map((x: any) => {return x['schemaname']}),
                })
            })
            .catch((error) => {
                console.log(error, "Failed to load table data");
                this.setState({errorMessage: error});
            })
    }

    render() {
        return (
            <div className="theme-sidebar">
                <input className="theme-sidebar-input" placeholder="Search for a data source"/>&nbsp;<a><Search className="theme-button-icon" /></a>
                <div />
                <div className="theme-sidebar-list-title">RECENT TABLES</div>
                <Divider />
                <List className="theme-sidebar-list">
                    {this.state.jobList.map((text: string, index: number) => (
                        <ListItem className="theme-sidebar-menu-item" button key={text}>
                            <ListItemIcon>{this.state.tableList.indexOf(text) == -1 ? <MoreHorizIcon /> : <CheckCircleIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                {/*<Divider />*/}
                {/*<List className="theme-sidebar-list">*/}
                {/*    {['csv_sales_table1', 'csv_sales_table2', 'csv_sales_table3'].map((text, index) => (*/}
                {/*        <ListItem className="theme-sidebar-menu-item" button key={text}>*/}
                {/*            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>*/}
                {/*            <ListItemText primary={text} />*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
            </div>
        );
    }
}

export { Sidebar };
