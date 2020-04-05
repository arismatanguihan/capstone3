import React, { useState, useEffect } from 'react';
import Hotel from './Hotel';

function Services(props) {

	let [services, setServices] = useState([]);

	useEffect( () => {
		fetchServices()
	}, []);

	let fetchServices = () => {
			fetch("http://localhost:8080/services")
		.then(res => res.json())
		.then(data => {
			setServices(data);
		});

	}

	let displayServices = () => {
		return services.map( item => 
			<Hotel
				key={item.id}
				serviceId={item.id}
				name={item.name}
				location={item.location}
				price={item.price}
				image={item.image}
				fetchServices={fetchServices}
				isLoggedIn={props.isLoggedIn}
			/>
		)
	}

	return(
		// <div>
			displayServices()
		// </div>
	);

}

export default Services;