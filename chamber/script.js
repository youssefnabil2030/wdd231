// Fixing script.js

document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.getElementById("directory");
    const toggleButton = document.getElementById("toggleView");

    async function fetchMembers() {
        try {
            const response = await fetch("chamber/members.json"); // Fixed path
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <img src="chamber/images/${member.image}" alt="${member.name}">
            `;
            directory.appendChild(card);
        });
    }

    toggleButton.addEventListener("click", () => {
        directory.classList.toggle("list-view");
    });

    fetchMembers();

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});


// Fixing styles.css (Adding missing list-view styles)
const styles = `
.list-view {
    display: flex;
    flex-direction: column;
}
.list-view .card {
    display: block;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
