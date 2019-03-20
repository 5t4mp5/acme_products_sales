import React, { Component } from "react";
import Message from "./Message";
import ProductForm from "./ProductForm";
import axios from "axios";

class UpdateProduct extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      price: "",
      discountPercentage: "",
      availability: "instock",
      message: ""
    };
  }
  componentDidMount() {
    axios
      .get(`/api/products/${this.props.match.params.id}`)
      .then(product => this.setState(product.data))
      .catch(e =>
        this.setState({
          message: (
            <Message
              type="danger"
              text={e.message}
              resetMessage={this.resetMessage}
            />
          )
        })
      );
  }
  handleNumField = evt => {
    const isNum = /^[0-9.\b]+$/;
    if (isNum.test(evt.target.value) || evt.target.value === "") {
      this.handleChange(evt);
    }
  };
  handleChange = evt => {
    if (this.state.message) this.setState({ message: "" });
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    const updateProduct = this.props.updateProduct;
    evt.preventDefault();
    updateProduct(this.state)
      .then(() => {
        const name = this.state.name;
        this.setState({
          message: (
            <Message
              type="success"
              text={`${name} Updated!`}
              resetMessage={this.resetMessage}
            />
          )
        })
      })
      .catch(e =>
        this.setState({
          message: (
            <Message
              type="danger"
              text={e.message}
              resetMessage={this.resetMessage}
            />
          )
        })
      );
  };
  resetMessage = () => {
    this.setState({ message: "" });
  };
  render() {
    const {
      name,
      price,
      discountPercentage,
      availability,
      message
    } = this.state;
    return (
      <ProductForm
        name={name}
        price={price}
        discountPercentage={discountPercentage}
        availability={availability}
        message={message}
        handleChange={this.handleChange}
        handleNumField={this.handleNumField}
        handleSubmit={this.handleSubmit}
        buttonName="Update"
      />
    );
  }
}

export default UpdateProduct;
