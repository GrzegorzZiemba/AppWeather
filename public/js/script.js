const formWeather = document.querySelector("form");
const inputField = document.querySelector("input");
const divFields = document.querySelector(".weather-container");
formWeather.addEventListener("submit", (e) => {
	e.preventDefault();
	divFields.innerHTML = "Loading..";
	const location = inputField.value;
	if (location === "") {
		return (divFields.innerHTML = "Write city PLEASE :) ");
	}
	fetch("http://localhost:3000/weather?address=" + location).then(
		(response) => {
			response.json().then((data) => {
				console.log(data);
				if (data.err) {
					divFields.textContent = data.err;
				} else {
					divFields.innerHTML = data.data;
				}
			});
		}
	);
});
