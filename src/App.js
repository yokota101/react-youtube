import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Top from './pages/Top';
import Layout from './components/Layout/Layout';
import Search from './pages/Search';
import Watch from './pages/Watch';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/watch" component={Watch} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
