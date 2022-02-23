import './App.css';
import QrScanner from 'qr-scanner';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import QRCode from "qrcode.react";
import React from "react";
var CryptoJS = require("crypto-js");

let qrScanner;

function getQrCodeData(data){
    console.log("Data of the Qr Code", data)
    stopScan();
}

function startScan(){
    document.getElementById("startScanBtn").style.visibility = "hidden";
    document.getElementById("stopScanBtn").style.visibility = "visible";
    let videoElem = document.getElementById("videoDiv");
    qrScanner = new QrScanner(videoElem, result => {
        getQrCodeData(result)
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
    const diarre = CryptoJS.AES.encrypt("coucouc la streat", "keyultrasecure");
    const descryptDiarre = CryptoJS.AES.decrypt(diarre, "keyultrasecure").toString(CryptoJS.enc.Utf8);
    console.log(diarre, descryptDiarre);

    return (
        <div>
            <QRCode value={diarre.toString()} />
            <p>{diarre.toString()}</p>
            <p>{descryptDiarre.toString()}</p>
            <button id="startScanBtn" onClick={() => {startScan()}}>
                Start</button>
            <button id="stopScanBtn" style={{visibility:'hidden'}} onClick={() => {stopScan()}}>
                Stop</button>
            <video id="videoDiv"/>
        </div>
    );
}

export default ScannerDiv;