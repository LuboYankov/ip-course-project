$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/Jobs/api/v1/users";
	
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
		var user = {
				username: $("[name='username']").val(),
				name: $("[name='name']").val(),
				email: $("[name='email']").val(),
				phone: $("[name='phone']").val(),
				password: $("[name='password']").val()//,
				//favorites: []
				// TODO: favorites
		}
		
		$.ajax(ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(user),
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
		$(".user-action-sign-up").click(function() {
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