let playButton = document.getElementById("play");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let songUL;
let songs;
let currFolder;
let currentSong = new Audio();
let totalDuration = "";

//Getting songs from "songs" folder
async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://192.168.40.89:5501/${currFolder}`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
}

// Showing all Songs in the Library field
function showSongsInLibrary(songs) {
    songUL = document.querySelector(".songList");
    let flag = true;
    for (const song of songs) {
        let name = (song.replace(`http://localhost:5173/${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
        let upperName = name.toUpperCase();
        if (flag) {
            flag = false;
            playSong(upperName, true);
            document.querySelector(".songTime").innerHTML = `<p>00:00 / 00:00</p>`;
        }
        songUL.innerHTML = songUL.innerHTML + `
        <li class="text-white p-4 bg-zinc-800 transition-all duration-300 hover:bg-zinc-700 mx-3 rounded-lg flex justify-between items-center gap-4 cursor-pointer">
        <div class="flex items-center gap-4">
        <i class="fa-solid fa-music text-2xl"></i>
        <div>
        <h3 class="song-name text-lg font-bold">${upperName}</h3>
        <p class="text-sm">Amit Prajapati</p>
        </div>
        </div>
        <button class="flex items-center gap-2">
        <i class="fa-regular fa-circle-play text-2xl"></i>
        </button>
        </li>
        `;
    }

}

// Playing the songs
function playSong(track, paused = false) {
    let audioFile = `http://localhost:5173/${currFolder}/${track.replaceAll(" ", "_").toLowerCase()}.mp3`;

    currentSong.src = audioFile;
    if (!paused) {
        currentSong.play();
        playButton.classList.replace("fa-circle-play", "fa-circle-pause");
    }
    document.querySelector(".songInfo").innerHTML = `
                        <p class="text-sm sm:text-xl font-bold mt-2">${track}</p>
                        <p class="song-author text-[12px] sm:text-lg">Amit Prajapati</p>
                        `;
}

// Formating the Time
function formatTime(seconds) {
    // Ensure seconds is a number
    seconds = Math.max(0, Math.floor(seconds));

    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format as "mm:ss"
    const formattedTime =
        String(minutes).padStart(2, '0') + ':' +
        String(remainingSeconds).padStart(2, '0');

    return formattedTime;
}

// Updating the Time
function timeUpdate(current, total) {
    if (total != "NaN:NaN") {
        totalDuration = total;
        document.querySelector(".songTime").innerHTML = `<p>${current} / ${totalDuration}</p>`;
    }
    else {
        document.querySelector(".songTime").innerHTML = `<p>${current} / 00:00</p>`;
    }
}

// Main Function 
async function main() {
    //Getting the list of Available songs
    songs = await getSongs("songs/ncs");
    showSongsInLibrary(songs);

    //Attach an event listerner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.target);
            const songName = e.querySelector(".song-name").innerHTML;
            playSong(songName);
        })
    });

    //Attach am event listener to play
    playButton.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            if (currentSong.src != "") {
                playButton.classList.replace("fa-circle-play", "fa-circle-pause");
            }
        }
        else {
            currentSong.pause();
            playButton.classList.replace("fa-circle-pause", "fa-circle-play");
        }
    })

    //Listen for timeUpdate event
    currentSong.addEventListener("timeupdate", (a) => {

        if (currentSong.currentTime == currentSong.duration) {
            playButton.classList.replace("fa-circle-pause", "fa-circle-play");
        }
        timeUpdate(formatTime(currentSong.currentTime), formatTime(currentSong.duration));

        document.querySelector(".seekBar-circle").style.left = `${(currentSong.currentTime / currentSong.duration) * 100}%`;
    });

    //Add an event listener to seekbar
    document.querySelector(".seekBar").addEventListener("click", (e) => {
        let percent = (e.offsetX / (e.target.getBoundingClientRect().width)) * 100;

        document.querySelector(".seekBar-circle").style.left = `${percent}%`;

        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    //Add an event listener for hamBurgerShow
    document.querySelector(".hamBurgerShow").addEventListener("click", () => {
        document.querySelector(".asideBar").classList.add("asideBarShow");
        let show = document.querySelector(".hamBurgerShow");
        let close = document.querySelector(".hamBurgerClose");

        close.classList.add("hamBurgerShow");
        close.classList.remove("hamBurgerClose");
        show.classList.add("hamBurgerClose");
        show.classList.remove("hamBurgerShow");
    });

    //Add an event listener for hamBurgerClose
    document.querySelector(".hamBurgerClose").addEventListener("click", () => {
        document.querySelector(".asideBar").classList.remove("asideBarShow");
        let show = document.querySelector(".hamBurgerShow");
        let close = document.querySelector(".hamBurgerClose");

        close.classList.add("hamBurgerShow");
        close.classList.remove("hamBurgerClose");
        show.classList.add("hamBurgerClose");
        show.classList.remove("hamBurgerShow");
    });

    // Adding Event Listener to previous and next buttons
    prevButton.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src);
        if (index > 0) {
            let name = (songs[index - 1].replace(`http://localhost:5173/${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
            let upperName = name.toUpperCase();
            playSong(upperName);
        }
        else {
            let name = (songs[index].replace(`http://localhost:5173/${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
            let upperName = name.toUpperCase();
            playSong(upperName);
        }
    });

    nextButton.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src);
        if (index < songs.length - 1) {
            let name = (songs[index + 1].replace(`http://localhost:5173/${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
            let upperName = name.toUpperCase();
            playSong(upperName);
        }
        else {
            let name = (songs[0].replace(`http://localhost:5173/${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
            let upperName = name.toUpperCase();
            playSong(upperName);
        }
    });

    //Add an event to volume
    document.querySelector("#volume-range").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (e.target.value > 50) {
            document.querySelector(".volume-icon").classList.add("fa-volume-high");
            document.querySelector(".volume-icon").classList.remove("fa-volume-low");
            document.querySelector(".volume-icon").classList.remove("fa-volume-xmark");
        }
        else if (e.target.value < 50 && e.target.value > 0) {
            document.querySelector(".volume-icon").classList.add("fa-volume-low");
            document.querySelector(".volume-icon").classList.remove("fa-volume-high");
            document.querySelector(".volume-icon").classList.remove("fa-volume-xmark");
        }
        else if (e.target.value < 10) {
            document.querySelector(".volume-icon").classList.add("fa-volume-xmark");
            document.querySelector(".volume-icon").classList.remove("fa-volume-low");
            document.querySelector(".volume-icon").classList.remove("fa-volume-high");
        }
    });

    //Add an event to volume icon
    document.querySelector(".volume-icon").addEventListener("click", () => {
        document.querySelector("#volume-range").classList.toggle("hidden");
    });

    //Load the playlist card is clicked
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async item => {
            await getSongs(`songs/${item.currentTarget.dataset.folder}`);
        });
    });
}

main();