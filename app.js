// --- 1. BOUNTY SYSTEM LOGIC ---
// The exact tier list you provided
const bountyTiers = [
    { name: "Pirate Legend", min: 5000000000 },
    { name: "Sea Emperor", min: 3500000000 },
    { name: "Emperor Candidate", min: 2000000000 },
    { name: "Elite Captain", min: 1000000000 },
    { name: "Captain", min: 600000000 },
    { name: "Super Rookie", min: 300000000 },
    { name: "Adventurer", min: 150000000 },
    { name: "Explorer", min: 75000000 },
    { name: "Rookie Pirate", min: 30000000 },
    { name: "Deckhand", min: 10000000 },
    { name: "Cabin Boy", min: 0 }
];

// Current App State
let currentBounty = 135000000; // Starting bounty based on your mockup

function formatBounty(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateRank(bounty) {
    for (let tier of bountyTiers) {
        if (bounty >= tier.min) {
            return tier.name;
        }
    }
    return "Cabin Boy";
}

function updateBountyUI() {
    const formatted = formatBounty(currentBounty);
    const rank = calculateRank(currentBounty);
    
    // Update Chat Widget
    document.getElementById("chatBounty").innerText = formatted;
    document.getElementById("chatRank").innerText = rank;
    
    // Update Profile Poster
    document.getElementById("profileBounty").innerText = formatted;
}

// Initialize UI on load
updateBountyUI();


// --- 2. SCREEN TRANSITIONS & AUDIO FIX ---
const splash = document.getElementById("splash");
const introPlaying = document.getElementById("introPlaying");
const mainApp = document.getElementById("mainApp");
const audio = document.getElementById("introAudio");
let started = false;

// Listen for tap ANYWHERE on the splash screen
splash.addEventListener("click", () => {
    if (started) return;
    started = true;

    // Mobile audio unlock trick
    audio.load();
    audio.play().then(() => { audio.pause(); }).catch(e => console.log(e));

    // Transition to Playing screen
    splash.style.display = "none";
    introPlaying.style.display = "flex";
    
    // Play actual audio
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio blocked", e));
    
    // Mock audio wave timer (transitions to main app after 4 seconds)
    setTimeout(() => {
        introPlaying.style.display = "none";
        mainApp.style.display = "flex";
    }, 4000); // Adjust this timing based on your MP3 length
});


// --- 3. TAB NAVIGATION SYSTEM ---
const navButtons = document.querySelectorAll(".nav-item");
const tabContents = document.querySelectorAll(".tab-content");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all
        navButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(t => t.style.display = "none");
        
        // Add active class to clicked
        btn.classList.add("active");
        const targetId = btn.getAttribute("data-target");
        document.getElementById(targetId).style.display = "flex";
    });
});


// --- 4. CHAT LOGIC ---
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("chatMessages");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender === "brook" ? "brook-msg" : "user-msg";
    div.innerText = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
        addMessage("YOHOHOHOHO! That sounds like an adventure!", "brook");
    }, 800);
}

sendBtn.addEventListener("click", handleSend);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
});
