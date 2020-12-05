import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import Post from 'routes/Post';
import PostDetail from 'routes/PostDetail';
import FAQ from 'routes/FAQ';
import Support from 'routes/Support';
import NotFound from 'routes/NotFound';

const AppRouter = () => {
    return (
        <>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/post/:id" component={PostDetail} />
                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/support" component={Support} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
        </>
    );
};

export default AppRouter;