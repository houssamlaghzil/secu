import './App.css';
import QrScanner from 'qr-scanner';
import QRCode from "qrcode.react";
import React from "react";
var CryptoJS = require("crypto-js");

let qrScanner;

export function getQrCodeData(data){
    const uncryptedData = CryptoJS.AES.decrypt(data, process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8);
    console.log("Data of the Qr Code", uncryptedData)
    if(uncryptedData === ""){
        return "Wrong format";
    }
    return uncryptedData;
}

export function startScan(){
    document.getElementById("startScanBtn").style.visibility = "hidden";
    document.getElementById("stopScanBtn").style.visibility = "visible";
    let videoElem = document.getElementById("videoDiv");
    qrScanner = new QrScanner(videoElem, result => {
        getQrCodeData(result)
        stopScan();
    });
    qrScanner.start().then(r => {
        console.log("Scanner started");
    });
}
function stopScan(){
    document.getElementById("startScanBtn").style.visibility = "visible";
    document.getElementById("stopScanBtn").style.visibility = "hidden";
    qrScanner.stop();
}

function ScannerDiv() {
    let userDataJson = {
        name: "toto",
        lastname : "dupont",
        mail: "f@mail.com"
    }
    const cryptedData = CryptoJS.AES.encrypt(JSON.stringify(userDataJson), process.env.REACT_APP_AES_KEY);
    const uncryptedData = CryptoJS.AES.decrypt(cryptedData, process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8);
    console.log(JSON.parse(uncryptedData).name, uncryptedData);

    return (
        <div>
            <QRCode value={cryptedData.toString()} />
            <p>{cryptedData.toString()}</p>
            <p>{uncryptedData.toString()}</p>
            <button id="startScanBtn" onClick={() => {startScan()}}>
                Start</button>
            <button id="stopScanBtn" style={{visibility:'hidden'}} onClick={() => {stopScan()}}>
                Stop</button>
            <video id="videoDiv"/>
        </div>
    );
}

export default ScannerDiv;