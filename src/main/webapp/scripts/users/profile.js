$(document).ready(function() {
	"use strict";
	
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/users";
	var USERS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/users";
	var JOBS_ENDPOINT = "http://localhost:3000/jobs";
	var DEFAULT_AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication";

	function getUserUrl(userId) {
		return USERS_ENDPOINT + "/" + userId;
	}
	
	function getJobUrl(jobId) {
		return JOBS_ENDPOINT + "/" + jobId;
	}
	
	function getUserFavouritesUrl(userId) {
		return USERS_ENDPOINT + "/" + userId + "/favourites";
	}
	
	function getUser() {
		return $.ajax(AUTH_ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	
	function getUserFavourites(userId) {
		$.ajax(getUserFavouritesUrl(userId), {
			method: "GET",
			dataType: "json"
		}).then(function(response) {
			function showJobView(job) {
				var divContainer = $("<div />");
				var divThumbnail = $("<div />");
				var divCaption = $("<div />");
				var h4Title = $("<h4 />");
				var h4Salary = $("<h4 />");
				var pDescription = $("<p />");
				divContainer.addClass("col-sm-4 col-lg-4 col-md-4");
				divThumbnail.addClass("thumbnail");
				divCaption.addClass("caption");
				h4Salary.addClass("pull-right");
				pDescription.text(job.description);
				h4Title.text(job.title);
				h4Salary.text("$"+job.salary);
				divCaption.append(h4Salary);
				divCaption.append(h4Title);
				divCaption.append(pDescription);
				divThumbnail.append(divCaption);
				divContainer.attr("data-job-id", job.id);
				divContainer.append(divThumbnail);
				$(".col-md-9 .row").append(divContainer);
			}
			_.forEach(response, showJobView);
		});
	}
	
	function closeProfile() {
		getUser().then(function(user) {
			$.ajax(getUserUrl(user.id), {
				method: "DELETE"
			});
		});
	}
	
	function fillUserInformation() {
		getUser().then(function(user) {
			$("#username-nav").text(user.username);
			$("#username").text(user.username);
			$("#name").text("Name: " + user.name);
			$("#email").text("Email: " + user.email);
			$("#phone").text("Phone: " + user.phone);
			getUserFavourites(user.id);
		});
	}
	
	function attachActionListeners() {
		$(document).on("click", "[data-job-id]", function() {
			window.location.href = "../jobs/viewJob.html?id="+ $(this).attr("data-job-id");
		});
		
		$("#close-profile").click(function() {
			closeProfile();
			window.location.href = "../index.html";
		});
		
		$("#logout").click(function() {
			 $.ajax(DEFAULT_AUTH_ENDPOINT, {
				method: "DELETE" 
			 });
			 window.location.href = "../index.html";
		});
	}
	
	fillUserInformation();
	attachActionListeners();
	
});