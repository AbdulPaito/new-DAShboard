document.addEventListener("DOMContentLoaded", function () {
    // Define your students array
    var students = [];

    // Add 50 empty students dynamically
    for (let i = 1; i <= 50; i++) {
        students.push({
            FullName: "",
            age: "",
            course: "",
            status: "",
            username: "",
            password: ""
        });
    }

    const homeLink = document.getElementById("home-link");
    const profileLink = document.getElementById("profile-link");
    const settingsLink = document.getElementById("settings-link");
    const reportLink = document.getElementById("report-link"); // Assuming you have a report link in your HTML
    const homeSection = document.getElementById("home-section");
    const profileSection = document.getElementById("profile-section");
    const settingsSection = document.getElementById("settings-section");
    const reportSection = document.getElementById("report-section"); // Assuming you have a report section in your HTML
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const printPdfButton = document.getElementById("print-pdf");

    // Initial content population
    showSection("home");

    // Event listeners for navigation links
    homeLink.addEventListener("click", function () {
        showSection("home");
    });

    profileLink.addEventListener("click", function () {
        showSection("profile");
        if (students.length > 0) {
            displayStudents(students, "profile");
            updateStudentCounters(students);
        }
    });

    settingsLink.addEventListener("click", function () {
        showSection("settings");
        if (students.length > 0) {
            displayStudents(students, "settings");
            updateStudentCounters(students);
        }
    });

    reportLink.addEventListener("click", function () {
        showSection("report");
        displayReport(students); // Call to display report data
    });

    printPdfButton.addEventListener("click", function () {
        generatePdfReport(students); // Call to generate PDF report
    });

    // Function to show the selected section and hide others
    function showSection(sectionId) {
        homeSection.style.display = sectionId === "home" ? "block" : "none";
        profileSection.style.display = sectionId === "profile" ? "block" : "none";
        settingsSection.style.display = sectionId === "settings" ? "block" : "none";
        reportSection.style.display = sectionId === "report" ? "block" : "none";
    }

    // Function to display report data
    function displayReport(students) {
        const reportTable = document.getElementById("report-table");
        const tableBody = reportTable.querySelector("tbody");
        tableBody.innerHTML = "";

        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to generate PDF report
    function generatePdfReport(students) {
        const doc = new jsPDF();
        doc.text("Student Report", 10, 10);
        let body = [];
        students.forEach((student, index) => {
            body.push([index + 1, "", "", "", ""]);
        });
        doc.autoTable({
            head: [["#", "Full Name", "Age", "Course", "Status"]],
            body: body
        });
        doc.save("student_report.pdf");
    }

    // Function to display students in a table (similar to existing function)
    function displayStudents(students, section) {
        const tableBody = document.querySelector(`#${section}-table tbody`);
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            if (section === "profile") {
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                `;
            } else if (section === "settings") {
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                `;
            }
            tableBody.appendChild(row);
        });
    }

    // Function to update student counters (similar to existing function)
    function updateStudentCounters(students) {
        const totalStudents = students.length;
        const activeStudents = students.filter(student => student.status === "Enrolled").length;
        const failedStudents = students.filter(student => student.status === "Failed").length;

        document.getElementById("total-students").textContent = totalStudents;
        document.getElementById("active-students").textContent = activeStudents;
        document.getElementById("failed-students").textContent = failedStudents;
    }

    // Function to generate CSV report (similar to existing function)
    document.getElementById("export-csv").addEventListener("click", function () {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "No,FullName,Age,Course,Status,Username,Password\n";
        students.forEach((student, index) => {
            csvContent += `${index + 1},,,,,,\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "student_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
