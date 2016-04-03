$(document).ready(function() {
	"use strict";
	
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/employers";
		
	function logInEmployer() {
		var currentEmployerParams = {
				username: $("[name='username']").val(),
				password: $("[name='password']").val()
		}
		$.ajax(AUTH_ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(currentEmployerParams),
			dataType: "json"
		}).then(function(response) {
			window.location.href = "profile.html";
		});
	}
	
	function attachActionListeners() {
		$(".employer-action-log-in").click(function() {
			logInEmployer();
		});
	}
	
	attachActionListeners();
});