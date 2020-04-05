import React, { useState } from 'react';

let AddServiceForm = () => {

	let [name, setName] = useState("")
	let [location, setLocation] = useState("")
	let [price, setPrice] = useState("")
	let [file, setFile] = useState("");

	let [nameError, setNameError] = useState("");
	let [locationError, setLocationError] = useState("");
	let [priceError, setPriceError] = useState("");

	let [addBtnDisabled, setAddBtnDisabled] = useState(true);

	let nameChangeHandler = (e) => {
		setName(e.target.value)

		if(e.target.value.trim() === "") {
			setNameError("This field cannot be empty.");
		} else {
			setNameError("");
		}
	}

	let locationChangeHandler = (e) => {
		setLocation(e.target.value)

		if(e.target.value.trim() === "") {
			setLocationError("This field cannot be empty.");
		} else {
			setLocationError("");
		}
	}

	let priceChangeHandler = (e) => {
		setPrice(e.target.value)

		if(e.target.value.trim() === "") {
			setPriceError("This field cannot be empty.");
		} else {
			setPriceError("");
		}
	}

	checkAddForm();

	function checkAddForm() {
		if(name.trim()!=="" 
			&& location.trim()!=="" 
			&& price.trim()!=="" 
			&&(nameError==""&&locationError==""
				&&priceError=="")) {
			if(addBtnDisabled!==false){
				setAddBtnDisabled(false);
			}
		} else {
			if(addBtnDisabled!==true){
				setAddBtnDisabled(true);
			}
		}
	}

	let submitClickHandler = () => {
		alert("Hotel successfully added.")
		let newService = {
			name,
			location,
			price
		}

		fetch("http://localhost:8080/services/", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newService)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			let formData = new FormData();
			formData.append("file", file);

			fetch("http://localhost:8080/upload/"+data.id, {
				method: 'post',
				body: formData
			})			
		});
	}

	let imageChangeHandler = (e) => {
		setFile(e.target.files[0]);
	}

	return(
		<form id="addItemForm" className="col-md-5 col-xs-10 p-5 mt-2 text-center" encType="multipart/form-data">
			<div className="form-group">
				Hotel Name: <input onChange={nameChangeHandler} onBlur={nameChangeHandler} type="text" className="form-control text-center" placeholder="Enter Hotel Name" />
				<small className="text-danger text-center">{nameError}</small>
			</div>
			<div className="form-group">
				Location: <input onChange={locationChangeHandler} onBlur={locationChangeHandler} type="text" className="form-control text-center" placeholder="Enter Location"/>
				<small className="text-danger">{locationError}</small>
			</div>
			<div className="form-group">
				Price: <input onChange={priceChangeHandler} onBlur={priceChangeHandler} type="number" min="1" className="form-control text-center" placeholder="Enter Price"/>
				<small className="text-danger">{priceError}</small>
			</div>
			Image: <input onChange={imageChangeHandler} type="file"/>
			<div><button type="button" onClick={submitClickHandler} disabled={addBtnDisabled} className="btn btn-info my-3">Add Hotel</button></div>
		</form>
	);
}

export default AddServiceForm;