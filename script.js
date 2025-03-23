document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.getElementById("directory");
    const toggleButton = document.getElementById("toggleView");

    async function fetchMembers() {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
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
                <img src="images/${member.image}" alt="${member.name}">
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
