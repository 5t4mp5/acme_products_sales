import React, { Component } from "react";
import Message from "./Message";
import ProductForm from "./ProductForm";

class UpdateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      discountPercentage: "",
      availability: "",
      message: ""
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    const _product = this.props.products.find(product => product.id === id * 1);
    this.setState(_product);
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
    const updateProduct = this.props.updateProduct;
    updateProduct(this.state)
      .then(product =>
        this.setState({
          message: (
            <Message
              type="success"
              text={`${product.name} Updated!`}
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
        buttonName="Update"
      />
    );
  }
}

export default UpdateProduct;
