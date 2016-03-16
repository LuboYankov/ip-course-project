$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/employers";
	
	function checkEmail(email) {
		var regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regExp.test(email);
	}
	
	function checkPassword(password, passwordConfirmation) {
		if(password == passwordConfirmation) {
			return true;
		}
		return false;
	}
	
	function signUp() {
		var employer = {
				username: $("[name='username']").val(),
				name: $("[name='name']").val(),
				email: $("[name='email']").val(),
				phone: $("[name='phone']").val(),
				password: $("[name='password']").val(),
				jobs: []
		}
		
		$.ajax(ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(employer),
			dataType: "json"
		});
	}
	
	function validForm() {
		if(checkPassword($("[name='password']").val(), $("[name='confirm-password']").val()) & checkEmail($("[name='email']").val())) {
			return true;
		}
		return false;
	}
	
	function attachActionListeners() {
		$(".employer-action-sign-up").click(function() {
			if(validForm()) {
				signUp();
				alert("Successfully created an account!");
				// TODO redirect
			} else {
				alert("Incorrect information.");
			}
		});
	}
	
	attachActionListeners();
	
});