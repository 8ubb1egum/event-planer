// Gruppe: Bennebach, Gertje, Doberstein, Kraus, Öz auch bekannt als die SLAYER

const form = document.getElementById('event-form'); // für Event-Listener
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const descrInput = document.getElementById('description');
const eventList = document.getElementById('events-list');

// auf Form Submit reagieren
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Neuladen vermeiden

    // Event-Objekt erzeugen
    let title = titleInput.value;
    let date = dateInput.value;
    let descr = descrInput.value;
    let newEvent = {title, date, descr};

    // Event in der <ul> als <li> einfügen
    const li = document.createElement('li');
    li.innerHTML = `
        <span style="font-size:1.2em"><strong>${title}</strong></span><br>
        <strong>Datum: </strong>${date}<br>
        ${descr}
    `;
    eventList.appendChild(li);
    form.reset();
});