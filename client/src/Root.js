import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import cookie from 'js-cookie';

import Login from './Login';
import App from './App';
import SomeComponent from './SomeComponent';

function isLoggedIn() {
    return cookie.get('authenticated') === 'true';
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
}

const PrivateRoute = ({ component, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return isLoggedIn() ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                    <Redirect to={{
                        pathname: redirectTo,
                        state: { from: routeProps.location }
                    }} />
                );
        }} />
    );
};

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRoute component={App} redirectTo="/login" exact path="/tasks" />
            <Route exact path="/fake" component={SomeComponent} />
        </Switch>
    </main>
);

const Root = () => (
    <div>
        <Main />
    </div>
);

export default Root;