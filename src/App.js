import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home'

function App() {
  return (
    <BrowserRouter >
      <div >
        <Switch>
          <Route exact path="/" component={ Home } />
          {/* <Route component={NotFound} />  */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
