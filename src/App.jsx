import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import ErrorPage from './components/ErrorPage/ErrorPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://interview.agileengine.com';

import './global.module.scss';
import styles from './App.module.scss';

const App = () => {
  return (
    <>
      <div className={styles.app}>
        <Router>
          <Switch>
            <Route exact path='/' component={MainContent} />
            <Route path='/error' component={ErrorPage} />
            <Route component={() => <ErrorPage notFound />} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
