$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/Jobs/api/v1/jobs";
	var EMPLOYER_ENDPOINT = "http://localhost:8080/Jobs/api/v1/employers";
	var EMPLOYER_AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/employers";
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication";
	var JOB_ID = getUrlVars()["id"];
	
	function getEmployerUrl(employerId) {
		return EMPLOYERS_ENDPOINT + "/" + employerId;
	}
	
	function getCurrentEmployer() {
		return $.ajax(EMPLOYER_AUTH_ENDPOINT, {
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
	
	function getComments() {
		return $.ajax(getJobUrl(JOB_ID)+"/comments", {
			method: "GET",
			dataType: "json"
		});
	}
	
	function showComments() {
		getComments().then(function(response) {
			function showComment(comment) {
				var row = $("<div />");
				row.attr("class", "row");
				var column = $("<div />");
				column.attr("class", "col-sm-5");
				var panel = $("<div />");
				panel.attr("class", "panel panel-default");
				var panelHeading = $("<div />");
				panelHeading.attr("class", "panel-heading");
				var username = $("<strong />");
				username.html(comment.author.username);
				var panelBody = $("<div />");
				panelBody.attr("class", "panel-body");
				panelBody.text(comment.body);
				panelHeading.append(username);
				panel.append(panelHeading);
				panel.append(panelBody);
				column.append(panel);
				row.append(column);
				$("#comments-container").append(row);
			}
			$("#comments-container").html("");
			_.forEach(response, showComment);
		});
	}

	function logout() {
		$.ajax(AUTH_ENDPOINT, {
			method: "DELETE"
		}).then(function() {
			window.location.href = "../index.html";
		});
	}
	
	function attachActionListeners() {
		$("#delete-job").click(function() {
			deleteJob();
			window.location.href = "profile.html"
		});
		
		$("#edit-job").click(function() {
			window.location.href = "../jobs/editJob.html?id=" + JOB_ID;
		});
		
		$("#logout").click(function() {
			 logout();
		});
	}
	
	viewJob();
	attachActionListeners();
	showComments();
});