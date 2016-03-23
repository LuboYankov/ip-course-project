$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/Jobs/api/v1/employers";
	
	function getEmployerUrl(employerId) {
		return ENDPOINT + "/" + employerId;
	}
	
	function getEmployer(employerId) {
		return $.ajax(getEmployerUrl(employerId), {
			method: "GET",
			dataType: "json"
		});

	}
	
	function getEmployers() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function setCookie(cname, cvalue, path) {
	    document.cookie = cname + "=" + cvalue + ";" + "path=" + path + ";";
	}
	
	function logInEmployer() {
		var currentemployer = {
				username: $("[name='employername']").val(),
				password: $("[name='password']").val()
		}
		getEmployers().then(function(employers) {
			var checkFlag = false;
			_.forEach(employers, function(dbemployer) {
				if((currentemployer.username == dbemployer.employername) && (currentemployer.password == dbemployer.password)) {
					checkFlag = true;
					setCookie("session", dbemployer.id,"/");
					window.location.href = "profile.html";
				}
			});
			if(!checkFlag) {
				alert("Incorrect employername or password!");
			}
		});
	}
	
	function attachActionListeners() {
		$(".employer-action-log-in").click(function() {
			logInEmployer();
		});
	}
	
	attachActionListeners();
});