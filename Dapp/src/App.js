import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Home from "./component/home";
import WalletDetail from "./component/WalletDetail";
import ArtWork from "./component/ArtWork";
import Profile from "./component/Profile";
import WalletDetailOwner from './component/WalletDetailOwner';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/wallet-detail" component={WalletDetail} />
          <Route exact path="/wallet-detail-owner" component={WalletDetailOwner} />
          <Route exact path="/mint-artworks" component={ArtWork} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
