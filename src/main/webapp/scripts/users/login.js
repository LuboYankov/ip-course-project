$(document).ready(function() {
	"use strict";
	
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/users";
	
	function logInUser() {
		var currentUserParams = {
				username: $("[name='username']").val(),
				password: $("[name='password']").val()
		}
		$.ajax(AUTH_ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(currentUserParams),
			dataType: "json"
		}).then(function(response) {
			window.location.href = "../jobs/jobExploration.html";
		});
	}
	
	function attachActionListeners() {
		$(".user-action-log-in").click(function() {
			logInUser();
		});
	}
	
	attachActionListeners();
});