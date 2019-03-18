import React, { Component } from "react";

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      discountPercentage: "",
      availability: "instock",
      message: "",
    };
  }
  handleNumField = evt => {
    const isNum = /^[0-9.\b]+$/;
    if (isNum.test(evt.target.value) || evt.target.value === "") {
      this.handleChange(evt);
    }
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const addProduct = this.props.addProduct;
    addProduct(this.state)
      .then(() =>
        this.setState({
          name: "",
          price: "",
          discountPercentage: "",
          availability: "instock",
          message: <div className="alert alert-success" role="alert">Product Created!</div>
        })
      )
      .catch(ex => console.error(ex.message));
  };
  render() {
    const { name, price, discountPercentage, availability, message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            className="form-control"
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="Price">Price</label>
          <input
            className="form-control"
            name="price"
            type="text"
            value={price}
            onChange={this.handleNumField}
          />
        </div>
        <div>
          <label htmlFor="Discount Percentage">Discount Percentage</label>
          <input
            className="form-control"
            name="discountPercentage"
            type="text"
            value={discountPercentage}
            onChange={this.handleNumField}
          />
        </div>
        <div>
          <label htmlFor="Availability">Availability</label>
          <select
            className="form-control"
            name="availability"
            value={availability}
            onChange={this.handleChange}
          >
            <option value="instock">instock</option>
            <option value="backordered">backordered</option>
            <option value="discontinued">discontinued</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!name || !price}>
          Create
        </button>
        {message}
      </form>
    );
  }
}

export default CreateProduct;
