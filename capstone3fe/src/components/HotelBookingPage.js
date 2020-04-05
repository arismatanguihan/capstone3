import React, {useState, useEffect} from 'react';
import Review from './Review';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

function ServiceBookingPage(props) {
  	let [review, setReview] = useState("");

  	let [newDate, setNewDate] = useState("");
  	let [child, setChild] = useState("");
  	let [adult, setAdult] = useState("");
  	let [room, setRoom] = useState("");
  	let [status, setStatus] = useState("Pending");

  	let [childError, setChildError] = useState("");
  	let [adultError, setAdultError] = useState("");
  	let [roomError, setRoomError] = useState("");
  	let [reviewError, setReviewError] = useState("");

  	let [disableBookingBtn, setDisableBookingBtn] = useState(true)
  	let [disableReviewBtn, setDisableReviewBtn] = useState(true)

  	let [displayReviews, setDisplayReviews] = useState([""]);
  	const [startDate, setStartDate] = useState(new Date());
  	const [endDate, setEndDate] = useState(new Date());


	useEffect( () => {
		fetchServiceReviews()
	}, []);

	let fetchServiceReviews = () => {
			fetch("http://localhost:8080/services/"+props.serviceId+"/reviews")
		.then(res => res.json())
		.then(data => {
			setDisplayReviews(data);
		});
	}

	let childChangeHandler = (e) => {
		setChild(e.target.value)

		if(e.target.value.trim() === "") {
			setChildError("This field cannot be empty.");
		} else {
			setChildError("");
		}
	}

	let adultChangeHandler = (e) => {
		setAdult(e.target.value)

		if(e.target.value.trim() === "") {
			setAdultError("This field cannot be empty.");
		} else {
			setAdultError("");
		}
	}

	let roomChangeHandler = (e) => {
		setRoom(e.target.value)

		if(e.target.value.trim() === "") {
			setRoomError("This field cannot be empty.");
		} else {
			setRoomError("");
		}
	}

	let reviewChangeHandler = (e) => {
		setReview(e.target.value)

		if(e.target.value.trim() === "") {
			setReviewError("This field cannot be empty.");
		} else {
			setReviewError("");
		}
	}


	let checkBookingForm = () => {
		if(startDate!==""
			&& endDate!==""
			&& child.trim()!=="" 
			&& adult.trim()!=="" 
			&& room.trim()!=="" 
			&& (childError==="" 
			&& adultError===""
			&& roomError===""
			&&props.isLoggedIn===true)) {
			if(disableBookingBtn!==false){
				setDisableBookingBtn(false);
			}
		} else {
			if(disableBookingBtn!==true){
				setDisableBookingBtn(true);
			}
		}
	}

	checkBookingForm();

	let checkReviewForm = () => {
		if(review.trim()!=="" 
			&&props.isLoggedIn===true) {
			if(disableReviewBtn!==false){
				setDisableReviewBtn(false);
			}
		} else {
			if(disableReviewBtn!==true){
				setDisableReviewBtn(true);
			}
		}
	}

	checkReviewForm();

	let submitServiceReview = () => {
		let newReview = {
			review,
			"user":{
				"id": localStorage.getItem("userId"),
				"username": localStorage.getItem("username")
			}
		}

		fetch("http://localhost:8080/services/" + props.serviceId + "/reviews", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newReview)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			alert("Review Successfully Submitted.")
		});
	}

	let displayServiceReviews = () => {
		if(displayReviews!="") {
			return displayReviews.map( item => 
				<div id="review" className="card mt-3">
				  <div className="card-body">
				    <p className="card-text">{item.review}</p>
				    <small>by: </small>
				    <small>{item.user.username}</small>
				  </div>
				</div>
			)
		}
	}

	let displayReviewForm = () => {
		if(props.isLoggedIn===true) {
			return(
				<form className="text-center">
					<div className="form-group">
						<textarea
							onBlur={reviewChangeHandler}
							onChange={reviewChangeHandler}
							rows="4" cols="50"
							form="usrform"
							className="form-control"
							type="text"
							placeholder="Write your review here"
							autoComplete="false"
						>
						</textarea>
					</div>
					<div>
						<button
						onClick={submitServiceReview}
						disabled={disableReviewBtn}
						className="btn btn-info btn-rounded waves-effect z-depth-0"
						>
						Submit
						</button>	
					</div>
					
				</form>
			)
		} else {
			return(
				<div></div>
			)
		}
	}

	let displayServiceCard = () => {
		return(
			<div className="card">
				<div>
					<img id="itemImage"className="img-responsive" style={{"width":"90%"}} src={"http://localhost:8080/image/"+props.image} alt="item"/>
				</div>
				<div className="card-body">
					<h4 className="card-title">{props.name}</h4>
					<p>{props.location}</p>
					<div className="card-body">
						<h5>HOTEL REVIEWS</h5>
						<div className="card-columns">
							{displayServiceReviews()}
						</div>
						<div className="card-row">
							{displayReviewForm()}
						</div>
					</div>
				</div>
			</div>
		)
	}

	let displayBookingForm = () => {
		return(
			<form id="bookingForm" className="card text-center p-2">
						<h5>Booking Form</h5>
						<div className="form-group mx-auto text-center">
							<p>Check-In Date:</p>
							   <DatePicker
							   	className="text-center"
						        selected={startDate}
						        onChange={startingDate => setStartDate(startingDate)}
						        selectsStart
						        startDate={startDate}
						        endDate={endDate}
						      	/>
						    <p>Check-Out Date:</p>	
						      <DatePicker
						      	className="text-center"
						        selected={endDate}
						        onChange={endingDate => setEndDate(endingDate)}
						        selectsEnd
						        endDate={endDate}
						        minDate={startDate}
						      />
					    </div>
						<div className="form-group text-center">
							<p>Number of Children:</p>
							<input type="number" min="0" className="form-control w-75 mx-auto text-center" onBlur={childChangeHandler} onChange={childChangeHandler}/>
							<small className="text-danger text-center">{childError}</small>
						</div>
						<div className="form-group text-center">
							<p>Number of Adults:</p>
							<input type="number" min="1" className="form-control w-75 mx-auto text-center" onBlur={adultChangeHandler} onChange={adultChangeHandler}/>
							<small className="text-danger text-center">{adultError}</small>
						</div>
						<div className="form-group text-center">
							<p>Number of Room:</p>
							<input type="number"  min="1" className="form-control w-75 mx-auto text-center" onBlur={roomChangeHandler} onChange={roomChangeHandler}/>
							<small className="text-danger text-center">{roomError}</small>
						</div>
						

						<button
						disabled={disableBookingBtn} 
						type="button" 
						className="btn btn-info w-25 mx-auto" 
						data-toggle="modal" 
						data-target="#exampleModalCenter"
						>
							Book
						</button>
						<small>Make sure all the fields are filled up.</small>
					</form>
		)
	}

	let displayConfirmationModal = () => {
		console.log(startDate.toString().slice(4,16))
		return (
			<div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">Booking Details</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body text-left">
							<p>
							Hotel Name: {props.name}<br/>
							Hotel Location: {props.location}<br/>
							Hotel Price: {props.price}<br/>
							Check-In Date: {startDate.toString().slice(4,16)}<br/>
							Check-Out Date: {endDate.toString().slice(4,16)}<br/>
							No. of Children: {child}<br/>
							No. of Adults: {adult}<br/>
							No. of Rooms: {room}
							</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button 
							type="button" 
							className="btn btn-info" 
							onClick={bookRequestClickHandler} 
							data-toggle="modal" 
							data-target="#exampleModalCenter"
							>
							Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

  	let bookRequestClickHandler = () => {
		let newBookRequest = {
			"startDate":startDate.toString().slice(4,16),
			"endDate":endDate.toString().slice(4,16),
			child,
			adult,
			room,
			status,
			"service":{
				"id":props.serviceId,
				"name":props.name,
				"location":props.location,
				"price":props.price,
				"image":props.image
			}
		}

			fetch("http://localhost:8080/users/" + localStorage.getItem("userId") + "/bookingRequest", {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBookRequest)
			})
			.then(res => res.json())
			.then(data => {
				setNewDate("")
				setChild("")
				setAdult("")			
				setRoom("")			
			});
	}

	return(
		<div id="servicePage" className="p-2">
			<div className="text-right">
				<button className="btn btn-info m-2" onClick={props.backToService}>
					<i className="fas fa-times"></i>
				</button>
			</div>
			<div className="row">
				<div className="mx-auto col-lg-7">
					{displayServiceCard()}
				</div>
				<div className="mx-auto col-lg-5">
					{displayBookingForm()}
				</div>
				{displayConfirmationModal()}
			</div>
		</div>
	)
	
}

export default ServiceBookingPage;