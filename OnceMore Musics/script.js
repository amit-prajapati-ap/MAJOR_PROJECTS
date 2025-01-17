document.addEventListener("DOMContentLoaded", () => {
    let playButton = document.getElementById("play");
    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");
    let songUL;
    let songs;
    let currFolder;
    let currentSong = new Audio();
    let totalDuration = "";

    main();

    // Main Function 
    async function main() {
        //Getting the list of Available songs
        await getSongs("songs/Top_20");
        showSongsInLibrary(songs);

        //Display all the albums in display
        await displayAlbums();
        playlistLoad();
        songPlay();
        timeAndSeekbar();
        responsiveControls();
        musicControls();

    }

    //Getting songs from "songs" folder
    async function getSongs(folder) {
        currFolder = folder;
        let response = await fetch(`${currFolder}/songsRef.json`);
        let data = await response.json();
        songs = [];
        data.songs.forEach((song) => {
            songs.push(song);
        });
    }

    // Showing all Songs in the Library field
    function showSongsInLibrary(songs) {
        document.querySelector(".Library-Heading").innerHTML = (currFolder.split("/")[1]).replace("_"," ");

        playButton.classList.replace("fa-circle-pause", "fa-circle-play");
        songUL = document.querySelector(".songList");
        songUL.innerHTML = "";
        let flag = true;
        songs.forEach(song => {
            let name = (song.replace(`${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
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
        });
    }

    // Playing the songs
    function playSong(track, paused = false) {
        let audioFile = `${currFolder}/${track.replaceAll(" ", "_").toLowerCase()}.mp3`;
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

    function musicControls() {
        // Adding Event Listener to previous and next buttons
        prevButton.addEventListener("click", () => {
            document.querySelector(".seekBar-circle").style.left = "0";
            const startIndex = currentSong.src.indexOf("songs/");
            const extractedPath = currentSong.src.substring(startIndex);
            let index = songs.indexOf(extractedPath);
            if (index > 0) {
                let name = (songs[index - 1].replace(`${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
                let upperName = name.toUpperCase();
                playSong(upperName);
            }
            else {
                let name = (songs[index].replace(`${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
                let upperName = name.toUpperCase();
                playSong(upperName);
            }
        });

        nextButton.addEventListener("click", () => {
            document.querySelector(".seekBar-circle").style.left = "0";
            const startIndex = currentSong.src.indexOf("songs/");
            const extractedPath = currentSong.src.substring(startIndex);
            let index = songs.indexOf(extractedPath);
            if (index < songs.length - 1) {
                let name = (songs[index + 1].replace(`${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
                let upperName = name.toUpperCase();
                playSong(upperName);
            }
            else {
                let name = (songs[0].replace(`${currFolder}/`, "").replace(".mp3", "")).replaceAll("_", " ");
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
    }

    function responsiveControls() {
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
    }

    function timeAndSeekbar() {
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
    }

    function songPlay() {
        //Attach an event listerner to each song
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", () => {
                const songName = e.querySelector(".song-name").innerHTML;
                playSong(songName);
            })
        });

        //Attach an event listener to play
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
    }

    function playlistLoad() {
        //Load the playlist card is clicked
        Array.from(document.getElementsByClassName("card")).forEach((e) => {
            e.addEventListener("click", async item => {
                document.querySelector(".songList").innerHTML = `
                    <span class="loader text-white text-2xl font-bold mx-auto">Loading...</span>
                `;
                document.querySelector(".seekBar-circle").style.left = "0";
                await getSongs(`songs/${item.currentTarget.dataset.folder}`);
                showSongsInLibrary(songs);

                //Attach an event listerner to each song
                Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                    e.addEventListener("click", () => {
                        const songName = e.querySelector(".song-name").innerHTML;
                        playSong(songName);
                    })
                });
            });
        });
    }

    async function displayAlbums() {
        let response = await fetch("songs/songsFolders.json");
        let dataFolder = await response.json();
        let cardContainer = document.querySelector(".cards");
        cardContainer.innerHTML = "";
        for (let folder = 0; folder < dataFolder.folders.length; folder++) {
            let response = await fetch(`songs/${dataFolder.folders[folder]}/info.json`);
            let data = await response.json();

            cardContainer.innerHTML += `
                <!-- Card -->
                                <div data-folder="${data.dataSet}"
                                    class="card flex flex-col gap-7 p-5 w-[25%] max-w-[250px] min-w-[220px] rounded-lg hover:bg-neutral-950 transition-all duration-400 group max-h-[370px]">

                                    <!-- Image Part -->
                                    <div class="relative rounded-lg self-stretch">
                                        <div
                                            class="playlistButton flex justify-center items-center bg-green-500 rounded-full absolute p-4 bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[20px] group-hover:translate-y-0 cursor-pointer">
                                            <i class="fa-solid fa-play text-3xl text-black mx-1"></i>
                                        </div>
                                        <img src="${data.image}" class="rounded-lg w-full">
                                        <img src="assets/tiktok-16.png" width="25px" class="absolute top-2 left-2">
                                    </div>

                                    <!-- Information -->
                                    <div class="card-info flex flex-col gap-2">
                                        <h2 class="text-white font-bold text-xl">${data.title}</h2>
                                        <p class="text-white opacity-70 text-sm font-light">${data.description}</p>
                                    </div>
                                </div>
            `;
        }
    }
});