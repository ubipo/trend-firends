
const DAY_ABRV = ["ma", "di", "wo", "do", "vr", "za", "zo"];

function cMod(a, n) {
    return ((a % n) + n) % n;
}

function parseJCalEvents(jCalEvents) {
    let events = [];
    for (let jCalEvent of jCalEvents) {
        let event = new ICAL.Event(jCalEvent);
        events.push({
            title: event.summary,
            date: event.startDate.toJSDate()
        });
    }
    return events;
}


function initKalender() {
    let eEventList = document.querySelector("#evenementen-lijst");

    console.log("\nSending request...");

    const req = new XMLHttpRequest();
    const url = "https://863uezdudj.execute-api.eu-west-1.amazonaws.com/prod";
    req.open("GET", url);
    req.send();
    req.addEventListener('load', e => {
        let iCalData = req.responseText;
        let jCalData = ICAL.parse(iCalData);
        let comp = new ICAL.Component(jCalData);
        let jCalEvents = comp.getAllSubcomponents('vevent');

        let events = parseJCalEvents(jCalEvents);

        events.sort((a, b) => a.date - b.date);
        let now = new Date();
        events = events.filter(a => a.date >= now);

        for (let event of events) {
            let date = event.date;
            let dayAbrv = DAY_ABRV[cMod(date.getDay() - 1, 7)];
            dayAbrv = dayAbrv.charAt(0).toUpperCase() + dayAbrv.slice(1);
            let dateStr = `${dayAbrv} ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} om ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;

            let eEvent = document.createElement("li");
            let eEventName = document.createElement("h4");
            eEventName.textContent = event.title;
            let eEventDate = document.createElement("p");
            eEventDate.textContent = dateStr;
            eEvent.appendChild(eEventName);
            eEvent.appendChild(eEventDate);

            // console.log(event.startDate.toJSDate().toString());
            // console.log(`Event:  from `);
            eEventList.appendChild(eEvent);
        }
    });
}

window.addEventListener("load", _ => {
    initKalender();
});

if (document.readyState === "complete") {
    initKalender();
}
