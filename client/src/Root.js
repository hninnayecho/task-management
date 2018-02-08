import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import cookie from 'js-cookie';

import Login from './components/User/Login';
import TasksContainer from './components/task/TasksContainer';
import TaskDetail from './components/task/TaskDetail';
import UsersContainer from './components/user/UsersContainer';
import CalendarContainer from './components/calendar/CalendarContainer';
import SomeComponent from './components/SomeComponent';
import Signup from './components/user/Signup';

function isLoggedIn() {
    return cookie.get('authenticated') === 'true';
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
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
    <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute component={TasksContainer} redirectTo="/login" exact path="/tasks" />
        <PrivateRoute component={UsersContainer} redirectTo="/login" exact path="/users" />
        <PrivateRoute component={CalendarContainer} redirectTo="/login" exact path="/calendar" />
        <PrivateRoute component={TaskDetail} redirectTo="/login" path="/tasks/:taskId" />
        <Route exact path="/fake" component={SomeComponent} />
        <Route component={Signup} exact path="/signup" />
    </Switch>
);

const Root = () => (
  <Main />
);

export default Root;