let timerId;
let start;
let current;
let session = 25;
let relax = 5;
let screen = document.querySelector('.screen')
let setTime = document.querySelector('#setTime')
let breakTime = document.querySelector('#breakTime')
let sessionPlusBtn = document.querySelector('.sessionPlusBtn')
let sessionMinusBtn = document.querySelector('.sessionMinusBtn')
let breakPlusBtn = document.querySelector('.breakPlusBtn')
let breakMinusBtn = document.querySelector('.breakMinusBtn')
let button1=document.getElementById('button1')
let reset = document.querySelector('.reset')

sessionPlusBtn.addEventListener('click', addSession)
sessionMinusBtn.addEventListener('click',subSession)
breakPlusBtn.addEventListener('click',addBreak)
breakMinusBtn.addEventListener('click',subBreak)
button1.addEventListener('click',startFunction)
reset.addEventListener('click',resetFunction)


let progressCircle = new ProgressBar.Circle('#circle', {
    strokeWidth: 3,
    duration: session * 60000, //25*60000 sec
    color: '#21abe9',
    trailColor: '#f4f4f4',
    trailWidth: 1,
    svgStyle: null,
});



window.onload = function () {
    screen.innerHTML = '<p style="font-size: 30px;">Start</p>' + session
    setTime.innerHTML = session
    breakTime.innerHTML = relax
    /*
    $('.screen').html('<p style="font-size: 30px;">Start</p>' + session);
    $('#setTime').html(session);
    $('#breakTime').html(relax);*/
};

function addSession() {
    if (session < 61) {
        session++;
        setTime.innerHTML = session
        screen.innerHTML = session
    }
}

function subSession() {
    if (session > 0) {
        session--;
        setTime.innerHTML = session
        screen.innerHTML = session
    }
}

function addBreak() {
    if (relax < 61) {
        relax++;
        breakTime.innerHTML = relax
    }
}

function subBreak() {
    if (relax > 0) {
        relax--;
        breakTime.innerHTML = relax
    }
}
// pomodor clock ******
//**********************

function pomodoro(from, to) {
    current = from;

    timerId = setInterval(function () {

        let time = function (x) {
            let minutes = Math.floor(x / 60000);
            let seconds = ((x % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        screen.style.color = "#4c4c4c";
        screen.innerHTML = (time(current));

        if (current == to) {
            progressCircle.set(0);
            clearInterval(timerId);
            breakPomodoro(relax * 60000, 0);
        }
        current -= 1000;
    }, 1000);
    progressCircle.animate(1, {
        duration: session * 60000,
    });
}
//----------------------------------------------------------
function breakPomodoro(from, to) {

    current = from;

    timerId = setInterval(function () {

        let time = function (x) {
            let minutes = Math.floor(x / 60000);
            let seconds = ((x % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
        screen.style.color = "#45a02b";
        screen.innerHTML = `<p style="font-size: 30px;"> Break! </p>` + time(current);

        if (current == to) {
            progressCircle.set(0);
            clearInterval(timerId);
            pomodoro(session * 60000, 0);
        }
        current -= 1000;
    }, 1000);
    progressCircle.animate(1, {
        duration: relax * 60000,
        color: '#44db29',
    });
}
// end of pomodoro clock ****
//***************************

function startFunction() {

    start = session * 60000;
    pomodoro(start, 0);
    document.getElementById("button1").disabled = true;

}

function resetFunction() {
    clearInterval(timerId);
    screen.innerHTML= session;
    progressCircle.set(0);
    current = null;
    document.getElementById("button1").disabled = false;
}