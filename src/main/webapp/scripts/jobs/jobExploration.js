$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/Jobs/api/v1/jobs";
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/users";
	
	function getJobs() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function contains(string, substring) {
		if(string.toUpperCase().indexOf(substring.toUpperCase()) > -1) {
			return true;
		}
		return false;
	}
	
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
	
	function searchResults() {
		var keywords = $("#search-keywords").val();
		getJobs().then(function(jobs) {
			$(".col-md-9 .row").html("");
			_.forEach(jobs, function(job) {
				if(contains(job.title, keywords)) {
					showJobView(job);
				}
			});
		});
	}
	
	function showJobs() {
		getJobs().then(function(response) {
			$(".col-md-9 .row").html("");
			_.forEach(response, function(value) {
				showJobView(value);
			});
		});
	}
	
	function logout() {
		$.ajax(AUTH_ENDPOINT, {
			method: "DELETE"
		});
	}
	
	function attachActionListeners() {
		$(document).on("click", "[data-job-id]", function() {
			window.location.href = "viewJob.html?id="+ $(this).attr("data-job-id");
		});
		
		$("#search-button").click(function() {
			searchResults();
		});
		
		$("#logout").click(function() {
			 logout();
			 window.location.href = "../index.html";
		});
	}
	
	function showUser(user) {
		var li = $("<li />");
		li.append("<a href='#'>" + user.username + "</a>")
		$(".navbar-nav").prepend(li);
	}
	
	function getCurrentUser() {
		$.ajax(AUTH_ENDPOINT, {
			method: "GET",
			dataType: "json"
		}).then(function(response) {
			showUser(response);
		});
	}
	
	showJobs();
	attachActionListeners();
	getCurrentUser();
});