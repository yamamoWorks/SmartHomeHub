# SmartHomeHub
Control PlayStation 4 via Azure IoT Hub. (for Smart Speakers)  
Connect Azure IoT Hub and wait direct method invoke.

## Component
- [ps4-waker](https://github.com/dhleong/ps4-waker)
- [Microsoft Azure IoT device SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node)

## Usage
Set environment variable IOTHUB_CONNECTION_STRING that is Azure IoT Hub connection string.
```
node main.js [ipAddress]
```
\[ipAddress\] is optional. Bind to a specific network adapter IP, if you have multiple.

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
__startTitle__ : Start PS4 application.  
__standby__ : Going to standby mode.

#### TITLE_ID
Specify PS4 application ID.
It is different among region.

|Application|Title Id US|Title Id JP|Title Id EU|
|-|-|-|-|
|Netflix|[CUSA00129](https://store.playstation.com/en-us/product/UT0007-CUSA00129_00-NETFLIXPOLLUX001)|[CUSA02988](https://store.playstation.com/ja-jp/product/JA0010-CUSA02988_00-NETFLIXPOLLUX001)|[CUSA00127](https://store.playstation.com/en-gb/product/EP4350-CUSA00127_00-NETFLIXPOLLUX001)|
|YouTube|[CUSA01015](https://store.playstation.com/en-us/product/UP4381-CUSA01015_00-YOUTUBESCEA00000)|[CUSA01065](https://store.playstation.com/ja-jp/product/JA0004-CUSA01065_00-YOUTUBESCEJ00000)|[CUSA01116](https://store.playstation.com/en-gb/product/EP4381-CUSA01116_00-YOUTUBESCEE00000)|
|Amazon Video|[CUSA00130](https://store.playstation.com/en-us/product/UP2064-CUSA00130_00-AIV00000000000US)|[CUSA03099](https://store.playstation.com/ja-jp/product/JA0011-CUSA03099_00-AMAZONVIDEOJAPAN)|[CUSA00126](https://store.playstation.com/en-gb/product/EP4183-CUSA00126_00-AIV00000000000EU)|


