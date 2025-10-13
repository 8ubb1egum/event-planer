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

    // Date-Objekt erstellen und deutsches Kurzformat ausgeben
    let dateObj = new Date(date);
    let dateFormatted = dateObj.toLocaleDateString("de-DE");

    // Event in der <ul> als <li> einfügen
    const li = document.createElement('li');
    li.innerHTML = `
        <span style="font-size:1.2em"><strong>${title}</strong></span><br>
        <strong>Datum: </strong>${dateFormatted}<br>
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

// Suchfeld referenzieren
const searchInput = document.getElementById('search-input');

// Wenn sich der Eingabetext ändert, Suche ausführen
searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    const list = document.getElementById('events-list');
    const items = list.querySelectorAll('li');
    let anyVisible = false;

    items.forEach(li => {
        const title = li.dataset.title.toLowerCase();
        const descr = li.dataset.descr.toLowerCase();
        const date = li.dataset.date.toLowerCase();

        // prüfen, ob Suchbegriff vorkommt (in Titel, Beschreibung oder Datum)
        if (title.includes(query) || descr.includes(query) || date.includes(query)) {
            li.style.display = '';   // sichtbar
            anyVisible = true;
        } else {
            li.style.display = 'none'; // ausblenden
        }
    });

    // Falls keine Treffer sichtbar sind, eine Meldung anzeigen
    const existingMsg = document.getElementById('no-results');
    if (existingMsg) existingMsg.remove();

    if (!anyVisible && query !== '') {
        const msg = document.createElement('p');
        msg.id = 'no-results';
        msg.textContent = 'Keine passenden Events gefunden.';
        msg.style.color = 'gray';
        msg.style.fontStyle = 'italic';
        msg.style.marginTop = '10px';
        list.insertAdjacentElement('afterend', msg);
    }
});