const teams = [
    "Manchester City", "Liverpool", "Arsenal", "Manchester United", "Chelsea",
    "Real Madrid", "Barcelona", "Atlético Madrid", "Athletic Bilbao", "Villarreal",
    "Bayern Münih", "Borussia Dortmund", "Bayer Leverkusen", "RB Leipzig", "Eintracht Frankfurt",
    "Inter", "Milan", "Juventus", "Napoli", "Roma",
    "PSG", "Marseille", "Monaco", "Lyon", "Lille",
    "Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor", "Başakşehir",
    "Kocaelispor", "Kasımpaşa", "Göztepe", "Siirt Jetpa", "Metz", "Hoffenheim"
];

const teamDomains = {
    "Manchester City": "mancity.com",
    "Liverpool": "liverpoolfc.com",
    "Arsenal": "arsenal.com",
    "Manchester United": "manutd.com",
    "Chelsea": "chelseafc.com",
    "Real Madrid": "realmadrid.com",
    "Barcelona": "fcbarcelona.com",
    "Atlético Madrid": "atleticodemadrid.com",
    "Athletic Bilbao": "athletic-club.eus",
    "Villarreal": "villarrealcf.es",
    "Bayern Münih": "fcbayern.com",
    "Borussia Dortmund": "bvb.de",
    "Bayer Leverkusen": "bayer04.de",
    "RB Leipzig": "rbleipzig.com",
    "Eintracht Frankfurt": "eintracht.de",
    "Inter": "inter.it",
    "Milan": "acmilan.com",
    "Juventus": "juventus.com",
    "Napoli": "sscnapoli.it",
    "Roma": "asroma.com",
    "PSG": "psg.fr",
    "Marseille": "om.fr",
    "Monaco": "asmonaco.com",
    "Lyon": "ol.fr",
    "Lille": "losc.fr",
    "Galatasaray": "galatasaray.org",
    "Fenerbahçe": "fenerbahce.org",
    "Beşiktaş": "bjk.com.tr",
    "Trabzonspor": "trabzonspor.org.tr",
    "Başakşehir": "ibfk.com.tr",
    "Kocaelispor": "kocaelispor.com.tr",
    "Kasımpaşa": "kasimpasa.com.tr",
    "Göztepe": "goztepe.org.tr",
    "Siirt Jetpa": "tff.org", 
    "Metz": "fcmetz.com",
    "Hoffenheim": "tsg-hoffenheim.de"
};

let emirhanScore = 0;
let emirScore = 0;
let countdownInterval;

const startScreen = document.getElementById('start-screen');
const countdownScreen = document.getElementById('countdown-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const countdownNumber = document.getElementById('countdown-number');
const team1Name = document.getElementById('team1-name');
const team2Name = document.getElementById('team2-name');
const team1Logo = document.getElementById('team1-logo');
const team2Logo = document.getElementById('team2-logo');
const scoreEmirhan = document.getElementById('score-emirhan');
const scoreEmir = document.getElementById('score-emir');
const topBar = document.querySelector('.top-bar');

function showScreen(screen) {
    startScreen.classList.remove('active');
    countdownScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    
    if (screen === startScreen) {
        topBar.style.display = 'flex';
    } else {
        topBar.style.display = 'none';
    }
    
    if(screen === countdownScreen) {
        countdownNumber.style.animation = 'none';
        countdownNumber.offsetHeight; 
        countdownNumber.style.animation = null; 
    }

    screen.classList.add('active');
}

startBtn.addEventListener('click', () => {
    startCountdown();
});

function startCountdown() {
    showScreen(countdownScreen);
    let count = 3;
    countdownNumber.innerText = count;

    countdownNumber.style.animation = 'none';
    void countdownNumber.offsetWidth;
    countdownNumber.style.animation = 'zoomPulse 1s ease-out infinite';

    countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumber.innerText = count;
            countdownNumber.style.animation = 'none';
            void countdownNumber.offsetWidth;
            countdownNumber.style.animation = 'zoomPulse 1s ease-out infinite';
        } else {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    showScreen(gameScreen);
    
    let t1Index = Math.floor(Math.random() * teams.length);
    let t2Index = Math.floor(Math.random() * teams.length);
    
    while(t1Index === t2Index) {
        t2Index = Math.floor(Math.random() * teams.length);
    }
    
    let t1 = teams[t1Index];
    let t2 = teams[t2Index];
    
    team1Name.innerText = t1;
    team2Name.innerText = t2;
    
    team1Logo.src = `https://www.google.com/s2/favicons?domain=${teamDomains[t1]}&sz=128`;
    team2Logo.src = `https://www.google.com/s2/favicons?domain=${teamDomains[t2]}&sz=128`;
    team1Logo.style.display = 'block';
    team2Logo.style.display = 'block';
}

window.awardPoint = function(player) {
    if (player === 'emirhan') {
        emirhanScore++;
        scoreEmirhan.innerText = emirhanScore;
        scoreEmirhan.style.transform = 'scale(1.5)';
        setTimeout(() => scoreEmirhan.style.transform = 'scale(1)', 300);
    } else if (player === 'emir') {
        emirScore++;
        scoreEmir.innerText = emirScore;
        scoreEmir.style.transform = 'scale(1.5)';
        setTimeout(() => scoreEmir.style.transform = 'scale(1)', 300);
    }
    showScreen(startScreen);
}

window.cancelRound = function() {
    showScreen(startScreen);
}

const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
const sunIcon = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

const themeIcon = document.getElementById('theme-icon');

window.toggleTheme = function() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('panzerman_theme', isDark ? 'dark' : 'light');
    themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
}

if (localStorage.getItem('panzerman_theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.innerHTML = sunIcon;
}
