import './App.css';
import QrScanner from 'qr-scanner';

let qrScanner;
//let visibilityStart = "visible";
//let visibilityStop = "hidden";

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
    return (
        <div>
            <button id="startScanBtn" onClick={() => {startScan()}}>
                Start</button>
            <button id="stopScanBtn" style={{visibility:'hidden'}} onClick={() => {stopScan()}}>
                Stop</button>
            <video id="videoDiv"/>
        </div>
    );
}

export default ScannerDiv;