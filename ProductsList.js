import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navigation from "./Navigation";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProdut, setSelectedProduct] = useState(null);

//handle for fetching addresses on page load
useEffect(() => {
	axios.get('http://localhost:3000/api/products').then((response) => {
    console.log(response.data)
	setProducts(response.data.products);
	});
}, []);

// //handle for deleting address
const handleDelete = (productId) => {
	axios
	.delete(`http://localhost:3000/api/products/${productId}`)
	.then(() => {
		axios.get('http://localhost:3000/api/products').then((response) => {
		setProducts(response.data.products);
		});
	})
	.catch((error) => {
		console.error('Error deleting address: ', error);
	});
};

//handle for setting address to be deleted 
const handleEdit = (product) => {
	setSelectedProduct(product);
};

// //handle for updating address
const handleUpdate = (updatedProduct) => {
	axios
	.put(`http://localhost:3000/api/products/${updatedProduct._id}`, updatedProduct)
	.then(() => {
		axios.get('http://localhost:3000/api/products').then((response) => {
		setProducts(response.data);
		setSelectedProduct(null);
		});
	})
	.catch((error) => {
		console.error('Error updating address: ', error);
	});
};
  return (
    <div className="container container-fluid min-vh-100 justify-content-center">
      <h2 className="display-2 text-center">Products List</h2>
      <Navigation />
      {selectedProdut && (
		<div>
		<h2>Edit Address</h2>
		<form onSubmit={() => handleUpdate(selectedProdut)}>
			<div className="form-group">
			<label>Name:</label>
			<input
				type="text"
				className="form-control"
				name="name"
				value={selectedProdut.name}
				onChange={(e) =>
				setSelectedProduct({
					...selectedProdut,
					name: e.target.value,
				})
				}
				required
			/>
			</div>
			<div className="form-group">
			<label>Quantity:</label>
			<input
				type="text"
				className="form-control"
				name="quantity"
				value={selectedProdut.quantity}
				onChange={(e) =>
				setSelectedProduct({
					...selectedProdut,
					quantity: e.target.value,
				})
				}
				required
			/>
			</div>
			<div className="form-group">
			<label>Price:</label>
			<input
				type="text"
				className="form-control"
				name="price"
				value={selectedProdut.price}
				onChange={(e) =>
				setSelectedProduct({
					...selectedProdut,
					price: e.target.value,
				})
				}
				required
			/>
			</div>
			<div>
			<button type="submit" className="btn btn-primary m-2">
				Update Product
			</button>
			</div>
		</form>
		</div>
	)}
      <ul>
		{products?.map((product) => (
		<div className='container border border-dark rounded m-2 p-2 text-right' key={product._id}>
			<h5>Id : {product._id}</h5>
			<h5>Name : {product.name}</h5>
			<h5>Quantity : {product.quantity}</h5>
			<h5>Price : {product.price}</h5>
			<button
			className="btn btn-sm"
			onClick={() => handleDelete(product._id)}
			>
			<h5>< Trash /></h5>
			</button>
			<button
			type="button" className="btn"
			onClick={() => handleEdit(product)}
			>
			<h5>< PencilSquare /></h5>
			</button>
		</div>
		))}
	</ul>

    </div>
  );
};

export default ProductsList;
