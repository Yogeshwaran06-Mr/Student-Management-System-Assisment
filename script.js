// ========================================
// 1. STUDENT DATA
// ========================================

let students = [

    {
        registerNo: "23IT001",
        name: "Arun Kumar",
        email: "arun@example.com",
        phone: "9876543210",
        department: "IT",
        year: "III",
        semester: "V"
    },

    {
        registerNo: "23CS002",
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "9876543211",
        department: "CSE",
        year: "III",
        semester: "V"
    },

    {
        registerNo: "23EC003",
        name: "Rahul Kumar",
        email: "rahul@example.com",
        phone: "9876543212",
        department: "ECE",
        year: "II",
        semester: "III"
    },

    {
        registerNo: "23IT004",
        name: "Karthik Raj",
        email: "karthik@example.com",
        phone: "9876543213",
        department: "IT",
        year: "II",
        semester: "III"
    },

    {
        registerNo: "23ME005",
        name: "Vijay Kumar",
        email: "vijay@example.com",
        phone: "9876543214",
        department: "MECH",
        year: "IV",
        semester: "VII"
    },

    {
        registerNo: "23AI006",
        name: "Divya Sri",
        email: "divya@example.com",
        phone: "9876543215",
        department: "AIML",
        year: "III",
        semester: "V"
    }

];


// ========================================
// 2. SHOW SECTION
// ========================================

function showSection(sectionId) {

    // Select all sections
    let sections = document.querySelectorAll(".section");

    // Hide all sections
    sections.forEach(function(section) {

        section.style.display = "none";

    });

    // Show selected section
    document.getElementById(sectionId).style.display = "block";

}


// ========================================
// 3. DISPLAY STUDENTS
// ========================================

function displayStudents() {

    // Get table body
    let tableBody =
        document.getElementById("studentTableBody");

    // Clear old table data
    tableBody.innerHTML = "";

    // Get search value
    let searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    // Get selected department
    let department =
        document.getElementById("departmentFilter").value;


    // Filter students
    let filteredStudents = students.filter(function(student) {

        // Search by name OR register number
        let searchMatch =
            student.name
                .toLowerCase()
                .includes(searchValue)

            ||

            student.registerNo
                .toLowerCase()
                .includes(searchValue);


        // Department filter
        let departmentMatch =
            department === ""

            ||

            student.department === department;


        // Both conditions must be true
        return searchMatch && departmentMatch;

    });


    // ========================================
    // SORTING
    // ========================================

    let sortOption =
        document.getElementById("sortOption").value;


    // Name A-Z
    if (sortOption === "nameAsc") {

        filteredStudents.sort(function(a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    // Name Z-A
    else if (sortOption === "nameDesc") {

        filteredStudents.sort(function(a, b) {

            return b.name.localeCompare(a.name);

        });

    }


    // Register Number Ascending
    else if (sortOption === "regAsc") {

        filteredStudents.sort(function(a, b) {

            return a.registerNo.localeCompare(
                b.registerNo
            );

        });

    }


    // Register Number Descending
    else if (sortOption === "regDesc") {

        filteredStudents.sort(function(a, b) {

            return b.registerNo.localeCompare(
                a.registerNo
            );

        });

    }


    // ========================================
    // DISPLAY TABLE ROWS
    // ========================================

    filteredStudents.forEach(function(student) {

        // Create table row
        let row = document.createElement("tr");


        // Add student information
        row.innerHTML = `

            <td>${student.registerNo}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.year}</td>

            <td>${student.semester}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent('${student.registerNo}')"
                >
                    Edit
                </button>


                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student.registerNo}')"
                >
                    Delete
                </button>

            </td>

        `;


        // Add row to table
        tableBody.appendChild(row);

    });


    // Update dashboard
    updateDashboard();

}


// ========================================
// 4. ADD STUDENT
// ========================================

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {


        // Prevent page refresh
        event.preventDefault();


        // ========================================
        // GET FORM VALUES
        // ========================================

        let registerNo =
            document.getElementById("registerNo")
            .value
            .trim();


        let name =
            document.getElementById("name")
            .value
            .trim();


        let email =
            document.getElementById("email")
            .value
            .trim();


        let phone =
            document.getElementById("phone")
            .value
            .trim();


        let department =
            document.getElementById("department").value;


        let year =
            document.getElementById("year").value;


        let semester =
            document.getElementById("semester").value;


        // ========================================
        // REQUIRED FIELD VALIDATION
        // ========================================

        if (

            registerNo === "" ||

            name === "" ||

            email === "" ||

            phone === "" ||

            department === "" ||

            year === "" ||

            semester === ""

        ) {

            alert("Please fill all fields.");

            return;

        }


        // ========================================
        // EMAIL VALIDATION
        // ========================================

        let emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }


        // ========================================
        // PHONE VALIDATION
        // ========================================

        let phonePattern =
            /^[0-9]{10}$/;


        if (!phonePattern.test(phone)) {

            alert(
                "Phone number must contain exactly 10 digits."
            );

            return;

        }


        // ========================================
        // DUPLICATE REGISTER NUMBER
        // ========================================

        let duplicate =
            students.some(function(student) {

                return student.registerNo.toLowerCase()
                    === registerNo.toLowerCase();

            });


        if (duplicate) {

            alert(
                "Register number already exists."
            );

            return;

        }


        // ========================================
        // CREATE NEW STUDENT
        // ========================================

        let newStudent = {

            registerNo: registerNo,

            name: name,

            email: email,

            phone: phone,

            department: department,

            year: year,

            semester: semester

        };


        // Add student to array
        students.push(newStudent);


        // Success message
        alert(
            "Student added successfully."
        );


        // Clear form
        document
            .getElementById("studentForm")
            .reset();


        // Update student table
        displayStudents();


        // Open student list
        showSection("students");

    });


// ========================================
// 5. DELETE STUDENT
// ========================================

function deleteStudent(registerNo) {


    // Find student index
    let index =
        students.findIndex(function(student) {

            return student.registerNo === registerNo;

        });


    // Student not found
    if (index === -1) {

        alert("Student not found.");

        return;

    }


    // Confirmation message
    let confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    // Delete only if user confirms
    if (confirmation) {

        students.splice(index, 1);


        alert(
            "Student deleted successfully."
        );


        // Refresh table
        displayStudents();

    }

}


// ========================================
// 6. EDIT STUDENT
// ========================================

function editStudent(registerNo) {


    // Find student
    let index =
        students.findIndex(function(student) {

            return student.registerNo === registerNo;

        });


    // Student not found
    if (index === -1) {

        alert("Student not found.");

        return;

    }


    // Get student object
    let student = students[index];


    // Ask for new name
    let newName =
        prompt(
            "Enter student name:",
            student.name
        );


    // Cancel button
    if (newName === null) {

        return;

    }


    // Ask for new email
    let newEmail =
        prompt(
            "Enter email:",
            student.email
        );


    if (newEmail === null) {

        return;

    }


    // Ask for new phone
    let newPhone =
        prompt(
            "Enter phone number:",
            student.phone
        );


    if (newPhone === null) {

        return;

    }


    // ========================================
    // VALIDATE EDITED DATA
    // ========================================

    if (

        newName.trim() === "" ||

        newEmail.trim() === "" ||

        newPhone.trim() === ""

    ) {

        alert(
            "Fields cannot be empty."
        );

        return;

    }


    // Email validation
    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(newEmail)) {

        alert(
            "Please enter a valid email address."
        );

        return;

    }


    // Phone validation
    let phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(newPhone)) {

        alert(
            "Phone number must contain exactly 10 digits."
        );

        return;

    }


    // ========================================
    // UPDATE STUDENT
    // ========================================

    student.name = newName.trim();

    student.email = newEmail.trim();

    student.phone = newPhone.trim();


    alert(
        "Student updated successfully."
    );


    // Refresh table
    displayStudents();

}


// ========================================
// 7. UPDATE DASHBOARD
// ========================================

function updateDashboard() {


    // ========================================
    // TOTAL STUDENTS
    // ========================================

    document.getElementById("totalStudents").innerText =
        students.length;


    // ========================================
    // IT
    // ========================================

    document.getElementById("itCount").innerText =
        getDepartmentCount("IT");


    // ========================================
    // CSE
    // ========================================

    document.getElementById("cseCount").innerText =
        getDepartmentCount("CSE");


    // ========================================
    // ECE
    // ========================================

    document.getElementById("eceCount").innerText =
        getDepartmentCount("ECE");


    // ========================================
    // EEE
    // ========================================

    document.getElementById("eeeCount").innerText =
        getDepartmentCount("EEE");


    // ========================================
    // MECH
    // ========================================

    document.getElementById("mechCount").innerText =
        getDepartmentCount("MECH");


    // ========================================
    // BIO-TECH
    // ========================================

    document.getElementById("biotechCount").innerText =
        getDepartmentCount("BIO-TECH");


    // ========================================
    // AIDS
    // ========================================

    document.getElementById("aidsCount").innerText =
        getDepartmentCount("AIDS");


    // ========================================
    // AIML
    // ========================================

    document.getElementById("aimlCount").innerText =
        getDepartmentCount("AIML");


    // ========================================
    // CYBER
    // ========================================

    document.getElementById("cyberCount").innerText =
        getDepartmentCount("CYBER");


    // ========================================
    // CSBS
    // ========================================

    document.getElementById("csbsCount").innerText =
        getDepartmentCount("CSBS");

}


// ========================================
// 8. DEPARTMENT COUNT FUNCTION
// ========================================

function getDepartmentCount(department) {


    // Filter students according to department
    let departmentStudents =
        students.filter(function(student) {

            return student.department === department;

        });


    // Return number of students
    return departmentStudents.length;

}


// ========================================
// 9. DARK / LIGHT THEME
// ========================================

function toggleTheme() {

    // Add or remove dark-theme class
    document.body.classList.toggle("dark-theme");


    // Get theme button
    let themeButton =
        document.querySelector(".theme-btn");


    // Change button text
    if (
        document.body.classList.contains("dark-theme")
    ) {

        themeButton.innerHTML = "☀️ Light Mode";

    } else {

        themeButton.innerHTML = "🌙 Dark Mode";

    }

}


// ========================================
// 10. INITIAL LOAD
// ========================================

// Display student table
displayStudents();


// Show dashboard when page opens
showSection("dashboard");