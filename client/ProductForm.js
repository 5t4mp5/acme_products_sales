import React from "react";

const ProductForm = ({
  name,
  price,
  discountPercentage,
  availability,
  message,
  handleNumField,
  handleChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Name">Name</label>
        <input
          className="form-control"
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Price">Price</label>
        <input
          className="form-control"
          name="price"
          type="text"
          value={price}
          onChange={handleNumField}
        />
      </div>
      <div>
        <label htmlFor="Discount Percentage">Discount Percentage</label>
        <input
          className="form-control"
          name="discountPercentage"
          type="text"
          value={discountPercentage}
          onChange={handleNumField}
        />
      </div>
      <div>
        <label htmlFor="Availability">Availability</label>
        <select
          className="form-control"
          name="availability"
          value={availability}
          onChange={handleChange}
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
};

export default ProductForm;
