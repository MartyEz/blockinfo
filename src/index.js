import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import AppTx from "./AppTx";
import AppSearch from './AppSearch'

const Root = () => (
    <Router>
      <Switch>
          <Route exact path ="/card/:id" component={AppSearch} />
          <Route exact path ="/block/:id" component={AppTx} />
          <Route path ="/" component={App} />
      </Switch>
    </Router>

);

ReactDOM.render(<Root/>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
