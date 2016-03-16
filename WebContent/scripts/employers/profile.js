$(document).ready(function() {
	"use strict";
	
	var EMPLOYERS_ENDPOINT = "http://localhost:3000/employers";
	var JOBS_ENDPOINT = "http://localhost:3000/jobs";
	
	function getEmployerUrl(employerId) {
		return EMPLOYERS_ENDPOINT + "/" + employerId;
	}
	
	function getJobUrl(jobId) {
		return JOBS_ENDPOINT + "/" + jobId;
	}
	
	function getEmployer(employerId) {
		return $.ajax(getEmployerUrl(employerId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getCurrentEmployerId() {
		var cookie = document.cookie;
		return cookie.split("=")[1];
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
	
	function getEmployerJobs(employerId) {
		getEmployer(employerId).then(function(response) {
			_.forEach(response.jobs, function(job) {
				$.ajax(getJobUrl(job.id), {
					method: "GET",
					dataType: "json"
				}).then(function(response) {
					showJobView(response);
				});
			});
		});
	}
	
	function fillEmployerInformation() {
		var employerId = getCurrentEmployerId();
		getEmployer(employerId).then(function(employer) {
			$("#username-nav").text(employer.username);
			$("#username").text(employer.username);
			$("#name").text("Name: " + employer.name);
			$("#email").text("Email: " + employer.email);
			$("#phone").text("Phone: " + employer.phone);
		});
		getEmployerJobs(employerId);
	}
	
	function attachActionListeners() {
		$(document).on("click", "[data-job-id]", function() {
			window.location.href = "../jobs/viewJob.html?id="+ $(this).attr("data-job-id");
		});
	}
	
	fillEmployerInformation();
	attachActionListeners();
	
});