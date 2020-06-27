import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Files from '../Files/Files';

const NotFoundRedirect = () => <Redirect to='/not-found' />

const Routes = (props) => {
    return(
        <BrowserRouter>
            <NavBar {...props} />
            <Switch>
                <Route exact path='/' component={() => <Home {...props} />} />
                <Route path="/:uid/:file_id" component={Files} />
                <Route component={NotFoundRedirect} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;