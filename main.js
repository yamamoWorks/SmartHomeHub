"use strict";

require('log-timestamp');
const Bluebird = require("bluebird");
const Mqtt = require("azure-iot-device-mqtt").Mqtt;
const Client = require("azure-iot-device").Client;
const Device = require("ps4-waker").Device;
const { exec } = require("child_process");
const request = require('request');
const Bravia = require('./bravia.js');

const connectionString = process.env.IOTHUB_CONNECTION_STRING;
const braviaIpAddress = process.env.BRAVIA_IP_ADDRESS;
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

const onSendCecCommand = (request, response) => {
	console.log(request.payload);
	let command = request.payload.command;

	exec(`echo '${command}' | cec-client -s`, (error, stdout, stderr) => {
		if (error != null) {
			console.error(error);
			return;
		}
		console.log(stdout);
		console.error(stderr);
	});
};

const onSendBraviaCommand = (request, response) => {
	console.log(request.payload);
	let commands = request.payload.commands;

	let client = new Bravia(braviaIpAddress);

	commands.forEach(command => {
		client.sendIrccCommand(command);
	});
};

const onSendChannelCommand = (request, response) => {
	console.log(request.payload);
	let name = request.payload.name.replace(/\s+/g, "");
	let commands = channels[name];
	console.log(commands);

	if (commands) {
		let client = new Bravia(braviaIpAddress);
		commands.forEach(cmd => {
			client.sendIrccCommand(cmd);
		});
	}
};

const channels = {
	"NHK": ["Digital", "Num1"],
	"Eテレ": ["Digital", "Num2"],
	"日テレ": ["Digital", "Num4"],
	"テレ朝": ["Digital", "Num5"],
	"TBS": ["Digital", "Num6"],
	"テレ東": ["Digital", "Num7"],
	"フジテレビ": ["Digital", "Num8"],

	"NHKBS1": ["BS", "TenKey", "Num1", "Num0", "Num1"],
	"NHKBSプレミアム": ["BS", "TenKey", "Num1", "Num0", "Num3"],
	"BS日テレ": ["BS", "TenKey", "Num1", "Num4", "Num1"],
	"BS朝日": ["BS", "TenKey", "Num1", "Num5", "Num1"],
	"BSTBS": ["BS", "TenKey", "Num1", "Num6", "Num1"],
	"BSテレ東": ["BS", "TenKey", "Num1", "Num7", "Num1"],
	"BSフジ": ["BS", "TenKey", "Num1", "Num8", "Num1"],
	"WOWOWプライム": ["BS", "TenKey", "Num1", "Num9", "Num1"],
	"WOWOWライブ": ["BS", "TenKey", "Num1", "Num9", "Num2"],
	"WOWOWシネマ": ["BS", "TenKey", "Num1", "Num9", "Num3"]
};


client.openAsync()
	.then(() => {
		console.log("iot-hub client opened.");
		client.onDeviceMethod("sendPS4Command", onSendPS4Command);
		client.onDeviceMethod("sendCecCommand", onSendCecCommand);
		client.onDeviceMethod("sendBraviaCommand", onSendBraviaCommand);
		client.onDeviceMethod("sendChannelCommand", onSendChannelCommand);
	})
	.catch(err => console.error(`could not open iot-hub client. ${err.toString()}`));