const teams = [
    "Manchester City", "Liverpool", "Arsenal", "Manchester United", "Chelsea",
    "Real Madrid", "Barcelona", "Atlético Madrid", "Athletic Bilbao", "Villarreal",
    "Bayern Münih", "Borussia Dortmund", "Bayer Leverkusen", "RB Leipzig", "Eintracht Frankfurt",
    "Inter", "Milan", "Juventus", "Napoli", "Roma",
    "PSG", "Marseille", "Monaco", "Lyon", "Lille",
    "Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor", "Başakşehir",
    "Kocaelispor", "Kasımpaşa", "Göztepe", "Siirt Jetpa", "Metz", "Hoffenheim"
];

async function getLogos() {
    let result = {};
    for (let t of teams) {
        try {
            let search = t + ' football club';
            let lang = 'en';
            
            if (["Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor", "Başakşehir", "Kocaelispor", "Kasımpaşa", "Göztepe", "Siirt Jetpa"].includes(t)) {
                search = t;
                lang = 'tr';
                if(t === 'Siirt Jetpa') search = 'Siirtspor';
                if(t === 'Başakşehir') search = 'İstanbul Başakşehir FK';
            }
            if (t === 'Bayern Münih') { search = 'FC Bayern München'; lang = 'en'; }
            
            let searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(search)}&limit=1&format=json`;
            let res = await fetch(searchUrl).then(r => r.json());
            let title = res[1][0];
            
            if(!title) {
                result[t] = null;
                continue;
            }

            let picUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300`;
            let picRes = await fetch(picUrl).then(r => r.json());
            
            let pages = picRes.query.pages;
            let pageId = Object.keys(pages)[0];
            let img = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;
            
            result[t] = img;
        } catch (e) {
            result[t] = null;
        }
    }
    console.log(JSON.stringify(result, null, 2));
}
getLogos();
