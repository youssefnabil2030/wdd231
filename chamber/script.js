// Updated script.js with professional web design approach

document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.getElementById("directory");
    const toggleButton = document.getElementById("toggleView");

    async function fetchMembers() {
        try {
            const response = await fetch("chamber/members.json");
            if (!response.ok) throw new Error("Failed to load data");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
            directory.innerHTML = "<p class='error'>Unable to load directory. Please try again later.</p>";
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="card-header">
                    <h2>${member.name}</h2>
                </div>
                <div class="card-body">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank" class="button">Visit Website</a>
                </div>
                <div class="card-footer">
                    <img src="chamber/images/${member.image}" alt="${member.name}">
                </div>
            `;
            directory.appendChild(card);
        });
    }

    toggleButton.addEventListener("click", () => {
        directory.classList.toggle("list-view");
        toggleButton.textContent = directory.classList.contains("list-view") ? "Switch to Grid View" : "Switch to List View";
    });

    fetchMembers();

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});

// Improved styles for a professional design
document.head.insertAdjacentHTML("beforeend", `
<style>
    .card {
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        background: white;
        transition: transform 0.3s ease-in-out;
    }
    .card:hover {
        transform: translateY(-5px);
    }
    .card-header {
        background: #0073e6;
        color: white;
        padding: 1rem;
        text-align: center;
    }
    .card-body {
        padding: 1rem;
        text-align: left;
    }
    .card-footer {
        text-align: center;
        padding: 1rem;
    }
    .button {
        display: inline-block;
        padding: 10px 15px;
        background: #0073e6;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        transition: background 0.3s ease;
    }
    .button:hover {
        background: #005bb5;
    }
    .list-view .card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
</style>
`);
