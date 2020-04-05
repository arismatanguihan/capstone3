import React from 'react';

function Review(props) {

	function displayReview() {

		let deleteClickHandler = () => {
			fetch("http://localhost:8080/reviews/" + props.reviewId, {
			method: 'delete'
			})
			.then(res => res)
			.then(data => {
				props.fetchReviews();
			});
		}

		let displayReviewBody = () => {
			return(
				<div className="card-body" id="reviewCard">
					<p className="card-text text-center">{props.review}</p>
					<small>by: </small>
					<small>{props.username}</small>
				</div>
			)
		}


		if(localStorage.getItem("username")==="admin") {
			return(
				<div id="review" className="card col-lg-12 mb-2">
					<div className="card-header">
						<button type="button" id="buttonReview" className="close" onClick={deleteClickHandler} >
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					{displayReviewBody()}
				</div>
			)
		} else {
			return(
				<div id="review" className="card col-lg-12 mb-2">
					{displayReviewBody()}
				</div>
			)
		}
	}


	return(
		displayReview()
	);

}

export default Review;