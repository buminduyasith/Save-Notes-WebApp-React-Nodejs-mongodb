import React from 'react'

import { BrowserRouter as Router , Redirect,Route } from 'react-router-dom';

const prefix = 'notessavenodeandreactapp';
const UserPrivateRoute = ({component: Component, ...rest}) => {



    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            localStorage.getItem(prefix)!=undefined?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default UserPrivateRoute;


