import React from 'react';
import posed, {PoseGroup} from 'react-pose';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/Home';
import PostPage from '../pages/Post';

let RouteWrapper = posed.div({
    enter: {opacity: 1, delay: 350, beforeChildren: true},
    exit: {opacity: 0 }
});

const Routes = () => (
    <Route render={({location}) => (
        <PoseGroup>
            <RouteWrapper key={location.pathname}>
                <Switch location={location}>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/:id" component={PostPage}/>
                </Switch>
            </RouteWrapper>
        </PoseGroup>
    )}/>
);

export default Routes;