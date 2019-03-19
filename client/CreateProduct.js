import React, { Component } from "react";
import Message from "./Message";

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
          message: (<Message type="success" text={`${product.data.name} Created!`} resetMessage={this.resetMessage} />)
        })
      )
      .catch(e => this.setState({ message: (<Message type="danger" text={e.message} resetMessage={this.resetMessage} />) }));
  };
  resetMessage = () => {
    this.setState({ message: "" });
  }
  render() {
    const {
      name,
      price,
      discountPercentage,
      availability,
      message
    } = this.state;
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
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
          disabled={!name || !price}
        >
          Create
        </button>
        {message}
      </form>
    );
  }
}

export default CreateProduct;
