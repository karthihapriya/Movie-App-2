import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./screens/home/Home";
import Details from "./screens/details/Details";
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './common/notfound/NotFound';
import 'typeface-roboto';
import BookShow from './screens/bookshow/BookShow';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} /> {/* Home page */}
        <Route path="/detail" component={Details} />  {/* Detail page */}
        <Route path="/bookshow" component={BookShow} /> {/* Book Show page */}
        <Route component={NotFound} />  {/* Error page */}
      </Switch>
    </BrowserRouter>
,
  document.getElementById('root')
);