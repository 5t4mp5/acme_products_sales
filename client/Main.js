import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

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
      .then(() => console.log(this.state.products))
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
          </Router>
        </div>
      );
    } else return null;
  }
}

export default Main;
