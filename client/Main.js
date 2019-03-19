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
import CreateProduct from "./CreateProduct";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      message: ""
    };
  }
  componentDidMount() {
    axios
      .get("/api/products")
      .then(products => this.setState({ products: products.data }))
      .catch(e =>
        this.setState({
          message: (
            <div className="alert alert-danger" role="alert">
              {e.message}
            </div>
          )
        })
      );
  }
  remove = ({ id, name }) => {
    axios
      .delete(`/api/products/${id}`)
      .then(() =>
        this.setState({
          products: this.state.products.filter(product => product.id !== id),
          message: <div className="alert alert-success">{name} Deleted</div>
        })
      )
      .catch(e => this.setState({ errorMessage: e.message }));
  };
  addProduct = product => {
    return axios.post("/api/products", product).then(newProduct => {
      this.setState({ products: [...this.state.products, newProduct.data] });
      return newProduct;
    });
  };
  render() {
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
              render={() => (
                <Products products={this.state.products} remove={this.remove} />
              )}
            />
            <Route
              path="/Sales"
              render={() => (
                <Products
                  products={this.state.products.filter(
                    product => product.onSale
                  )}
                  remove={this.remove}
                />
              )}
            />
            <Route
              path="/Create"
              render={() => <CreateProduct addProduct={this.addProduct} />}
            />
            <Redirect to="/Home" />
          </Switch>
        </Router>
        {this.state.message}
      </div>
    );
  }
}

export default Main;
