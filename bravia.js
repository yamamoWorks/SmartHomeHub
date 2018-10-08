const request = require('request');

const Bravia = function (ipAddrss) {
    this.ipAddrss = ipAddrss;
}

Bravia.prototype.sendIrccCommand = function (command) {

    let code = irccCommands[command];
    console.log(code);

    let xml = `
        <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <s:Body>
                <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
                    <IRCCCode>${code}</IRCCCode>
                </u:X_SendIRCC>
            </s:Body>
        </s:Envelope>`;

    var options = {
        url: `http://${this.ipAddrss}/IRCC`,
        method: 'POST',
        body: xml
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(`${response.statusCode} ${response.statusMessage} ${body}`);
        }
    });
}

module.exports = Bravia;

const irccCommands = {
    "Confirm": "AAAAAQAAAAEAAABlAw==",
    "Up": "AAAAAQAAAAEAAAB0Aw==",
    "Down": "AAAAAQAAAAEAAAB1Aw==",
    "Right": "AAAAAQAAAAEAAAAzAw==",
    "Left": "AAAAAQAAAAEAAAA0Aw==",
    "Home": "AAAAAQAAAAEAAABgAw==",
    "Options": "AAAAAgAAAJcAAAA2Aw==",
    "Return": "AAAAAgAAAJcAAAAjAw==",
    "Num1": "AAAAAQAAAAEAAAAAAw==",
    "Num2": "AAAAAQAAAAEAAAABAw==",
    "Num3": "AAAAAQAAAAEAAAACAw==",
    "Num4": "AAAAAQAAAAEAAAADAw==",
    "Num5": "AAAAAQAAAAEAAAAEAw==",
    "Num6": "AAAAAQAAAAEAAAAFAw==",
    "Num7": "AAAAAQAAAAEAAAAGAw==",
    "Num8": "AAAAAQAAAAEAAAAHAw==",
    "Num9": "AAAAAQAAAAEAAAAIAw==",
    "Num10": "AAAAAQAAAAEAAAAJAw==",
    "Num11": "AAAAAQAAAAEAAAAKAw==",
    "Num12": "AAAAAQAAAAEAAAALAw==",
    "Power": "AAAAAQAAAAEAAAAVAw==",
    "Display": "AAAAAQAAAAEAAAA6Aw==",
    "VolumeUp": "AAAAAQAAAAEAAAASAw==",
    "VolumeDown": "AAAAAQAAAAEAAAATAw==",
    "Mute": "AAAAAQAAAAEAAAAUAw==",
    "Audio": "AAAAAQAAAAEAAAAXAw==",
    "SubTitle": "AAAAAgAAAJcAAAAoAw==",
    "Yellow": "AAAAAgAAAJcAAAAnAw==",
    "Blue": "AAAAAgAAAJcAAAAkAw==",
    "Red": "AAAAAgAAAJcAAAAlAw==",
    "Green": "AAAAAgAAAJcAAAAmAw==",
    "Play": "AAAAAgAAAJcAAAAaAw==",
    "Stop": "AAAAAgAAAJcAAAAYAw==",
    "Pause": "AAAAAgAAAJcAAAAZAw==",
    "Rewind": "AAAAAgAAAJcAAAAbAw==",
    "Forward": "AAAAAgAAAJcAAAAcAw==",
    "Prev": "AAAAAgAAAJcAAAA8Aw==",
    "Next": "AAAAAgAAAJcAAAA9Aw==",
    "Replay": "AAAAAgAAAJcAAAB5Aw==",
    "Advance": "AAAAAgAAAJcAAAB4Aw==",
    "TopMenu": "AAAAAgAAABoAAABgAw==",
    "PopUpMenu": "AAAAAgAAABoAAABhAw==",
    "Eject": "AAAAAgAAAJcAAABIAw==",
    "Rec": "AAAAAgAAAJcAAAAgAw==",
    "SyncMenu": "AAAAAgAAABoAAABYAw==",
    "ClosedCaption": "AAAAAgAAAKQAAAAQAw==",
    "Teletext": "AAAAAQAAAAEAAAA/Aw==",
    "ChannelUp": "AAAAAQAAAAEAAAAQAw==",
    "ChannelDown": "AAAAAQAAAAEAAAARAw==",
    "Input": "AAAAAQAAAAEAAAAlAw==",
    "GGuide": "AAAAAQAAAAEAAAAOAw==",
    "EPG": "AAAAAgAAAKQAAABbAw==",
    "DOT": "AAAAAgAAAJcAAAAdAw==",
    "Analog": "AAAAAgAAAHcAAAANAw==",
    "Exit": "AAAAAQAAAAEAAABjAw==",
    "Digital": "AAAAAgAAAJcAAAAyAw==",
    "BS": "AAAAAgAAAJcAAAAsAw==",
    "CS": "AAAAAgAAAJcAAAArAw==",
    "BSCS": "AAAAAgAAAJcAAAAQAw==",
    "Ddata": "AAAAAgAAAJcAAAAVAw==",
    "InternetWidgets": "AAAAAgAAABoAAAB6Aw==",
    "InternetVideo": "AAAAAgAAABoAAAB5Aw==",
    "SceneSelect": "AAAAAgAAABoAAAB4Aw==",
    "Mode3D": "AAAAAgAAAHcAAABNAw==",
    "iManual": "AAAAAgAAABoAAAB7Aw==",
    "Wide": "AAAAAgAAAKQAAAA9Aw==",
    "Jump": "AAAAAQAAAAEAAAA7Aw==",
    "PAP": "AAAAAgAAAKQAAAB3Aw==",
    "MyEPG": "AAAAAgAAAHcAAABrAw==",
    "ProgramDescription": "AAAAAgAAAJcAAAAWAw==",
    "WriteChapter": "AAAAAgAAAHcAAABsAw==",
    "TrackID": "AAAAAgAAABoAAAB+Aw==",
    "TenKey": "AAAAAgAAAJcAAAAMAw==",
    "AppliCast": "AAAAAgAAABoAAABvAw==",
    "acTVila": "AAAAAgAAABoAAAByAw==",
    "DeleteVideo": "AAAAAgAAAHcAAAAfAw==",
    "EasyStartUp": "AAAAAgAAAHcAAABqAw==",
    "OneTouchTimeRec": "AAAAAgAAABoAAABkAw==",
    "OneTouchView": "AAAAAgAAABoAAABlAw==",
    "OneTouchRec": "AAAAAgAAABoAAABiAw==",
    "OneTouchRecStop": "AAAAAgAAABoAAABjAw=="
}