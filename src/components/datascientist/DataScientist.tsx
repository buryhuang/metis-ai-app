import React, { SyntheticEvent } from 'react';

import './DataScientist.css';
import Grid from '@mui/material/Grid';
import { SqlQuery } from "./panels/SqlQuery";
import { Sidebar } from "../shared/sidebar/Sidebar";
import { JupyterNotebook } from "./panels/JupyterNotebook";

interface DataScientistProps { }

interface DataScientistState {
    email: string;
    code: string;
    errorMessage: string;
    showModal: boolean;
    currentHeaderMenu: number;
    defaultQuery: string;
    tableName: string;
}

class DataScientist extends React.Component<
    DataScientistProps,
    DataScientistState
> {
    state: DataScientistState;

    constructor(props: DataScientistProps) {
        super(props);
        this.state = {
            email: '-',
            code: '',
            errorMessage: '',
            showModal: false,
            currentHeaderMenu: 0,
            defaultQuery: 'SELECT * FROM datastore.csv_sales_table1 LIMIT 15',
            tableName: 'csv_sales_table1'
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.renderContentFrame = this.renderContentFrame.bind(this);
        this.getActiveStyle = this.getActiveStyle.bind(this);
        this.handleSidebarListClick = this.handleSidebarListClick.bind(this);
    }

    async componentDidMount() {
        // let user = await Auth.currentAuthenticatedUser();
        // this.setState({ email: user.attributes.email });
    }

    handleMenuClick(value: number): void {
        this.setState({
            currentHeaderMenu: value,
        });
    }

    getActiveStyle(currentMenu: number): string {
        if (currentMenu == this.state.currentHeaderMenu) {
            return "theme-menu-item-active";
        }
        return "theme-menu-item-inactive";
    }

    renderContentFrame() {
        const { currentHeaderMenu } = this.state;
        switch (currentHeaderMenu) {
            case 0:
                return <SqlQuery key={this.state.tableName} tableName={this.state.tableName} defaultQuery={this.state.defaultQuery} />;
            case 1:
                return <JupyterNotebook key={this.state.tableName} tableName={this.state.tableName} defaultQuery={this.state.defaultQuery} />;
            // case 2:
            //     return <DataScientist />;
        }
    }

    handleSidebarListClick(tableName: string) {
        this.setState({
            tableName: tableName,
            defaultQuery: 'SELECT * FROM datastore.' + tableName + ' LIMIT 15'
        })
    }

    render() {
        const { code, errorMessage } = this.state;

        return (
            <div className="main-area">
                <div className="main-area-contents">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Sidebar handleListClick={this.handleSidebarListClick} />
                        </Grid>
                        <Grid item xs={8} className="">
                            <Grid container>
                                <a className={this.getActiveStyle(0)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                                    this.handleMenuClick(0)
                                }>SQL QUERY</a>
                                <a className={this.getActiveStyle(1)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                                    this.handleMenuClick(1)
                                }>JUPYTER NOTEBOOK</a>
                                {/*<a  className={this.getActiveStyle(2)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>*/}
                                {/*    this.handleMenuClick(2)*/}
                                {/*}>R ANALYSIS</a>*/}
                            </Grid>
                            {this.renderContentFrame()}
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export { DataScientist };
