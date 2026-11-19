
const messages = [
    ["🌷", "You are special", "You make every day brighter. Never forget how special you are."],
    ["😂", "Drama Queen", "Your drama deserves an Oscar award!"],
    ["💗", "My Best Friend", "You will always be my favourite person."],
    ["🐱", "Cat Message", "Meow! Didi is the cutest human ever!"],
    ["✨", "Keep Shining", "Never stop following your dreams."],
    ["🎂", "Cake Time", "Today you can eat unlimited cake!"],
    ["🤗", "Virtual Hug", "Sending you the biggest hug ever!"],
    ["🌈", "My Wish", "May all your beautiful dreams come true."],
    ["😹", "Breaking News", "Didi gets more beautiful every year!"],
    ["🫶", "Thank You", "Thank you for being my wonderful sister."],
    ["🎁", "Your Gift", "A lifetime supply of love and happiness!"],
    ["💐", "You Deserve", "You deserve all the happiness in the world."],
    ["🐾", "Paw Promise", "I will always be there for you."],
    ["🥹", "Remember", "You are loved more than words can explain."],
    ["🎉", "Party Time", "Today is your day! Enjoy every second."],
    ["❤️", "Secret Message", "I am lucky to have you as my Didi. Love you forever!"]
];

const grid = document.getElementById("surpriseGrid");

messages.forEach((message, index) => {

    const button = document.createElement("button");

    button.className = "surprise";

    button.innerHTML = `
        <span>💌</span>
        Secret ${index + 1}
    `;

    button.onclick = function() {
        openMessage(message);
    };

    grid.appendChild(button);

});

function openMessage(message) {

    document.getElementById("modalEmoji").innerText = message[0];

    document.getElementById("modalTitle").innerText = message[1];

    document.getElementById("modalText").innerText = message[2];

    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function startSurprise() {

    document.getElementById("message").classList.remove("hidden");

    document.getElementById("message").scrollIntoView({
        behavior: "smooth"
    });

    confettiBurst();
}

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function confettiBurst() {

    for (let i = 0; i < 40; i++) {

        const item = document.createElement("div");

        item.innerText = ["💗", "🎉", "✨", "🎀", "🐾"][
            Math.floor(Math.random() * 5)
        ];

        item.style.position = "fixed";
        item.style.left = Math.random() * 100 + "vw";
        item.style.top = "-30px";
        item.style.fontSize = "25px";
        item.style.zIndex = "100";

        document.body.appendChild(item);

        const x = (Math.random() - 0.5) * 180;

        item.animate([
            { transform: "translateY(0)" },
            { transform: `translate(${x}px, 100vh) rotate(500deg)` }
        ], {
            duration: 2500,
            easing: "ease-out"
        });

        setTimeout(() => item.remove(), 2600);
    }
}

// Birthday music toggle
let audioContext;
let oscillator;
let playing = false;

document.getElementById("musicBtn").onclick = function() {

    if (!playing) {

        audioContext = new AudioContext();

        oscillator = audioContext.createOscillator();

        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 523;

        gain.gain.value = 0.025;

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        playing = true;

        this.innerText = "♫ Music On";

    } else {

        oscillator.stop();

        audioContext.close();

        playing = false;

        this.innerText = "♫ Music Off";
    }
};
