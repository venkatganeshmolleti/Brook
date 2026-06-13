const brook = document.getElementById("brookCharacter");
const splash = document.getElementById("splash");
const intro = document.getElementById("intro");
const loading = document.getElementById("loading");
const chat = document.getElementById("chat");
const audio = document.getElementById("introAudio");

let started = false;

brook.addEventListener("click", () => {

    if(started) return;
    started = true;

    // Blur Brook but keep him visible
    brook.classList.add("fade");

    // Show intro screen over splash
    setTimeout(() => {

        intro.style.display = "flex";

        audio.play();

    }, 800);

    // Audio finished
    audio.onended = () => {

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.style.display = "none";

            loading.style.display = "flex";

        }, 600);

        setTimeout(() => {

            splash.style.display = "none";

            loading.style.display = "none";

            chat.style.display = "flex";

        }, 2600);

    };

});
