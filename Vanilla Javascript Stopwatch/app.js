var time = 0; //in centiSeconds
var timeObj = {minutes: '00', seconds: '00', centiSeconds: '00'};
var interval_watch;
var clockRunning = false;
var laps = [];
laps.push({minutes:"00", seconds:"00", centiSeconds:"00"});

function toggleStopWatch() {
    console.log("Toggling stopwatch...");

    if(clockRunning == false) {
        interval_watch = setInterval(runClock, 10);
        clockRunning = true;
    }
    else {
        stopClock();
    }
}

function stopClock() {
    clearInterval(interval_watch);
    clockRunning=false;
}

function runClock() {
    convertToTime(time);
    timeMsg = timeObj.minutes + ":" + timeObj.seconds + ":" + timeObj.centiSeconds;
    time++;
    document.getElementById("stop-watch-text").innerHTML=timeMsg;
}

function triggerLap() {
    console.log("Lapping...");


    console.log(timeObj);
    var lap = { ...timeObj};

    laps.push(lap);

    addLapToHTML(lap);
    console.log(laps);
}

function addLapToHTML(lap) {
    var elemIndex = laps.length-2;
    var elemId = elemIndex.toString() + "lap";
    
    var elem = document.createElement("li");
    elem.setAttribute("class", "list-group-item");
    elem.setAttribute("id", elemId);
    elem.setAttribute("style", "font-size:1.2em")
    elem.innerHTML = lap.minutes + ":" + lap.seconds + ":" + lap.centiSeconds;

    var prevMinLap = parseInt(laps[laps.length-2].minutes);
    var prevSecLap = parseInt(laps[laps.length-2].seconds);
    var prevCentiSecLap = parseInt(laps[laps.length-2].centiSeconds);

    console.log("prevMinLap: " + prevMinLap + "\nprevSecLap: " + prevSecLap + "\nprevCentiSecLap: " + prevCentiSecLap);

    // LAP DIFFERNCE CALCULATION

    var lapDiffMinutes = parseInt(lap.minutes) - prevMinLap;
    var lapDiffSeconds = parseInt(lap.seconds) - prevSecLap;
    var lapDiffCentiSeconds = parseInt(lap.centiSeconds) - prevCentiSecLap;

    if(lapDiffCentiSeconds < 0) {
        lapDiffCentiSeconds = 100 + lapDiffCentiSeconds;
        lapDiffSeconds--;
    }

    if(lapDiffSeconds < 0) {
        lapDiffSeconds = 100 + lapDiffSeconds;
        lapDiffMinutes--;
    }

    // END LAP DIFFERNCE CALCULATION

    console.log("TEST -> " + lapDiffMinutes + ":" + lapDiffSeconds + ":" + lapDiffCentiSeconds);

    var lapDiffMsg = "+" + formatNumber(lapDiffMinutes) + ":"+formatNumber(lapDiffSeconds) + ":" + formatNumber(lapDiffCentiSeconds);

    var lapDiffElem = document.createElement("span");
    lapDiffElem.setAttribute("class", "badge badge-dark float-right");
    lapDiffElem.setAttribute("style", "font-size:1.2em");
    lapDiffElem.innerHTML = lapDiffMsg;
    elem.appendChild(lapDiffElem);

    document.getElementById("lap-list").insertBefore(elem, document.getElementById("lap-list").childNodes[0]);
}

function calculateDiff(prevLap, lap) {

    console.log(typeof prevLap.minutes);
    lapDiffMinutes = parseInt(lap.minutes) - prevLap.prevMin;
    lapDiffSeconds = parseInt(lap.seconds) - prevLap.prevSec;
    lapDiffCentiSeconds = parseInt(lap.centiSeconds) - prevLap.prevCentiSec;
    
    return formatNumber(lapDiffMinutes) + ":" + formatNumber(lapDiffSeconds) + ":" + formatNumber(lapDiffCentiSeconds);
}


function convertToTime(numCentiSeconds) {
    
    timeObj.centiSeconds = formatNumber(numCentiSeconds%100);
    timeObj.seconds = formatNumber((Math.floor(numCentiSeconds/100)%60));
    timeObj.minutes = formatNumber((Math.floor(timeObj.minutes/60)%60));
}

function formatNumber(num) {
    return num.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}

function resetStopWatch() {
    console.log("Reset Stopwatch");
    document.getElementById("stop-watch-text").innerHTML="00:00:00";
    time = 0;
    timeObj.minutes = '00';
    timeObj.seconds = '00';
    timeObj.centiSeconds = '00';

    if(clockRunning) {
        stopClock();
    }

    removeLapsFromHTML();

    laps = [];
    laps.push({minutes:"00", seconds:"00", centiSeconds:"00"});
}

function removeLapsFromHTML() {
    var list = document.getElementById("lap-list");
    while(list.childNodes.length != 0) {
        list.removeChild(list.childNodes[0]);
    }

}