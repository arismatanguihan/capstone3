import React, {useState} from 'react'

function LoginForm(props) {
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [usernameError, setUsernameError] = useState("");
	let [passwordError, setPasswordError] = useState("");
	let [loginBtnDisabled, setLoginBtnDisabled] = useState(true);


	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)

		if(e.target.value.trim() === "") {
			setUsernameError("This field cannot be empty.");
		} else {
			setUsernameError("");				
		}
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)

		if(e.target.value.trim() === "") {
			setPasswordError("This field cannot be empty.");
		} 
		 else {
			setPasswordError("");
			

		}
	}

	checkForm();

	function checkForm() {
		if(username.trim()!=="" 
			&& password.trim()!=="" 
			&&usernameError==""
			&&passwordError=="") {
			if(loginBtnDisabled!==false){
				setLoginBtnDisabled(false);
			}
		} else {
			if(loginBtnDisabled!==true){
				setLoginBtnDisabled(true);
			}
		}
	}


	function parseJwt (token) {
	    var base64Url = token.split('.')[1];
	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));

	    return JSON.parse(jsonPayload);
	};

	let submitClickHandler = () => {
		let user = {
			username,
			password
		}
		fetch("http://localhost:8080/login", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => res.text())
		.then(data => {
			localStorage.setItem("userId",(parseJwt(data).account.id));
			localStorage.setItem("username",(parseJwt(data).account.username));
			window.location.reload(false);
			alert("Welcome "+ (parseJwt(data).account.username) +"!")
		})
		.catch(e => {
			alert("Login failed. Invalid Username/Password")
		});
		console.log(user)
	}

	return(
		<div className="col-xs-12 col-md-7 formBG">
			<p className="header display-3 text-white mb-4">
		        Online Booking System
		    </p>
		    <p className="header display-6 text-white">By: Aris Kristian Matanguihan</p>
			<h2 className="header display-4 text-white mb-4">
		        Log In
		    </h2>
		    <div className="card-body px-lg-5 pt-0">
				<form className="text-center">
					<div className="form-group md-form mt-4">
						<input
							className="form-control text-center"
							type="text"
							placeholder="Username"
							value={username}
							autoComplete="false"
							onChange={usernameChangeHandler}
							onBlur={usernameChangeHandler}
						/>
						<small className="text-danger text-center">{usernameError}</small>
					</div>
					<div className="form-group">
						<input
							className="form-control text-center"
							type="password"
							placeholder="Password"
							value={password}
							autoComplete="false"
							onChange={passwordChangeHandler}
							onBlur={passwordChangeHandler}
						/>
						<small className="text-danger text-center">{passwordError}</small>
					</div>
					<button 
						className="btn btn-info btn-rounded my-3 waves-effect z-depth-0"
						type="button"
						onClick={submitClickHandler}
						disabled={loginBtnDisabled}
					>Log In</button>
				</form>
			<small className="text-white">Not yet a member? </small><button className="btn btn-info p-1 m-1" onClick={props.clickFormHandler}>Register</button>
			</div>
		</div>
	);
}

export default LoginForm;