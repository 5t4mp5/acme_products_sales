import React, { Component } from "react";
import axios from "axios";

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      discountPercentage: "",
      availability: "instock"
    };
  }
  handleNumField = evt => {
    const isNum = /^[0-9.\b]+$/;
    if(isNum.test(evt.target.value) || evt.target.value === ""){
        this.handleChange(evt);
    }
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const updateProducts = this.props.updateProducts;
    axios
      .post("/api/products", this.state)
      .then(() => updateProducts())
      .catch(ex => console.error(ex.message));
  };
  render() {
    const { name, price, discountPercentage, availability } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="Price">Price</label>
        <input
          name="price"
          type="text"
          value={price}
          onChange={this.handleNumField}
        />
        <br />
        <label htmlFor="Discount Percentage">Discount Percentage</label>
        <input
          name="discountPercentage"
          type="text"
          value={discountPercentage}
          onChange={this.handleNumField}
        />
        <br />
        <label htmlFor="Availability">Availability</label>
        <select
          name="availability"
          value={availability}
          onChange={this.handleChange}
        >
          <option value="instock">instock</option>
          <option value="backordered">backordered</option>
          <option value="discontinued">discontinued</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    );
  }
}

export default CreateProduct;
