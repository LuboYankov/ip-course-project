$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/Jobs/api/v1/jobs";
	var USERS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/users";
	var USER_AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/users";
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication";
	var JOB_ID = getUrlVars()["id"];
	
	function getUserUrl(userId) {
		return USERS_ENDPOINT + "/" + userId;
	}
	
	function getCurrentUser(userId) {
		return $.ajax(USER_AUTH_ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	
	function getJobUrl(jobId) {
		return ENDPOINT + "/" + jobId;
	}
	
	function getJobParameters(jobId) {
		return $.ajax(getJobUrl(jobId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function deleteJob() {
		$.ajax(getJobUrl(JOB_ID), {
			method: "DELETE"
		});
	}
	
	function viewJob() {
		getJobParameters(JOB_ID).then(function(response) {
				$("title").text(response.title);
				$("#title").text(response.title);
				$("#author").text(response.author.username);
				$("#description").text(response.description);
				$("#salary").text("$"+response.salary);
				$("#jobType").append(response.jobType);
				$("#jobCategory").append(response.jobCategory);
				$("#location").append(response.location);
		});
	}
	
	function showUser(user) {
		var li = $("<li />");
		li.append("<a href='#'>" + user.username + "</a>")
		$(".navbar-nav").prepend(li);
	}

	function logout() {
		$.ajax(AUTH_ENDPOINT, {
			method: "PUT",
			dataType: "json"
		});
	}
	
	function addFavourite() {
		getCurrentUser().then(function(response) {
			var userUrl = getUserUrl(response.id) + "/favourite/" + JOB_ID;
			$.ajax(userUrl, {
				method: "PUT",
				dataType: "json"
			});
		});
	}
	
	function attachActionListeners() {
		$("#delete-job").click(function() {
			deleteJob();
			window.location.href = "jobExploration.html"
		});
		
		$("#edit-job").click(function() {
			window.location.href = "editJob.html?id=" + JOB_ID;
		});
		
		$("#favourite-job").click(function() {
			addFavourite();
		});
		
		$("#logout").click(function() {
			 logout();
		});
	}
	
	viewJob();
	attachActionListeners();
});