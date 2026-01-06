import { getAllContacts, deleteContact } from "./service.js";

const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");
const sortButton = document.getElementById("sort-btn");

let allContacts = [];

/* =========================
   RENDER CONTATTI
========================= */
function displayCard(contacts) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    if (contacts.length === 0) {
        cardContainer.textContent = "Nessun contatto trovato";
        return;
    }

    for (const contact of contacts) {
        const card = document.createElement("div");
        card.classList.add("contact-card");

        card.innerHTML = `
            <div class="contact-actions">
                <button class="delete-btn">-</button>
                <button class="modify-btn">+</button>
            </div>
            <div class="contact-info">
                <span>Nome: ${contact.name}</span>
                <span>Cognome: ${contact.lastName}</span>
                <span>Telefono: ${contact.phoneNumber}</span>
            </div>
        `;

        // DELETE
        const deleteBtn = card.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            handleDelete(contact.id);
        });

        cardContainer.appendChild(card);
    }
}

/* =========================
   FETCH INIZIALE
========================= */
getAllContacts().then(contacts => {
    allContacts = contacts;
    displayCard(allContacts);
});

/* =========================
   RICERCA
========================= */
function handleSearch() {
    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue === "") {
        displayCard(allContacts);
        return;
    }

    const filteredContacts = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue) ||
        contact.lastName.toLowerCase().includes(searchValue) ||
        contact.phoneNumber.includes(searchValue)
    );

    displayCard(filteredContacts);
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});


/* =========================
   ORDINAMENTO A–Z
========================= */
function orderByName() {
    const sortedContacts = [...allContacts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    displayCard(sortedContacts);
}

if (sortButton) {
    sortButton.addEventListener("click", orderByName);
}

/* =========================
   DELETE CONTATTO
========================= */
function handleDelete(contactId) {
    const confirmDelete = confirm("Vuoi eliminare il contatto?");

    if (!confirmDelete) return;

    deleteContact(contactId).then(() => {
        allContacts = allContacts.filter(c => c.id !== contactId);
        displayCard(allContacts);
    });
}
