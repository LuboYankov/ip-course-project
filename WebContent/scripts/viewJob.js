$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/jobs";
	var EMPLOYERS_ENPOINT = "http://localhost:3000/employers";
	var JOB_ID = getUrlVars()["id"];
	
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
	
	function attachActionListeners() {
		$("#delete-job").click(function() {
			deleteJob();
			window.location.href = "jobExploration.html"
		});
		
		$("#edit-job").click(function() {
			window.location.href = "editJob.html?id=" + JOB_ID;
		});
	}
	
	viewJob();
	attachActionListeners();
});