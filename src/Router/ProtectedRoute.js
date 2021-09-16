import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Grid } from '@material-ui/core';
const ProtectedRoute = ({ component: Component, ...props }) => {
    const [loggedIn, setLoggedIn] = useState(null);

    const checkUserAuthState = async () => {
        const isLoggedIn = "true" //localStorage.getItem('loggedIn');
        if (isLoggedIn === "true") {
            setLoggedIn(true)
        } else {
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        checkUserAuthState();
    }, [loggedIn]);

    return (
        <Route {...props} render={({ location, ...props }) => {
            return loggedIn === null ?
                <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "20%", width: "100%" }}>
                    <Loader
                        type="CradleLoader"
                        visible={true}
                        color="#00BFFF"
                        height="25%"
                        width="25%"
                    />
                </Grid>
                :
                loggedIn === true
                    ? <Component {...props} />
                    :
                    loggedIn === false &&
                    <Redirect to={{
                        pathname: "/login",
                        state: {
                            from: location
                        }
                    }}
                    />
        }}
        />
    )
}

export default ProtectedRoute;
