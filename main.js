var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let menu = document.querySelector("#menu-icon")
let navbar = document.querySelector(".navbar");
let header = document.querySelector("header")

window.addEventListener("scroll", () => {
    header.classList.toggle("active", window.scrollY > 0)
})

window.onscroll = () => {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
}

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        "en-US",
        options
    );
    return formattedDate;
}
// fetching the popular and toprated movies

async function fetchContent(type) {
    const contentWrapper = document.getElementById("contentWrapper");
    // Clear existing content
    contentWrapper.innerHTML = "";

    let url, title;
    if (type === "popular") {
        url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        title = "Popular";
    } else if (type === "toprated") {
        url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
        title = "Toprated";
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzA3OGUwOTVlNzQ3NGZhOGU1ZjhjZDc0YTY2ODYyZiIsInN1YiI6IjY0ZTMwNjNlNjcyOGE4MDEzZTE3MDI4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.znkJFOYjscTKuo5HfXoubo5FeH1_SFwNkiBOje6PfxY",
        },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const content = data.results.slice(0, 18);

    const formattedContent = content
        .map((item) => {
            const formattedDate = formatDate(item.release_date);
            return `
            <div class="movies-card">
                <div class="top">
                <img src="https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path
                }" alt="">
                <span class="language">${item.original_language}</span>
                </div>
                <div class="movies-card-content">
                    <p class="name">${item.title || item.name}</p>
                    <p class="date">${formattedDate}</p>
                </div>
            </div>`;
        })
        .join("");

    // Setting the title
    document.querySelector(".movies-title").innerText = title + " Movies";

    // Appending the content HTML to the moviesWrapper
    contentWrapper.innerHTML = formattedContent;
}

// fetching the Trending movies and Tvshows

async function fetchTrendingContent(type) {
    const trendingWrapper = document.getElementById("trendingWrapper");
    // Clear existing content
    trendingWrapper.innerHTML = "";

    let url, title, dateKey;
    if (type === "movies") {
        url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
        title = "Movies";
        dateKey = "release_date";
    } else if (type === "tvshows") {
        url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
        title = "TVShows";
        dateKey = "first_air_date";
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzA3OGUwOTVlNzQ3NGZhOGU1ZjhjZDc0YTY2ODYyZiIsInN1YiI6IjY0ZTMwNjNlNjcyOGE4MDEzZTE3MDI4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.znkJFOYjscTKuo5HfXoubo5FeH1_SFwNkiBOje6PfxY",
        },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const content = data.results.slice(0, 18);
    console.log("trending");
    console.log(content);
    console.log("end trending");

    const formattedContent = content
        .map((item) => {
            const formattedDate = formatDateBasedOnType(item[dateKey]);
            return `
            <div class="movies-card">
            <div class="top">
            <img src="https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path
            }" alt="">
            <span class="language">${item.original_language}</span>
            </div>
                <div class="movies-card-content">
                    <p class="name">${item.title || item.original_name}</p>
                    <p class="date">${formattedDate}</p>
                </div>
            </div>`;
        })
        .join("");

    // Setting the title
    document.querySelector(".trending-title").innerText = `Trending ${title}`;

    // Appending the content HTML to the trendingWrapper
    trendingWrapper.innerHTML = formattedContent;
}

function formatDateBasedOnType(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
}

// Fetch popular movies by default
fetchContent("popular");
// Fetch trending movies by default
fetchTrendingContent("movies");
