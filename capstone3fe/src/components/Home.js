import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Review from './Review';
import image from '../images/hotel_logo.png'
import image2 from '../images/hotel_bg8.jpg'
import image3 from '../images/hotel_bg7.jpg'
import image4 from '../images/hotel_bg3.jpg'


function Home(props) {

	let [formVisible, setFormVisible] = useState(false);
	let [review, setReview] = useState("");
	let [reviews, setReviews] = useState([""]);
	let [reviewError, setReviewError] = useState("");

	let [reviewBtnDisabled, setReviewBtnDisabled] = useState(true);

	let clickFormHandler = () => {
		if(formVisible!==false){
			setFormVisible(false);
		} else {
			setFormVisible(true)
		}
	}



	let showForm = () => {

		if(formVisible===false) {
			return(
				<div id="loginForm">
					<LoginForm
						clickFormHandler={clickFormHandler}
						setIsLoggedIn={props.setIsLoggedIn}
					/>
				</div>
			)			
		} else {
			return(
				<div id="registerForm" >
					<RegisterForm
						clickFormHandler={clickFormHandler}
					/>					
				</div>
			)
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

	checkReviewForm();

	function checkReviewForm() {
		if(review.trim()!== "" && localStorage.getItem("userId")!== null) {
			if(reviewBtnDisabled!==false){
				setReviewBtnDisabled(false);
			}
		} else {
			if(reviewBtnDisabled!==true){
				setReviewBtnDisabled(true);
			}
		}
	}

	let submitReviewClickHandler = () => {

		let newReview = {
			review: review
		}
		fetch("http://localhost:8080/users/"+(localStorage.getItem("userId"))+"/reviews", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newReview)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		});

		alert("You've successfully added a review!")
	}

	let fetchReviews = () => {
		fetch("http://localhost:8080/reviews")
		.then(res => res.json())
		.then(data => {
			setReviews(data);	
		});
	}

	useEffect( () => {
		fetchReviews()
	}, []);

	let displayAboutUs = () => {
		return(
			<div className="p-1">
				<h2>About Us</h2>
				<br/>
				<div className="card-group p-1 bg-transparent mt-3 mb-4">
					<div className="card text-white m-1 border-info">
							<img src={image2} className="card-img-top" alt="Hotel1"/>
						<div className="card-img-overlay">
							<h3 className="card-title m-2 p-2">The Most Beautiful Hotels</h3>
						</div>
					</div>
					<div className="card text-white m-1 border-info">
							<img src={image3} className="card-img-top" alt="Hotel2"/>
						<div className="card-img-overlay">
							<h3 className="card-title m-2 p-2">The Cheapest Prices</h3>
						</div>
					</div>
					<div className="card text-white m-1 border-info">
							<img src={image4} className="card-img-top" alt="Hotel3"/>
						<div className="card-img-overlay">
							<h3 className="card-title m-2 p-2">The Best Deals</h3>
						</div>
					</div>
				</div>
				

				<p>
				Our hotel search allows users to compare hotel prices in just a few clicks from more than 400 booking sites for 1.8 million+ hotels in over 190 countries. 
				With 1.4 billion visits annually to our site, travellers regularly use the hotel comparison to compare deals in the same city.
				
				Online Hotel Booking is a hotel search with an extensive price comparison. The prices shown come from numerous hotels and booking websites. 
				This means that while users decide on Online Hotel Booking which hotel best suits their needs, the booking process itself is completed through the booking sites. 
				</p>

				<p>
				With Online Hotel Booking you can easily find your ideal hotel and compare prices from different websites.
				Let Online Hotel Booking help you to find the right price from over 400 booking sites!
				</p>
			</div>
		)
	}

	let displayHowItWorks = () => {
		return(
			<div id="howItWorks" className="mt-5">
				<h2>How Our Services Works?</h2>
				<div className="card-group p-1 bg-transparent mt-5" id="howCard">
					<div className="card bg-primary text-white p-5 m-1">
						<div className="card-img-top">
							<i className="fas fa-book"></i>
						</div>
						<div className="card-body">
							<h5 className="card-title">Book A Hotel</h5>
							<p className="card-text">Book a hotel of your choosing from our website.</p>
						</div>
					</div>
					<div className="card p-5 m-1 bg-primary text-white">
						<div className="card-img-top">
							<i className="fas fa-check"></i>
							<div className="card-body">
								<h5 className="card-title">Confirm</h5>
								<p className="card-text">Then, we'll confirm the booking request for you.</p>
							</div>
						</div>
					</div>
					<div className="card p-5 m-1 bg-primary text-white">
						<div className="card-img-top">
							<i className="fas fa-clipboard-check"></i>
						</div>
						<div className="card-body">
							<h5 className="card-title">All Done</h5>
							<p className="card-text">Once we confirm the request, it's all done.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	let displayReviews = () => {
		if(reviews!=""){
			return reviews.map(item =>
				<Review
					key={item.id}
					reviewId={item.id}
					review={item.review}
					username={item.user.username}
					fetchReviews={fetchReviews}
				/>
			)
		}
	}

	let displayCreateReviewForm = () => {
		return(
			<div className="p-2">
				<h5>
			        <strong>Post a Review</strong>
			    </h5>
			    <div className="card-body">
			    	<form className="text-center">
						<div className="form-group">
							<textarea
								rows="4" cols="50"
								form="usrform"
								className="form-control"
								type="text"
								placeholder="Write your feedback or review here.."
								autoComplete="false"
								onChange={reviewChangeHandler}
								onBlur={reviewChangeHandler}
							>
							</textarea>
							<small className="text-danger text-center">{reviewError}</small>
						</div>
						
						<button
							className="btn btn-info btn-rounded my-4 waves-effect z-depth-0"
							onClick={submitReviewClickHandler} disabled={reviewBtnDisabled}
						>Submit Review</button>
					</form>
			    </div>
			</div>
		)
	}

	if(props.isLoggedIn===false){
		return(
			<div>
				<div id="landingBG1" className="">
					<div id="homeForm" className="">
						{showForm()}
					</div>
				</div>

					
			</div>

		);
	} else if(localStorage.getItem("username")==="admin"){
		return(
			<div>
				<div id="landingBG2" className="">
					{/*<h3 className="mt-5">{"Welcome Back " + (localStorage.getItem("username"))}</h3>*/}
					<img className="mt-5 mb-5 img-fluid" id="headerLogo" src={image}/>


				</div>

				<div id="homeContent" className="jumbotron mb-0">
					{displayAboutUs()}
					{displayHowItWorks()}

				</div>			
				<div id="reviewRow" className="jumbotron mb-0">
						<h2>Reviews</h2>
						<div className="row py-3">
							{displayReviews()}
						</div>
				</div>
			</div>
		)
	}

	else {
		return(
			<div>
				<div id="landingBG2" className="">
					{/*<h3 className="mt-5">{"Welcome Back " + (localStorage.getItem("username"))}</h3>*/}
					<img className="mt-5 mb-5 img-fluid" id="headerLogo" src={image}/>
				</div>

				<div id="homeContent" className="jumbotron mb-0">
					{displayAboutUs()}
					{displayHowItWorks()}
				</div>			
				<div id="reviewRow" className="jumbotron">
						<h2>Reviews</h2>
						<div className="row py-3">
							{displayReviews()}
						</div>
				</div>
						{displayCreateReviewForm()}
			</div>
		)
	}
}

export default Home;