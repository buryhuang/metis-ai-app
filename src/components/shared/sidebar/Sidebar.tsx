import React from 'react';

import './Sidebar.css';
import {Button, Form, Modal, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Inbox, Mail, Search} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

interface SidebarProps {}

interface SidebarState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
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
            showModal: false
        };
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    render() {
        const { code, errorMessage } = this.state;

        return (
            <div className="theme-sidebar">
                <input className="theme-sidebar-input" placeholder="Search for a data source"/>&nbsp;<a><Search className="theme-button-icon" /></a>
                <div />
                <div className="theme-sidebar-list-title">RECENT TABLES</div>
                <Divider />
                <List className="theme-sidebar-list">
                    {['weblink-table1', 'weblink-table2'].map((text, index) => (
                        <ListItem className="theme-sidebar-menu-item" button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List className="theme-sidebar-list">
                    {['csv_sales_table1', 'csv_sales_table2', 'csv_sales_table3'].map((text, index) => (
                        <ListItem className="theme-sidebar-menu-item" button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export { Sidebar };
