document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        { id: 1, name: "Algebra", subject: "math", credits: 3, completed: true },
        { id: 2, name: "Physics", subject: "science", credits: 4, completed: false },
        { id: 3, name: "Biology", subject: "science", credits: 3, completed: false },
        { id: 4, name: "Calculus", subject: "math", credits: 5, completed: true }
    ];

    const coursesContainer = document.getElementById("courses");
    const filterDropdown = document.getElementById("filter");
    const creditCount = document.getElementById("credit-count");

    function displayCourses(filter = "all") {
        coursesContainer.innerHTML = "";
        const filteredCourses = courses.filter(course => filter === "all" || course.subject === filter);
        
        filteredCourses.forEach(course => {
            const courseElement = document.createElement("div");
            courseElement.classList.add("course");
            if (course.completed) courseElement.classList.add("completed");

            courseElement.innerHTML = `
                <h3>${course.name}</h3>
                <p>Subject: ${course.subject}</p>
                <p>Credits: ${course.credits}</p>
            `;

            coursesContainer.appendChild(courseElement);
        });

        updateCredits(filteredCourses);
    }

    function updateCredits(filteredCourses) {
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditCount.textContent = totalCredits;
    }

    filterDropdown.addEventListener("change", () => displayCourses(filterDropdown.value));

    displayCourses();

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
