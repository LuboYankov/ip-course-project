$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/jobs";
	var EMPLOYERS_ENPOINT = "http://localhost:3000/employers";
	var USERS_ENDPOINT = "http://localhost:3000/users";
	var JOB_ID = getUrlVars()["id"];
	
	function getUserUrl(userId) {
		return USERS_ENDPOINT + "/" + userId;
	}
	
	function getUser(userId) {
		return $.ajax(getUserUrl(userId), {
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
	
	function getAuthorUrl(authorId) {
		return EMPLOYERS_ENPOINT + "/" + authorId;
	}
	
	function getAuthorParameters(authorId) {
		return $.ajax(getAuthorUrl(authorId), {
			method: "GET",
			dataType: "json"
		});
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
			getAuthorParameters(response.author).then(function(authorResponse) {
				$("title").text(response.title);
				$("#title").text(response.title);
				$("#author").text(authorResponse.name);
				$("#description").text(response.description);
				$("#salary").text("$"+response.salary);
				$("#jobType").append(response.jobType);
				$("#jobCategory").append(response.jobCategory);
				$("#location").append(response.location);
			});
		});
	}
	
	function showUser(user) {
		var li = $("<li />");
		li.append("<a href='#'>" + user.username + "</a>")
		$(".navbar-nav").prepend(li);
	}
	
	function getCurrentUser() {
		var cookie = document.cookie;
		var currentUserId = cookie.split("=")[1];
		getUser(currentUserId).then(function(response) {
			showUser(response);
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
		
		$("#logout").click(function() {
			 document.cookie = 'session=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			 window.location.href = "../index.html";
		});
	}
	
	viewJob();
	attachActionListeners();
	getCurrentUser();
});