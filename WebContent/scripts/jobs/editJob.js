$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/jobs"
	var JOB_ID = getUrlVars()["id"];
	var EMPLOYER_ID = null;
	
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
	
	function fillJobParameterFields() {
		getJobParameters(JOB_ID).then(function(response) {
			$("[name='title']").val(response.title);
			$("[name='description']").val(response.description);
			$("[name='salary']").val(response.salary);
			$("[name='location']").val(response.location);
			$("[name='jobType']").val(response.jobType);
			$("[name='jobCategory']").val(response.jobCategory);
			EMPLOYER_ID = response.author;
		});
	}
		
	function loadActionListeners() {
		$(".job-action-update").click(function() {
			var job = {
					title: $("[name='title']").val(),
					description: $("[name='description']").val(),
					salary: $("[name='salary']").val(),
					location: $("[name='location']").val(),
					jobType: $("[name='jobType']").val(),
					jobCategory: $("[name='jobCategory']").val(),
					author: EMPLOYER_ID
			}
			
			$.ajax(getJobUrl(JOB_ID), {
				method: "PUT",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(job),
				dataType: "json"
			}).then(function(response) {
				window.location.href = "viewJob.html?id="+response.id;
			});
		});
	}
	
	fillJobParameterFields();
	loadActionListeners();
});