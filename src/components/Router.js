import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import Post from 'routes/Post';
import PostDetail from 'routes/PostDetail';
import FAQ from 'routes/FAQ';
import Support from 'routes/Support';
import NotFound from 'routes/NotFound';
import Auth from 'routes/Auth';
import Upload from 'components/Upload';
import Manage from 'routes/Manage';
import Admin from 'routes/Admin';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/post/:id" component={PostDetail} />
                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/support" component={Support} />
                { isLoggedIn && userObj.uid === "6cOwE1n7A5eoFelnpcR0yRMgK592" ? (
                    <>
                    <Route exact path="/login">
                        <Admin userObj = {userObj} />
                    </Route>    
                    <Route exact path="/manage">
                        <Manage userObj = {userObj} />        
                    </Route>  
                    <Route exact path="/upload">
                        <Upload userObj = {userObj} />
                    </Route>   
                    </>        
                ) : (  
                    <Route exact path="/login" component={Auth} />
                )}
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
        </>
    );
};

export default AppRouter;