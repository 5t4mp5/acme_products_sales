import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Home from "./Home";
import Products from "./Products";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/products")
      .then(products => this.setState({ products: products.data }))
      .catch(e => this.setState({ errorMessage: e.message }));
  }
  render() {
    if (this.state.products.length !== 0) {
      return (
        <div className="container">
          <h1>Acme Products/Sales</h1>
          <Router>
            <Route
              render={({ location }) => (
                <Navbar products={this.state.products} location={location} />
              )}
            />
            <Switch>
              <Route path="/Home" component={Home} />
              <Route
                path="/Products"
                render={() => <Products products={this.state.products} />}
              />
              <Redirect to="/Home" />
            </Switch>
          </Router>
        </div>
      );
    } else return null;
  }
}

export default Main;
