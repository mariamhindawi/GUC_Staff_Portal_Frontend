import React from "react";
import LoginForm from "./components/login_form.component";
import Header from "./components/HeaderComponent"
import Home from "./components/HomeComponent"
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/" component={()=>(<><Header /><Home/></>)}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
