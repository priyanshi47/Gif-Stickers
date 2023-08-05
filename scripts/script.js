const API_KEY = "akc9Kzhtus0Bhef2b9W4ucMHKEt2EMuM";
const sticker_randomAPI = `https://api.giphy.com/v1/stickers/trending?api_key=${API_KEY}&limit=25&rating=g`;
const gif_randomAPI = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=g`;

const container = document.querySelector(".container");
const stickerButt = document.querySelector(".stickerButton");
const gifButt = document.querySelector(".gifButton");
const form = document.querySelector(".searchForm");
const input = document.querySelector(".searchInput");
const reset = document.querySelector(".resetBtn");
const loading = document.querySelector(".loading");




var stickerChosen = true;
var gifChosen = false;


get_data(sticker_randomAPI);

reset.addEventListener("click", () => {
  input.value = "";
  get_data(sticker_randomAPI);
});

stickerButt.addEventListener("click", () => {
  stickerChosen = true;
  gifChosen = false;

  const search_query = input.value;
  const sticker_searchAPI = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${search_query}&limit=25&offset=0&rating=g&lang=en`;
  if (search_query !== "") {
    get_data(sticker_searchAPI);
  } else {
    get_data(sticker_randomAPI);
  }
});

gifButt.addEventListener("click", () => {
  gifChosen = true;
  stickerChosen = false;
  const search_query = input.value;
  const gif_searchAPI = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search_query}&limit=25&offset=0&rating=g&lang=en`;
  if (search_query !== "") {
    get_data(gif_searchAPI);
  } else {
    get_data(gif_randomAPI);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const search_query = input.value;
  const sticker_searchAPI = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${search_query}&limit=25&offset=0&rating=g&lang=en`;
  const gif_searchAPI = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search_query}&limit=25&offset=0&rating=g&lang=en`;

  if (stickerChosen && search_query !== "") {
    get_data(sticker_searchAPI);
  } else if (gifChosen && search_query !== "") {
    get_data(gif_searchAPI);
  } else {
    get_data(sticker_randomAPI);
  }
});

async function get_data(url) {
  loading.classList.add("active");
  container.classList.remove("active");
  try {
    const res = await fetch(url);
    const data = await res.json();
    show_data(data.data);
  } catch (err) {
    alert("Error encountered!!");
  }
  loading.classList.remove("active");
  container.classList.add("active");
}

function show_data(data) {
  container.innerHTML = "";
  data.forEach((element) => {
    const imgSrc = element.images.downsized_large.url;
    const box = document.createElement("div");
    box.classList.add("box");
    const image = new Image(200, 200);
    const share = document.createElement("a");
    share.href = "whatsapp://send?text=" + encodeURIComponent(imgSrc);
    share.innerText = "Share";
    image.src = imgSrc;
    box.appendChild(image);
    box.appendChild(share);
    container.appendChild(box);
  
    
  });
}
