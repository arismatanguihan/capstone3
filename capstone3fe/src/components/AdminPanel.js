import React from 'react';
import BookingRequests from './BookingRequests';
import AddBookingForm from './AddBookingForm';

function AdminPanel() {
	if(localStorage.getItem("username")==="admin") {
		return(
			<div>
				<BookingRequests/>
				<AddBookingForm/>				
			</div>
		);
	} else {
		return(
			<div>
				<BookingRequests/>
			</div>
		)
	}

}

export default AdminPanel;