import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export default function PrivateRoute({ component: Component, ...rest }) {
    const userLogin = useSelector(state => state.userLogin);
    const { userData } = userLogin;

    return (
        <>
            <Route {...rest} render={(props) => userData ? (
                <Component {...props}></Component> ) : (
                    <Redirect to='/login' />
            )}>
            </Route>
        </>
    )
}
