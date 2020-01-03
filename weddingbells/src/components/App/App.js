import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import {
	LandingPageView,
	WeddingCreationView,
	ProtectedView,
	CouplePageView,
	SettingsView,
  WeddingInviteView,
} from "../../views";

import { toggleAuthModal } from "../../actions";

import PrivateRoute from "../PrivateRoute/PrivateRoute.js";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header toggleAuthModal={this.props.toggleAuthModal} />
				<Switch>
					<Route exact path="/" render={() => <LandingPageView />} />
					<Route
						exact
						path="/create-wedding"
						render={() => <WeddingCreationView />}
					/>
					<PrivateRoute path="/couple" component={CouplePageView} />
					<PrivateRoute path="/settings" component={SettingsView} />
          <Route
						exact
						path="/weddings/:weddingId/invite/:guestId"
						component={WeddingInviteView}
					/>
					<PrivateRoute path="/protected" component={ProtectedView} />
				</Switch>
				<Footer toggleAuthModal={this.props.toggleAuthModal} />
			</div>
		);
	}
}

export default connect(null, { toggleAuthModal })(App);
