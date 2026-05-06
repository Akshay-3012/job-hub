// Load jobs when page opens
window.onload = function () {
    loadJobs();
};

// Add Job
function addJob() {

    var title = document.getElementById("title").value;
    var company = document.getElementById("company").value;
    var location = document.getElementById("location").value;
    var phone = document.getElementById("phone").value;

    if (title === "" || company === "" || location === "" || phone === "") {
        alert("Please fill all fields");
        return;
    }

    var job = {
        title: title,
        company: company,
        location: location,
        phone: phone
    };

    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJob(job);

    document.getElementById("title").value = "";
    document.getElementById("company").value = "";
    document.getElementById("location").value = "";
    document.getElementById("phone").value = "";
}

// Display Job
function displayJob(job) {

    var jobDiv = document.createElement("div");
    jobDiv.className = "job";

    jobDiv.innerHTML =
        "<h3>" + job.title + "</h3>" +
        "<p><b>Company:</b> " + job.company + "</p>" +
        "<p><b>Location:</b> " + job.location + "</p>" +
        "<p><b>Contact:</b> " + job.phone + "</p>" +
        "<button onclick='applyJob(\"" + job.phone + "\")'>Apply</button> " +
        "<button onclick='deleteJob(this)'>Delete</button>";

    document.getElementById("jobList").appendChild(jobDiv);
}

// Load Jobs
function loadJobs() {
    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.forEach(function(job) {
        displayJob(job);
    });
}

// Apply Job
function applyJob(phone) {
    alert("Call this number to apply: " + phone);
}

// Delete Job
function deleteJob(button) {

    var jobDiv = button.parentElement;
    var title = jobDiv.querySelector("h3").innerText;

    var jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    jobs = jobs.filter(function(job) {
        return job.title !== title;
    });

    localStorage.setItem("jobs", JSON.stringify(jobs));

    jobDiv.remove();
}

// 🔍 SEARCH FUNCTION
function searchJobs() {

    var input = document.getElementById("search").value.toLowerCase();
    var jobs = document.getElementsByClassName("job");

    for (var i = 0; i < jobs.length; i++) {

        var text = jobs[i].innerText.toLowerCase();

        if (text.includes(input)) {
            jobs[i].style.display = "block";
        } else {
            jobs[i].style.display = "none";
        }
    }
}