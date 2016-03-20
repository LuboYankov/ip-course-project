$(document).ready(function() {
	"use strict";

	var ENDPOINT = "http://localhost:3000/administrators";
	
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
	
	
	function getAdminUrl(adminId) {
		return ENDPOINT + "/" + adminId;
	}
	
	function getAdmin(adminId) {
		return $.ajax(getAdminUrl(adminId), {
			method: "GET",
			dataType: "json"
		});

	}
	
	function getAdmins() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function setCookie(cname, cvalue, path) {
	    document.cookie = cname + "=" + cvalue + ";" + "path=" + path + ";";
	}
	
	function logInAdmin() {
		var currentAdmin = {
				username: $("#username-field").val(),
				password: $("#password-field").val()
		}
		getAdmins().then(function(admins) {
			var checkFlag = false;
			_.forEach(admins, function(dbAdmin) {
				if((currentAdmin.username == dbAdmin.username) && (currentAdmin.password == dbAdmin.password)) {
					checkFlag = true;
					setCookie("session", dbAdmin.id,"/");
					alert("Successfully logged in!");
				}
			});
			if(!checkFlag) {
				alert("Incorrect username or password!");
			}
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