cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-QRCode/www/QRCode.js",
        "id": "cordova-plugin-QRCode.QRCode",
        "pluginId": "cordova-plugin-QRCode",
        "clobbers": [
            "QRCode"
        ]
    },
    {
        "file": "plugins/cordova-plugin-barcodescanner/www/barcodescanner.js",
        "id": "cordova-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "cordova-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-keyboard/www/keyboard.js",
        "id": "cordova-plugin-keyboard.keyboard",
        "pluginId": "cordova-plugin-keyboard",
        "clobbers": [
            "window.Keyboard"
        ]
    },
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-QRCode": "1.0.2-dev",
    "cordova-plugin-barcodescanner": "0.7.0",
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-keyboard": "1.1.4",
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-sqlite-storage": "1.2.0"
}
// BOTTOM OF METADATA
});