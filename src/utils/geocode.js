const request = require("request");

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		location
	)}.json?access_token=pk.eyJ1IjoiZ3J6ZWdvcnp6aSIsImEiOiJja2pvN2hhb2IyamV0MnpxbzNieGVwMjVzIn0.VtJg3finfWHrK_2gmdEjhw&limit=1`;
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback("Unable to connect to the server", undefined);
		} else if (body.message || body.features.length === 0) {
			callback("There is no such location. Try another one !", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				address: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
