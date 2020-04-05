import React, { useState } from 'react';

function BookingRequest(props) {

	let deleteClickHandler = () => {

		fetch("http://localhost:8080/bookingRequest/"+ props.bookingRequestId, {
			method: 'delete'
		})
		.then(res => res)
		.then(data => {
			props.fetchBookingRequests();
		});
	}

	let confirmClickHandler = () => {

		let confirmStatus = {
			"id":props.bookingRequestId,
			"startDate":props.startDate,
			"endDate":props.endDate,
			"child":props.child,
			"adult":props.adult,
			"room":props.room,
			"status":"Confirmed",
			"user": props.user,
			"service":props.service
		}

		fetch("http://localhost:8080/bookingRequest", {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(confirmStatus)
		})
		.then(res => res)
		.then(data => {
			props.fetchBookingRequests();
		});
	}

	if(localStorage.getItem("username")==="admin") {
		return(
			<tr>
				<td>{props.bookingRequestId}</td>
				<td>{props.serviceName}</td>
				<td>{props.username}</td>
				<td>{props.startDate}</td>
				<td>{props.endDate}</td>
				<td>{props.child}</td>
				<td>{props.adult}</td>
				<td>{props.room}</td>
				<td>{props.status}</td>
				<td><button className="btn btn-primary" onClick={confirmClickHandler}>Confirm</button>
				<button className="btn btn-danger" onClick={deleteClickHandler}>Remove</button></td>
			</tr>
		);
	} else {
		return(
			<div id="statusCard" className="card col-lg-5 mx-auto mb-3">
				<div className="card-header my-3">
				<h3 className="py-2">{props.serviceName}</h3>
				</div>
				<div className="card-body p-3 ">
					<h5 className="card-title">Request ID No.: {props.bookingRequestId}</h5>
					<p className="card-text">Username: {props.username}</p>
					<p className="card-text">Check-In Date: {props.startDate}</p>
					<p className="card-text">Check-Out Date: {props.endDate}</p>
					<p className="card-text">No. of Children: {props.child}</p>
					<p className="card-text">No. of Adults: {props.adult}</p>
					<p className="card-text">No. of Rooms: {props.room}</p>
					<h5 className="card-text p-2 w-50 mx-auto">Status: {props.status}</h5>
					<button className="btn btn-danger" onClick={deleteClickHandler}>Remove</button>
				</div>
			</div>
		)
	}

}

export default BookingRequest;