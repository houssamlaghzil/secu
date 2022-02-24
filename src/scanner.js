import './App.css';
import QrScanner from 'qr-scanner';
import QRCode from "qrcode.react";
import React from "react";
import {sendMessage} from "./verification";
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
        let resultData = getQrCodeData(result);

        if(resultData !== "Wrong format"){
            sendMessage(JSON.parse(resultData).phoneNumber)
        }

        stopScan();
    });
    qrScanner.start().then(r => {
        console.log("Scanner started");
    });
}
function stopScan(){
    qrScanner.stop();
    document.getElementById("startScanBtn").style.visibility = "visible";
    document.getElementById("stopScanBtn").style.visibility = "hidden";
}

function ScannerDiv() {
    let userDataJson = {
        name: "toto",
        lastname : "dupont",
        mail: "f@mail.com",
        phoneNumber: "+33695845515"
    }
    const cryptedData = CryptoJS.AES.encrypt(JSON.stringify(userDataJson), process.env.REACT_APP_AES_KEY);
    const uncryptedData = CryptoJS.AES.decrypt(cryptedData, process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8);
    //<QRCode value={cryptedData.toString()} />
    return (
        <div id="scanDiv">
            <button id="startScanBtn" onClick={() => {startScan()}}>
                Start</button>
            <button id="stopScanBtn" style={{visibility:'hidden'}} onClick={() => {stopScan()}}>
                Stop</button>
            <video id="videoDiv"/>
        </div>
    );
}

export default ScannerDiv;
