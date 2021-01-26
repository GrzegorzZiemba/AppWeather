const request = require("request");
const geocode = require("./geocode");

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=4621fad095b1b242cb9d24c147450de1&query=${lat},${long}`;
	//zamiast url: url, uzywamy shortanhd
	// oraz zamiast response, dajemy {body}, bo to destrukturyzacja responsa, ktory z defaultu musi tam byc, dzieki temu zyskujemy miejsce i mozemy sie pozbyc 'response' :)
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback("Unable to connect to databases", undefined);
		} else if (body.error) {
			callback("Wrong data passed", undefined);
		} else {
			callback(
				undefined,
				`<div>${body.current.temperature} degrees and the weather is ${body.current.weather_descriptions}</div> <img src=${body.current.weather_icons} />`
			);
		}
	});
};

module.exports = forecast;
