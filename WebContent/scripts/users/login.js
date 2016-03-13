$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/users";
	
	function getUserUrl(userId) {
		return ENDPOINT + "/" + userId;
	}
	
	function getUser(userId) {
		return $.ajax(getUserUrl(userId), {
			method: "GET",
			dataType: "json"
		});

	}
	function getUsers() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function logInUser() {
		var currentUser = {
				username: $("[name='username']").val(),
				password: $("[name='password']").val()
		}
		getUsers().then(function(users) {
			var checkFlag = false;
			_.forEach(users, function(dbUser) {
				if((currentUser.username == dbUser.username) && (currentUser.password == dbUser.password)) {
					checkFlag = true;
					document.cookie = "session=" + dbUser.id + "; path=/";
					window.location.href = "../jobs/jobExploration.html";
				}
			});
			if(!checkFlag) {
				alert("Incorrect username or password!");
			}
		});
	}
	
	function attachActionListeners() {
		$(".user-action-log-in").click(function() {
			logInUser();
		});
	}
	
	attachActionListeners();
});