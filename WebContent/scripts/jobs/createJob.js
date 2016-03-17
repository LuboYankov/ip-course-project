$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/jobs";
	var EMPLOYERS_ENDPOINT = "http://localhost:3000/employers";
	
	function getEmployerUrl(employerId) {
		return EMPLOYERS_ENDPOINT + "/" + employerId;
	}
	
	function getEmployer(employerId) {
		return $.ajax(getEmployerUrl(employerId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getEmployerId() {
		var cookies = document.cookie;
		return cookies.split("=")[1];
	}
	
	function addJobToEmployer(jobId) {
		var job = { id: jobId }
		var employerId = getEmployerId();
		
		getEmployer(employerId).then(function(response) {
			response.jobs.push(job);
			alert(response.jobs);
			$.ajax(getEmployerUrl(response.id), {
				method: "PUT",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(response),
				dataType: "json"
			}).then(function(response) {
				window.location.href = "viewJob.html?id="+jobId;
			});
		});
	}
	
	function createJob() {
		var job = {
				title: $("[name='title']").val(),
				description: $("[name='description']").val(),
				salary: $("[name='salary']").val(),
				location: $("[name='location']").val(),
				jobType: $("[name='jobType']").val(),
				jobCategory: $("[name='jobCategory']").val(),
				author: getEmployerId()
		}
		
		$.ajax(ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(job),
			dataType: "json"
		}).then(function(response) {
			addJobToEmployer(response.id);
		});
	}
		
	function loadActionListeners() {
		$(".job-action-create").click(function() {
			createJob();
		});
	}
	
	loadActionListeners();
});