import React from 'react';
import posed, {PoseGroup} from 'react-pose';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/Home';

let RouteWrapper = posed.div({
    enter: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 20}
});

const Routes = () => (
    <Route render={({location}) => (
        <PoseGroup>
            <RouteWrapper key={location.pathname}>
                <Switch location={location}>
                    <Route exact path="/" component={HomePage}/>
                </Switch>
            </RouteWrapper>
        </PoseGroup>
    )}/>
);

export default Routes;