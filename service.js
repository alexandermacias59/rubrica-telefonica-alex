const baseUrl = "https://6941164f686bc3ca81659153.mockapi.io/api/v1/contacts";

export function getAllContacts() {
    const apiUrl = baseUrl;

    return fetch(apiUrl)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error('Aiuuutoooo!', error));
}

export function getContact(id) {
    const apiUrl = baseUrl + "/" + id;

    return fetch(apiUrl)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error('Aiuuutoooo!', error));
}

export function deleteContact(id) {

    const apiUrl = baseUrl + "/" + id;

    return fetch(apiUrl, {method: 'DELETE'})
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error('Aiuuutoooo!', error))
}

export function updateContact(id, updatedContact) {
    const apiUrl = `${baseUrl}/${id}`;

    return fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedContact)
    })
    .then(response => response.json())
    .catch(error => console.error("Errore update:", error));
}

export function createContact(newContact) {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .catch(error => console.error("Errore creazione contatto:", error));
}
