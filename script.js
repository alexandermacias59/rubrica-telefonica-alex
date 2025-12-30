
function displayCard(contacts){

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML= "";
    for (const contact of contacts) {

        const card = document.createElement("div");
        card.classList.add("contact-card");

        const firstName = document.createElement("span");
        firstName.appendChild(document.createTextNode(contacts.name));

        const lastName = document.createElement("span");
        lastName.appendChild(document.createTextNode(contacts.lastName));

        const phoneNumber = document.createElement("span");
        phoneNumber.appendChild(document.createTextNode(contacts.phoneNumber));

        cardContainer.appendChild(card);
    }
}