import React, { Component } from "react";
import Message from "./Message";
import ProductForm from "./ProductForm";

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      discountPercentage: "",
      availability: "instock",
      message: ""
    };
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
    evt.preventDefault();
    const addProduct = this.props.addProduct;
    addProduct(this.state)
      .then(product =>
        this.setState({
          name: "",
          price: "",
          discountPercentage: "",
          availability: "instock",
          message: (
            <Message
              type="success"
              text={`${product.data.name} Created!`}
              resetMessage={this.resetMessage}
            />
          )
        })
      )
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
      />
    );
  }
}

export default CreateProduct;
