import React from 'react';
import posed, {PoseGroup} from 'react-pose';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/Home';
import PostPage from '../pages/Post';
import UserPage from '../pages/User';

let RouteWrapper = posed.div({
    enter: {opacity: 1, y: 0, delay: 350, beforeChildren: true},
    exit: {opacity: 0, y: 40 }
});

const Routes = () => (
    <Route render={({location}) => (
        <PoseGroup>
            <RouteWrapper key={location.pathname}>
                <Switch location={location}>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/posts/:id" component={PostPage}/>
                    <Route path="/users/:id" component={UserPage}/>
                </Switch>
            </RouteWrapper>
        </PoseGroup>
    )}/>
);

export default Routes;