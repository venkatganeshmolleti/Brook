const brook = document.getElementById("brookCharacter");
const splash = document.getElementById("splash");
const intro = document.getElementById("intro");
const loading = document.getElementById("loading");
const chat = document.getElementById("chat");
const audio = document.getElementById("introAudio");
const skipIntro = document.getElementById("skipIntro");
let started = false;

brook.addEventListener("click", () => {

    if(started) return;
    started = true;

    brook.classList.add("fade");

    document.querySelector(".brook-title").classList.add("fade");
    document.querySelector(".tap-text").classList.add("fade");

    setTimeout(() => {

        intro.style.display = "flex";

        audio.play();

    }, 100);

    audio.onended = () => {

        intro.style.display = "none";

        loading.style.display = "flex";

        setTimeout(() => {

            splash.style.display = "none";

            loading.style.display = "none";

            chat.style.display = "flex";

        }, 2000);

    };

});

/* ========================= */
/* BROOK CHAT BOT */
/* ========================= */

const input = document.querySelector(".composer input");
const button = document.querySelector(".composer button");
const messages = document.querySelector(".messages");

function addMessage(text, sender){

    const div = document.createElement("div");

    div.className =
        sender === "brook"
        ? "brook-msg"
        : "user-msg";

    div.innerText = text;

    messages.appendChild(div);

    messages.scrollTop =
        messages.scrollHeight;
}

function brookReply(text){

    text = text.toLowerCase();

    if(text.includes("hi") || text.includes("hello")){

        return "YOHOHOHOHO! Greetings Captain!";

    }

    if(text.includes("who are you")){

        return "I am Brook, musician of the Straw Hat Pirates!";

    }

    if(text.includes("music")){

        return "Music is the language of the soul! YOHOHOHOHO!";

    }

    if(text.includes("one piece")){

        return "The One Piece awaits somewhere on the Grand Line!";

    }

    return "YOHOHOHOHO! I am still learning, Captain!";
}

function sendMessage(){

    const text = input.value.trim();

    if(!text) return;

    addMessage(text,"user");

    input.value = "";

    setTimeout(() => {

        addMessage(
            brookReply(text),
            "brook"
        );

    },700);
}

button.addEventListener(
    "click",
    sendMessage
);

input.addEventListener(
    "keydown",
    e => {

        if(e.key==="Enter"){
            sendMessage();
        }

    }
);
skipIntro.addEventListener("click", () => {

    audio.pause();
    audio.currentTime = 0;

    intro.style.display = "none";
    splash.style.display = "none";

    chat.style.display = "flex";

});
