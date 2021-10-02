import React from 'react';

import './Dashboard.css';
import Grid from '@mui/material/Grid';

import Stepper from '@mui/material/Stepper';
import { Button, List, ListItem, ListItemIcon, ListItemText, Step, StepLabel } from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import StorageIcon from '@mui/icons-material/Storage';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { API, graphqlOperation } from "aws-amplify";
import { listDataSources } from "../../graphql/queries";
import { listPipelineJobs } from "../../graphql/queries";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

interface DashboardProps { }

interface DashboardState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
    tableList: any;
}
class StepTransitionIcon extends React.Component {
    render() {
        return (
            <div><MoreHorizIcon /></div>
        );
    }
}

class StepStorageIcon extends React.Component {
    render() {
        return (
            <div><StorageIcon /></div>
        );
    }
}
class StepCloudIcon extends React.Component {
    render() {
        return (
            <div><CloudCircleIcon /></div>
        );
    }
}
class StepSettingIcon extends React.Component {
    render() {
        return (
            <div><SettingsApplicationsIcon /></div>
        );
    }
}

interface EventListProps {
    tableName: string;
    userId: string;
}

interface EventListState {
    events: any;
}

class EventList extends React.Component<EventListProps, any> {
    constructor(props: EventListProps) {
        super(props);
        this.state = {
            events: []
        };
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
        await this.loadEventList();
    }

    async loadEventList() {
        const result: any = await API.graphql(graphqlOperation(listPipelineJobs, { pk: `${this.props.userId}#${this.props.tableName}` }));
        if (result.data.listPipelineJobs.items.length > 0) {
            this.setState({
                events: result.data.listPipelineJobs.items.reverse().map((x: any) => {
                    return `${new Date(parseFloat(x['timestamp']) * 1000)} | ${x['state_code']} | ${x['state_status']} | ${x['state_message']}`
                })
            })
        }
    }

    render() {
        return (
            <List className="theme-event-list">
                {this.state.events.map((text: string, index: number) => (
                    <ListItem className="theme-event-list-item" button key={text}>
                        {/*<ListItemIcon>{this.state.tableList.indexOf(text) == -1 ? <MoreHorizIcon /> : <CheckCircleIcon />}</ListItemIcon>*/}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        );
    }
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
            showModal: false,
            tableList: ["No Data"]
        };
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
        this.loadTableList();
    }

    async loadTableList() {
        const result: any = await API.graphql(graphqlOperation(listDataSources, { user_id: "0dffa840-c3cf-459c-8052-1e3877037e5f" }));
        if (result.data.listDataSources.items.length > 0) {
            this.setState({
                tableList: result.data.listDataSources.items.map((x: any) => {
                    return x['table_name']
                })
            })
        }
    }

    render() {
        return (
            <div className="main-area">
                <div className="main-area-contents">
                    {this.state.tableList.map((table_name: string) =>
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <div>{table_name}</div>
                                <div></div>
                            </Grid>
                            <Grid item xs={8}>
                                <Stepper alternativeLabel>
                                    <Step key="step1" >
                                        <StepLabel StepIconComponent={StepSettingIcon}>Data Source</StepLabel>
                                    </Step>
                                    <Step key="step1-2" >
                                        <StepLabel StepIconComponent={StepTransitionIcon}></StepLabel>
                                    </Step>
                                    <Step key="step2" >
                                        <StepLabel StepIconComponent={StepStorageIcon}>Storage</StepLabel>
                                    </Step>
                                    <Step key="step2-3" >
                                        <StepLabel StepIconComponent={StepTransitionIcon}></StepLabel>
                                    </Step>
                                    <Step key="step3" >
                                        <StepLabel StepIconComponent={StepCloudIcon}>Database</StepLabel>
                                    </Step>
                                </Stepper>
                                <EventList key={`"0dffa840-c3cf-459c-8052-1e3877037e5f"#${table_name}`} userId="0dffa840-c3cf-459c-8052-1e3877037e5f" tableName={table_name} />
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </div>
        );
    }
}

export { Dashboard };
