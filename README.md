# SmartHomeHub
Control PlayStation 4 via Azure IoT Hub. (for Smart Speakers)  
Connect Azure IoT Hub and wait direct method invoke.

## Component
- [ps4-waker](https://github.com/dhleong/ps4-waker)
- [Microsoft Azure IoT device SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node)

## Usage
Set environment variable IOTHUB_CONNECTION_STRING that is Azure IoT Hub connection string.
```
node index.js [ipaddress]
```
[ipaddress] is optional. Bind to a specific network adapter IP, if you have multiple.

And, invoke direct method via IoT Hub with following parameters.
```
var methodParams =
{
    methodName: "sendPS4Command",
    payload: {
        "command": <COMMAND>,
        "titleId": <TITLE_ID>
}
```
#### COMMAND
startTitle : Start PS4 application.  
standby : Going to standby mode.

#### TITLE_ID
Specify PS4 application ID.
It is different among countries.
|Application|Title Id|Region|
|-|-|-|
|Netflix|[CUSA02988](https://store.playstation.com/ja-jp/product/JA0010-CUSA02988_00-NETFLIXPOLLUX001)|JP|
|Netflix|[CUSA00127](https://store.playstation.com/en-gb/product/EP4350-CUSA00127_00-NETFLIXPOLLUX001)|EU|
|Netflix|[CUSA00129]((https://store.playstation.com/en-us/product/UT0007-CUSA00129_00-NETFLIXPOLLUX001))|US|


