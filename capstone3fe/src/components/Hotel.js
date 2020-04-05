import React, { useState } from 'react';
import HotelBookingPage from './HotelBookingPage';

function Service(props) {

	let [name, setName] = useState(props.name)
	let [location, setLocation] = useState(props.location)
	let [price, setPrice] = useState(props.price)

	let [displayPage, setDisplayPage] = useState(true);

	let backToService = () => {
		setDisplayPage(true);
	}

	let showBookingPage = () => {
		setDisplayPage(false);
	}

	let nameChangeHandler = (e) => {
		console.log(e)
		setName(e.target.value)
	}

	let locationChangeHandler = (e) => {
		setLocation(e.target.value)
	}

	let priceChangeHandler = (e) => {
		setPrice(e.target.value)
	}

	let editDescription = (e) => {
		alert()
	}


	let editClickHandler = () => {

		let editedService = {
	        "id": props.serviceId,
	        name,
	        location,
	        price,
	        "image":props.image
		}

		fetch("http://localhost:8080/services", {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedService)
		})
		.then(res => res)
		.then(data => {
			props.fetchServices();
		});
		alert("Changes saved successfully.");
	}

	function displayService() {
		
			if(localStorage.getItem("username")==="admin"){
				return(
							
					<div className="card col-lg-3 col-md-3 d-inline-block my-3 mx-1 m-0 p-0">
						<div id="serviceCard" className="card-body m-0 p-0">
							<div className="card-img-top" 
							style={{  
							  backgroundImage: "url(" + "http://localhost:8080/image/" + props.image + ")",
							  backgroundPosition: 'center',
							  backgroundSize: 'cover',
							  backgroundRepeat: 'no-repeat'
							}}
							>
								<p className="card-text">
									Edit Hotel Name: <input value={name}  onChange={nameChangeHandler} onBlur={nameChangeHandler} type="text" className="form-control w-25 p-3 mx-auto text-center" />
									Edit Location: <input value={location} onChange={locationChangeHandler} onBlur={locationChangeHandler} type="text" className="form-control w-25 p-3 mx-auto text-center" />
									Edit Price: <input value={price} onChange={priceChangeHandler} onBlur={priceChangeHandler} type="number" className="form-control w-25 p-3 mx-auto text-center" />
								</p>
								<button type="button" className="btn btn-block btn-success" onClick={editClickHandler}>Save Changes</button>
							</div>
						</div>
					</div>
			
		
					
				);				
			} else if(displayPage===true){
				return(
					<div className="card col-lg-3 col-md-3 d-inline-block my-3 mx-1 m-0 p-0">
						<div id="serviceCard" className="card-body m-0 p-0">
							<div className="card-img-top" 
							style={{  
							  backgroundImage: "url(" + "http://localhost:8080/image/" + props.image + ")",
							  backgroundPosition: 'center',
							  backgroundSize: 'cover',
							  backgroundRepeat: 'no-repeat'
							}}
							>
								<h2 className="mb-4">{props.name}</h2>
								<p>
									Location: {props.location} <br/>
									Price: Php {props.price} /hour<br/>
								</p>
								<button type="button" className="btn btn-block btn-info" onClick={showBookingPage}>Book Hotel</button>
							</div>
						</div>
					</div>
				);				
			} else {
				return(<HotelBookingPage
					backToService={backToService}
					key={props.serviceId}
					serviceId={props.serviceId}
					name={props.name}
					location={props.location}
					price={props.price}
					image={props.image}
					fetchServices={props.fetchServices}
					isLoggedIn={props.isLoggedIn}
				/>)
			}
	}

	return(
		displayService()
	);

}

export default Service;