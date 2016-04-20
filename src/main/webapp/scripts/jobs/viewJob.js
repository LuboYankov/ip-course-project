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
	
	function isJobFavourited() {
		$.ajax(USERS_ENDPOINT + "/favourited/" + JOB_ID, {
			method: "GET",
			dataType: "json"
		}).then(function(response) {
			if(response == true) {
				$("#favourite-job").hide();
			}
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
			}).then(function(response) {
				window.location.reload();
			});
		});
	}
	
	function addComment() {
		var comment = {
				body: $("#comment-body").val()
		}
		$.ajax(getJobUrl(JOB_ID)+"/comments", {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(comment),
			dataType: "json"
		}).then(function(response) {
			window.location.reload();
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
		
		$("#create-comment").click(function() {
			addComment();
		});
		
		$("#logout").click(function() {
			 logout();
		});
	}
	
	viewJob();
	attachActionListeners();
	isJobFavourited();
	showComments();
});