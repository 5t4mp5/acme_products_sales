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
import DisabledOption from "./DisabledOption";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      displayProducts: [],
      showDisabled: true
    };
  }
  componentDidMount() {
    axios
      .get("/api/products")
      .then(products => {
        this.setState({ products: products.data });
        this.updateDisplayProducts(products.data);
      })
      .catch(e =>
        this.setState({ message: <Message type="danger" text={e.message} /> })
      );
  }
  updateDisplayProducts = () => {
    const products = this.state.products;
    if (this.state.showDisabled === true) {
      this.setState({ displayProducts: products });
    } else {
      this.setState({
        displayProducts: products.filter(
          product => product.availability !== "discontinued"
        )
      });
    }
  };
  remove = ({ id }) => {
    axios
      .delete(`/api/products/${id}`)
      .then(() => {
        this.setState({
          products: this.state.products.filter(product => product.id !== id)
        });
        this.updateDisplayProducts();
      })
      .catch(e =>
        this.setState({ message: <Message type="danger" text={e.message} /> })
      );
  };
  addProduct = product => {
    return axios.post("/api/products", product).then(newProduct => {
      this.setState({ products: [...this.state.products, newProduct.data] });
      this.updateDisplayProducts(this.state.products);
      return newProduct;
    });
  };
  resetMessage = () => {
    this.setState({ message: "" });
  };
  toggleShowDisabled = () => {
    const _showDisabled = this.state.showDisabled;
    this.setState({ showDisabled: !_showDisabled }, () => {
      this.updateDisplayProducts();
    });
  };
  render() {
    return (
      <div className="container">
        <h1>Acme Products/Sales</h1>
        <Router>
          <Route
            render={({ location }) => (
              <Navbar products={this.state.displayProducts} location={location} />
            )}
          />
          <Route
            path="(/Products|/Sales)"
            render={() => (
              <DisabledOption
                showDisabled={this.state.showDisabled}
                toggle={this.toggleShowDisabled}
              />
            )}
          />
          <Switch>
            <Route path="/Home" component={Home} />
            <Route
              path="/Products"
              render={() => (
                <Products
                  products={this.state.displayProducts}
                  remove={this.remove}
                  resetMessage={this.resetMessage}
                />
              )}
            />
            <Route
              path="/Sales"
              render={() => (
                <Products
                  products={this.state.displayProducts.filter(
                    product => product.onSale
                  )}
                  remove={this.remove}
                  resetMessage={this.resetMessage}
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
