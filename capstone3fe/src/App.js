import React, { useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Hotels from './components/Hotels';
import AdminPanel from './components/AdminPanel';
import image from './images/hotel_logo.png'


function App() {
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId")? true : false)

	let renderHome = () => 
		<Home 
		setIsLoggedIn={setIsLoggedIn}
		isLoggedIn={isLoggedIn} 
		/>

	let renderServices = () => 
		<Hotels 
		setIsLoggedIn={setIsLoggedIn}
		isLoggedIn={isLoggedIn} 
		/>

	let logoutClickHandler = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		setIsLoggedIn(false);

	}

	function displayApp(props) {
		if(isLoggedIn===true && localStorage.getItem("username")==="admin") {
			return(
				<React.Fragment>
					<nav id="navbar" className="navbar navbar-expand-lg navbar-dark text-dark sticky-top">
						
						<div id="logo"><img src={image} alt="logo"/></div>

						<button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar-nav">
							<i className="fas fa-bars"></i>
							<div id="nav-icon2">
							</div>
						</button>

						<div id="navbar-nav" className="collapse navbar-collapse my-4">
							<ul className="navbar-nav ml-auto">
							    <li className="nav-item">
									<Link className="nav-link" to="/">Home</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/hotels">Hotels</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/admin_panel">Admin Panel</Link>
							    </li>
							    <button 
							    className="btn btn-info" 
							    onClick={logoutClickHandler}
							    >
							    	Log Out
							    </button>
							</ul>
						</div>
					</nav>

						<Route path="/hotels" exact component={renderServices}/>
						<Route path="/" exact component={renderHome}/>
						<Route path="/admin_panel" exact component={AdminPanel}/>
				
					<footer className="footer">
						<p className="text-center p-2 mb-1">© 2019 Online Hotel Booking System. All rights reserved.</p>
						<p className="text-center m-0">Presented by: Aris Kristian Matanguihan of Zuitt Coding Bootcamp. No copyright infringement intended. This is for educational purposes only.</p>
					</footer>
				</React.Fragment>
			);
		} else if (isLoggedIn===true){
			return(
				<React.Fragment>
					<nav id="navbar" className="navbar navbar-expand-lg navbar-dark sticky-top">
						
						<div id="logo"><img src={image} alt="logo"/></div>

						<button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar-nav">
							<i className="fas fa-bars"></i>
							<div id="nav-icon2">
							</div>
						</button>

						<div id="navbar-nav" className="collapse navbar-collapse my-4">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/">Home</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/hotels">Hotels</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/admin_panel">Booking Status</Link>
							    </li>
							    <button 
							    className="btn btn-info" 
							    onClick={logoutClickHandler} 
							    >
							    	Log Out
							    </button>
							</ul>
						</div>
					</nav>

					<div>
						<Route path="/hotels" exact component={renderServices}/>
						<Route path="/" exact component={renderHome}/>
						<Route path="/admin_panel" exact component={AdminPanel}/>
						
					</div>
					<footer className="footer">
						<p className="text-center p-2 mb-1">© 2019 Online Hotel Booking System. All rights reserved.</p>
						<p className="text-center m-0">Presented by: Aris Kristian Matanguihan of Zuitt Coding Bootcamp. No copyright infringement intended. This is for educational purposes only.</p>
					</footer>
				</React.Fragment>
			);
		} else {
			return(
				<React.Fragment>
					<nav id="navbar" className="navbar navbar-expand-lg navbar-dark sticky-top">
						
						<div id="logo"><img src={image} alt="logo"/></div>

						<button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar-nav">
							<i className="fas fa-bars"></i>
							<div id="nav-icon2">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>

						<div id="navbar-nav" className="collapse navbar-collapse my-4">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/">Home</Link>
							    </li>
							
							</ul>
						</div>
					</nav>

					<div>
						{/*<Route path="/services" exact component={renderServices}/>*/}
						<Route path="/" exact component={renderHome}/>
					</div>
					<footer className="footer">
						<p className="text-center p-2 mb-1">© 2019 Online Hotel Booking System. All rights reserved.</p>
						<p className="text-center m-0">Presented by: Aris Kristian Matanguihan of Zuitt Coding Bootcamp. No copyright infringement intended. This is for educational purposes only.</p>
					</footer>
				</React.Fragment>
			);
		} 
		
	}
	
  return (
  	<BrowserRouter>
	    <div className="App container-fluid p-0 m-0">
	    	{ displayApp() }

	    </div>
	</BrowserRouter>
  );
}

export default App;
