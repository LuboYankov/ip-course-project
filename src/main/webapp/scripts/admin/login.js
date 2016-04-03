$(document).ready(function() {
	"use strict";

	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/administrators";
	
	function styleForm() {
		$(".admin").focusin(function() {
			$(".inputAdminIcon").css("color", "#e74c3c");
		}).focusout(function() {
			$(".inputAdminIcon").css("color", "white");
		});
		
		$(".pass").focusin(function() {
			$(".inputPassIcon").css("color", "#e74c3c");
		}).focusout(function() {
			$(".inputPassIcon").css("color", "white");
		});
	}

	function logInAdmin() {
		var currentAdminParams = {
				username: $("#username-field").val(),
				password: $("#password-field").val()
		}
		$.ajax(AUTH_ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(currentAdminParams),
			dataType: "json"
		}).then(function(response) {
			window.location.href = "dashboard.html";
		});
	}
	
	function attachActionListeners() {
		$("#login").click(function() {
			logInAdmin();
		});
	}
	
	styleForm();
	attachActionListeners();
});