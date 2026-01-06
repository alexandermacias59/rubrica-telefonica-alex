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
// fetch('https://PROJECT_TOKEN.mockapi.io/tasks', {
//   method: 'GET',
//   headers: {'content-type':'application/json'},
// }).then(res => {
//   if (res.ok) {
//       return res.json();
//   }
//   // handle error
// }).then(tasks => {
//   // Do something with the list of tasks
// }).catch(error => {
//   // handle error
// })