import React, { Component } from "react";
import axios from "axios";

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
      .then(products => this.setState({ products }))
      .then(() => console.log(this.state.products))
      .catch(e => this.setState({ errorMessage: e.message }));
  }
  render(){
    return(
        <h1>Acme Products/Sales</h1>
    );
  }
}

export default Main;
