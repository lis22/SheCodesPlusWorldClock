const cities = new Map([
  [
    "Los Angeles",
    {
      emoji: "🇺🇸",
      timezone: "America/Los_Angeles",
      displayed: true,
    },
  ],
  [
    "Denver",
    {
      emoji: "🇺🇸",
      timezone: "America/Denver",
      displayed: false,
    },
  ],
  [
    "New York",
    {
      emoji: "🇺🇸",
      timezone: "America/New_York",
      displayed: false,
    },
  ],
  [
    "Toronto",
    {
      emoji: "🇨🇦",
      timezone: "America/Toronto",
      displayed: true,
    },
  ],
  [
    "Paris",
    {
      emoji: "🇫🇷",
      timezone: "Europe/Paris",
      displayed: true,
    },
  ],
  [
    "Amsterdam",
    {
      emoji: "🇳🇱",
      timezone: "Europe/Amsterdam",
      displayed: false,
    },
  ],
  [
    "Lisbon",
    {
      emoji: "🇵🇹",
      timezone: "Europe/Lisbon",
      displayed: false,
    },
  ],
  [
    "Dublin",
    {
      emoji: "🇮🇪",
      timezone: "Europe/Dublin",
      displayed: false,
    },
  ],
  [
    "Madrid",
    {
      emoji: "🇪🇸",
      timezone: "Europe/Madrid",
      displayed: false,
    },
  ],
  [
    "Istanbul",
    {
      emoji: "🇹🇷",
      timezone: "Asia/Istanbul",
      displayed: true,
    },
  ],
  [
    "Tokyo",
    {
      emoji: "🇯🇵",
      timezone: "Asia/Tokyo",
      displayed: true,
    },
  ],
  [
    "Your location",
    {
      emoji: "📍",
      timezone: "unknown",
      displayed: true,
    },
  ],
]);

function setCurrentLocation() {
  cities.get("Your location").timezone = moment.tz.guess();
}

function initializeSelect() {
  const select = document.querySelector(".customSelect");
  cities.forEach((value, key) => {
    if (!value.displayed) {
      const newOption = new Option(`${value.emoji}  ${key}`, key);
      select.add(newOption);
    }
  });
}

function addGridItem(emoji, timeZone, cityName) {
  const cityTime = moment().tz(timeZone);
  const gridParent = document.querySelector(".grid");
  const divCity = document.createElement("div");
  const h2CityName = document.createElement("h2");
  const h3Date = document.createElement("h3");
  const h2Time = document.createElement("h2");
  const removeBtn = document.createElement("button");
  const icon = document.createElement("i");
  const span = document.createElement("span");

  divCity.classList.add("gridItem");
  h2CityName.classList.add("city");
  h3Date.classList.add("date");
  h2Time.classList.add("time");
  removeBtn.classList.add("remove");
  icon.classList.add("fa", "fa-remove");
  span.classList.add("emoji");

  h2CityName.textContent = cityName;
  span.textContent = emoji;
  h3Date.textContent = cityTime.format("MMMM	Do YYYY");
  h2Time.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");

  h2CityName.append(span);
  removeBtn.append(icon);
  divCity.append(removeBtn, h2CityName, h3Date, h2Time);
  gridParent.prepend(divCity);
}

function initializeCityGrid() {
  cities.forEach((value, key) => {
    if (value.displayed) {
      addGridItem(value.emoji, value.timezone, key);
    }
  });
}
function addCityToSelect(cityName) {
  const select = document.querySelector(".customSelect");
  const cityObj = cities.get(cityName);
  cityObj.displayed = false;

  const newOption = new Option(`${cityObj.emoji} ${cityName}`, cityName);
  select.add(newOption);
}

function removeCityFromSelect(cityName) {
  const selectOptions = document.querySelectorAll(".customSelect > option");

  selectOptions.forEach((option) => {
    if (option.value === cityName) {
      option.remove();
    }
  });
  selectOptions[0].selected = true;
}

function removeGridItem(event) {
  if (event.target.className === "remove") {
    const cityRemoved = event.target.nextSibling.innerHTML.split("<")[0];
    const parentElement = event.target.closest("div");
    parentElement.remove();
    cities.get(cityRemoved).displayed = false;

    addCityToSelect(cityRemoved);
  }
}

function selectCityCallBack(event) {
  const cityName = event.target.value;
  const cityObj = cities.get(cityName);
  cityObj.displayed = true;

  addGridItem(cityObj.emoji, cityObj.timezone, cityName);
  removeCityFromSelect(cityName);
}

function updateTimeDate() {
  const gridItems = document.querySelectorAll(".gridItem");

  gridItems.forEach((element) => {
    const city = element.childNodes[1].innerHTML.split("<")[0];
    const cityTime = moment().tz(cities.get(city).timezone);
    element.childNodes[2].innerHTML = cityTime.format("MMMM	Do YYYY");
    element.childNodes[3].innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  });
}

setCurrentLocation();
initializeSelect();
initializeCityGrid();
setInterval(updateTimeDate, 1000);

const gridElement = document.querySelector(".grid");
gridElement.addEventListener("click", removeGridItem);

const citiesSelectElement = document.querySelector(".customSelect");
citiesSelectElement.addEventListener("change", selectCityCallBack);
