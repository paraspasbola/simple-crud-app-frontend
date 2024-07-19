//AddAddress.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const AddProducts = () => {
const nav = useNavigate();
//state for saving form data
const [formData, setFormData] = useState({
	name: '',
	quantity: '',
	price: '',
});

//handle for updating form
const handleChange = (e) => {
	setFormData({ ...formData, [e.target.name]: e.target.value });
};

//handle for creating new address
const handleSubmit = (e) => {
	e.preventDefault();
	axios.post('http://localhost:3000/api/products', formData).then(() => {
	nav('/');
	});
};

return (
	<div className='container container-fluid min-vh-100 justify-content-center'>
	<h2 className='display-2 text-center'>Add Product</h2>
	< Navigation />
		<form onSubmit={handleSubmit}>
		<div className='form-group'>
			<label>Name:</label>
			<input type="text" name="name" onChange={handleChange} required className='form-control'/>
		</div>
		<div className='form-group'>
			<label>quantity:</label>
			<input type="text" name="quantity" onChange={handleChange} required className='form-control'/>
		</div>
		<div className='form-group'>
			<label>Price:</label>
			<input type="text" name="price" onChange={handleChange} required className='form-control'/>
		</div>
		<div>
			<button type="submit" className='btn btn-primary p-2 m-2'>Add product</button>
		</div>
		</form>
	</div>
);
};

export default AddProducts;
