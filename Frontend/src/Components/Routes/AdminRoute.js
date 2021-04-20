import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export default function AdminRoute({ component: Component, ...rest }) {
    const userLogin = useSelector(state => state.userLogin);
    const { userData } = userLogin;

    return (
        <>
            <Route {...rest} render={(props) => userData && userData.isAdmin ? (
                <Component {...props}></Component> ) : (
                    <Redirect to='/login' />
            )}>
            </Route>
        </>
    )
}
