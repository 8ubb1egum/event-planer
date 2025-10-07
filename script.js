// Gruppe: Bennebach, Gertje, Doberstein, Kraus, Öz

const form = document.getElementById('event-form'); // für Event-Listener
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const descrInput = document.getElementById('description');
const eventList = document.getElementById('events-list');
const sortSelect = document.getElementById('sort-select'); // aktuell ausgewählte Sortierung

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

    
    // Daten-Attribute für Sortierung und Suche speichern
    li.dataset.title = title;
    li.dataset.date = date;
    li.dataset.descr = descr;

    eventList.appendChild(li);

    // <p>-Tag "Keine Events" entfernen
    const noEvents = document.getElementById('no-events');
    if (noEvents)
        noEvents.remove();

    // Sortierung nach aktuellem Auswahlwert
    let sortValue = sortSelect.value; 
    sortEvents(sortValue);

    form.reset();
});


// Sortieren je nachdem, welche Sortierung ausgewählt wurde
sortSelect.addEventListener('change', function() {
    let curSel = this.value;
    sortEvents(curSel);
});


function sortEvents(curSel) {
    let list = document.getElementById('events-list');
    let eventItems = Array.from(list.querySelectorAll('li'));

    eventItems.sort((a, b) => {
        let dateA = a.dataset.date;
        let dateB = b.dataset.date;
        let titleA = a.dataset.title.toLowerCase();
        let titleB = b.dataset.title.toLowerCase();

        switch(curSel) {
        case "date-asc":    // Datum aufsteigend
            return dateA.localeCompare(dateB);
        case "date-desc":   // Datum absteigend
            return dateB.localeCompare(dateA);
        case "title-asc":   // Titel A-Z
            return titleA.localeCompare(titleB);
        case "title-desc":  // Titel Z-A
            return titleB.localeCompare(titleA);
        default:
            return 0;
        }
    });

    // sortierte Items neu anhängen
    list.innerHTML = "";
    eventItems.forEach(item => list.appendChild(item));
}