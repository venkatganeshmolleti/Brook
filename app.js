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

    // Play intro audio
    audio.play();

    // Fade Brook away
    brook.classList.add("fade");

    // Show intro text after fade
    setTimeout(() => {

        splash.style.display = "none";
        intro.style.display = "flex";

    }, 1500);

    // When audio ends
    audio.onended = () => {

        intro.style.display = "none";

        loading.style.display = "flex";

        setTimeout(() => {

            loading.style.display = "none";

            chat.style.display = "flex";

        }, 1800);

    };

});
