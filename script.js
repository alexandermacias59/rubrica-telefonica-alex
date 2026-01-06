import { getAllContacts, createContact, updateContact, deleteContact } from "./service.js";

const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");
const sortButton = document.getElementById("sort-btn");
const newContactButton = document.getElementById("new-contact-btn");
const cardContainer = document.getElementById("card-container");


let allContacts = [];


function displayCard(contacts) {
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
                <span>${contact.name}</span>
                <span>${contact.lastName}</span>
                <span>${contact.phoneNumber}</span>
            </div>
        `;

        // DELETE
        card.querySelector(".delete-btn")
            .addEventListener("click", () => handleDelete(contact.id));

        // MODIFY
        card.querySelector(".modify-btn")
            .addEventListener("click", () => handleModify(contact));

        cardContainer.appendChild(card);
    }
}


getAllContacts().then(contacts => {
    allContacts = contacts;
    displayCard(allContacts);
});

/* ricerca contatto*/
function handleSearch() {
    const value = searchInput.value.toLowerCase().trim();

    if (value === "") {
        displayCard(allContacts);
        return;
    }

    const filtered = allContacts.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.lastName.toLowerCase().includes(value) ||
        c.phoneNumber.includes(value)
    );

    displayCard(filtered);
}

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
});

/* ordine alfabetico*/
function orderByName() {
    const sorted = [...allContacts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    displayCard(sorted);
}

if (sortButton) {
    sortButton.addEventListener("click", orderByName);
}

/* aggiungi*/
function handleCreateContact() {
    const name = prompt("Nome:");
    if (!name) return;

    const lastName = prompt("Cognome:");
    if (!lastName) return;

    const phoneNumber = prompt("Telefono:");
    if (!phoneNumber) return;

    const newContact = {
        name: name.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim()
    };

    createContact(newContact).then(created => {
        allContacts.push(created);
        displayCard(allContacts);
    });
}

if (newContactButton) {
    newContactButton.addEventListener("click", handleCreateContact);
}

/* modifica contatto*/
function handleModify(contact) {
    const name = prompt("Nome:", contact.name);
    if (name === null) return;

    const lastName = prompt("Cognome:", contact.lastName);
    if (lastName === null) return;

    const phoneNumber = prompt("Telefono:", contact.phoneNumber);
    if (phoneNumber === null) return;

    const updatedContact = {
        name: name.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim()
    };

    updateContact(contact.id, updatedContact).then(updated => {
        allContacts = allContacts.map(c =>
            c.id === contact.id ? updated : c
        );
        displayCard(allContacts);
    });
}

/* elimina contatto*/
function handleDelete(contactId) {
    const confirmDelete = confirm("Vuoi eliminare il contatto?");
    if (!confirmDelete) return;

    deleteContact(contactId).then(() => {
        allContacts = allContacts.filter(c => c.id !== contactId);
        displayCard(allContacts);
    });
}


