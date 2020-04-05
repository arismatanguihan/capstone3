import React, { useState, useEffect } from 'react';
import BookingRequest from './BookingRequest';

function BookingRequests(props) {

	let [bookingRequests, setBookingRequests] = useState([]);

	useEffect( () => {
		fetchBookingRequests()
	}, []);

	let fetchBookingRequests = () => {
			fetch("http://localhost:8080/bookingRequest")
		.then(res => res.json())
		.then(data => {
			let updatedData = data;
			if((localStorage.getItem("username"))!=="admin") {
				updatedData = data.filter( i => {
					return i.user.username === localStorage.getItem("username")
				})
			}
			setBookingRequests(updatedData);	
		});

	}

	let displayBookingRequest = () => {
		return bookingRequests.map( item => 
			<BookingRequest 
				key={item.id}
				bookingRequestId={item.id}
				serviceName={item.service.name}
				price={item.service.price}
				username={item.user.username}
				user={item.user}
				service={item.service}
				startDate={item.startDate}
				endDate={item.endDate}
				child={item.child}
				adult={item.adult}
				room={item.room}
				status={item.status}
				bookingRequests={bookingRequests}
				fetchBookingRequests={fetchBookingRequests}
			/>
		)
	}

	if(localStorage.getItem("username")==="admin") {
		return(
			<div id="bookingBG">
				<table className="table table-responsive table-dark table-striped table-responsive">
					<thead className="text-center">
					<tr>
					<th></th>
					<th></th>
					<th></th>
					<th></th>
					
					<th>Booking Requests</th>
					</tr>
					</thead>
					<thead>
						<tr>
							<th>Booking ID</th>
							<th>Hotel Name</th>
							<th>Customer Name</th>
							<th>Check-In Date</th>
							<th>Check-Out Date</th>
							<th>No. of Children</th>
							<th>No. of Adults</th>
							<th>No. of Rooms</th>
							<th>Status</th>
							<th>Action</th>
						
						</tr>
					</thead>
					<tbody>
						{displayBookingRequest()}
					</tbody>
				</table>
			</div>
		)
	} else {
		return(
			<div id="bookingBG">
				<h3 className="my-3">Booking Requests</h3>
				{displayBookingRequest()}
			</div>
		)
	}
	
}

export default BookingRequests;

