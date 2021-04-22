import { Redirect, Route } from 'react-router';

import React from 'react';
import { useSelector } from 'react-redux';

export default function GiverRoute({ component: Component, ...rest }) {
    const userLogin = useSelector(state => state.userLogin);
    const { userData } = userLogin;

    return (
        <>
            <Route {...rest} render={(props) => userData && userData.isGiver ? (
                <Component {...props}></Component> ) : (
                    <Redirect to='/login' />
            )}>
            </Route>
        </>
    )
}
