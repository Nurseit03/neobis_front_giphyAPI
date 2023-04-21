const giphyGallery = document.getElementById("giphy__gallery");
const button = document.getElementById("search__button");
const image = document.querySelector(".giphy__img");

const APIKEY = "9PedrjFhO2zrVkdmkykXucRpaIqUQsOy";

button.addEventListener("click", function (event) {
  // Не перезагружать страницу
  event.preventDefault();

  async function fetchHandler() {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=25&q=`;
    // Берем строку из поля ввода input
    let str = document.getElementById("search").value.trim();
    // Добавляем в конец URL адреса строку взятую из поля ввода
    url = url.concat(str);

    try {
      const response = await fetch(url);
      const data = await response.json();
      // Очистить галерею перед добавлением новых изображений
      giphyGallery.innerHTML = "";

      // Обход и добавление каждой гифки на страницу
      data.data.forEach((gif) => {
        const img = document.createElement("img");
        img.src = gif.images.original.url;
        img.classList.add("giphy");
        giphyGallery.appendChild(img);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Вызов функции при условии если гифки загрузились
  let isLoaded = image.complete;
  if (isLoaded) {
    fetchHandler();
  }
});
