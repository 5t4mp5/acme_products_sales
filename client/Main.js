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
import Message from "./Message";

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
      .catch(e =>
        this.setState({ message: <Message type="danger" text={e.message} /> })
      );
  }
  remove = ({ id }) => {
    axios
      .delete(`/api/products/${id}`)
      .then(() =>
        this.setState({
          products: this.state.products.filter(product => product.id !== id)
        })
      )
      .catch(e =>
        this.setState({ message: <Message type="danger" text={e.message} /> })
      );
  };
  addProduct = product => {
    return axios.post("/api/products", product).then(newProduct => {
      this.setState({ products: [...this.state.products, newProduct.data] });
      return newProduct;
    });
  };
  resetMessage = () => {
    this.setState({ message: "" });
  }
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
                <Products products={this.state.products} remove={this.remove} resetMessage={this.resetMessage} />
              )}
            />
            <Route
              path="/Sales"
              render={() => (
                <Products
                  products={this.state.products.filter(
                    product => product.onSale
                  )}
                  remove={this.remove} resetMessage={this.resetMessage}
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
