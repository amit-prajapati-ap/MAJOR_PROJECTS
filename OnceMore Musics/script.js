//Get songs Function form songs folder
async function getSongs() {
    let a = await fetch("http://192.168.40.89:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let tds = div.getElementsByTagName("h1");
    console.log(tds);
}

getSongs();