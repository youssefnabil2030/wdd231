const courses = [
  {
    id: "WDD130",
    name: "Web Fundamentals",
    credits: 3,
    subject: "WDD",
    completed: true,
    description: "Introduction to web design and development"
  },
  {
    id: "WDD230",
    name: "Web Frontend Development I",
    credits: 3,
    subject: "WDD",
    completed: true,
    description: "Advanced HTML, CSS, and JavaScript"
  },
  {
    id: "WDD330",
    name: "Web Frontend Development II",
    credits: 3,
    subject: "WDD",
    completed: false,
    description: "Advanced JavaScript and frameworks"
  },
  {
    id: "CSE121B",
    name: "JavaScript Language",
    credits: 3,
    subject: "CSE",
    completed: true,
    description: "JavaScript programming fundamentals"
  },
  {
    id: "CSE210",
    name: "Programming with Classes",
    credits: 3,
    subject: "CSE",
    completed: false,
    description: "Object-oriented programming concepts"
  }
];

// Initialize the application
function init() {
  setupSubjectFilter();
  updateCourseList();
  updateFooter();
}

// Set up subject filter buttons
function setupSubjectFilter() {
  const subjects = [...new Set(courses.map(course => course.subject))];
  const filterContainer = document.getElementById('subject-filter');
  
  subjects.forEach(subject => {
    const button = document.createElement('button');
    button.className = 'filter-btn';
    button.textContent = subject;
    button.dataset.subject = subject;
    filterContainer.appendChild(button);
  });

  filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      updateCourseList(e.target.dataset.subject);
    }
  });
}

// Update course list based on selected subject
function updateCourseList(selectedSubject = 'all') {
  const courseList = document.getElementById('course-list');
  const filteredCourses = selectedSubject === 'all' 
    ? courses 
    : courses.filter(course => course.subject === selectedSubject);

  courseList.innerHTML = filteredCourses.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <div class="course-header">
        <div class="course-title">
          <h3>${course.id}</h3>
          <p>${course.name}</p>
        </div>
        ${course.completed ? `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-circle" style="color: var(--color-green-500)">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        ` : `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="circle" style="color: var(--color-gray-400)">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        `}
      </div>
      <p class="course-description">${course.description}</p>
      <div class="course-meta">
        <span>Credits: ${course.credits}</span>
        <span>Subject: ${course.subject}</span>
      </div>
    </div>
  `).join('');

  updateTotalCredits(filteredCourses);
}

// Update total credits
function updateTotalCredits(filteredCourses) {
  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById('total-credits').textContent = totalCredits;
}

// Update footer with current year and last modified date
function updateFooter() {
  const currentYear = new Date().getFullYear();
  const lastModified = new Date(document.lastModified).toLocaleDateString();
  
  document.getElementById('current-year').textContent = currentYear;
  document.getElementById('last-modified').textContent = lastModified;
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

