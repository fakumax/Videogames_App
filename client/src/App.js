import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';
import './App.scss';

export function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={Home} />
        <Route path='/create' component={Form} />
        <Route path='/game/:id' component={Detail} />
      </Switch>
    </>
  );
}

export default App;
