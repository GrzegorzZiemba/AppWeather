const express = require("express");
const path = require("path");
const hbs = require("hbs");

// getting my file
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define Paths to public and 'new' views folder
const publicDirectoryPath = path.join(__dirname, "../public");
const newViewPath = path.join(__dirname, "../templates/views");
const partialDirectory = path.join(__dirname, "../templates/partials");
//Setting HBS as an engine, and chaning the views folder to new One
app.set("view engine", "hbs");
app.set("views", newViewPath);
hbs.registerPartials(partialDirectory);
//static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
	res.render("index", {
		name: "Grzegorz",
		login: "someLogin",
		title: "MainPage",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Error Msg",
		});
	}
	console.log(req.query.address);
	geocode(req.query.address, (err, { latitude, longitude, address } = {}) => {
		if (err) {
			return res.send({
				err,
			});
		}
		forecast(latitude, longitude, (err, forecastData) => {
			if (err) {
				return res.send({
					err,
				});
			}
			res.send({
				data: forecastData,
			});

			// console.log("Data ", forecastData);
			// console.log(address);
		});
	});
});

// app.get("/about", (req, res) => {
// 	res.send("About me page");
// });

// app.get("/weather", (req, res) => {
// 	res.send(htmlDirectory);
// });

app.get("/weather/*", (req, res) => {
	res.send("Weather for .. not found");
});

app.get("*", (req, res) => {
	res.render("errorpage");
});

app.listen(3000, () => {
	console.log("I'm working  !");
});
