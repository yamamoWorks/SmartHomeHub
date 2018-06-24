"use strict";

const Bluebird = require("bluebird");
const Mqtt = require("azure-iot-device-mqtt").Mqtt;
const Client = require("azure-iot-device").Client;
const Device = require("ps4-waker").Device;
require('log-timestamp');

const connectionString = process.env.IOTHUB_CONNECTION_STRING;
const client = Bluebird.promisifyAll(Client.fromConnectionString(connectionString, Mqtt));


const onSendPS4Command = (request, response) => {
	console.log(request.payload);
	let command = request.payload.command;
	let titleId = request.payload.titleId;

	var res = Bluebird.promisifyAll(response);
	let ps4 = new Device({
		bindAddress: process.argv[2]
	});

	Promise.resolve()
		.then(() => command == "standby" ? ps4.turnOff() : ps4.turnOn())
		.then(() => command == "start" ? ps4.startTitle(titleId) : null)
		.then(() => ps4.close())
		.then(() => res.sendAsync(200, "success"))
		.catch(err => {
			console.error(err.toString());
			res.sendAsync(500, err.toString());
		});
};

client.openAsync()
	.then(() => {
		console.log("iot-hub client opened.");
		client.onDeviceMethod("sendPS4Command", onSendPS4Command);
	})
	.catch(err => console.error(`could not open iot-hub client. ${err.toString()}`));
