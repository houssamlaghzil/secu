import './App.css';
import QrScanner from 'qr-scanner';

let qrScanner;


function startScan(){
    let videoElem = document.getElementById("videoDiv");
    qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result));
    qrScanner.start().then(r =>
    console.log(r));
}
function stopScan(){
   qrScanner.stop();
}

function ScannerDiv() {
    return (
        <div>
            <button value="Start" onClick={() => {
    startScan()
            }}>Start</button>
            <button onClick={() => {
    stopScan()
            }}>Stop</button>
            <video id="videoDiv"/>
        </div>
    );
}

export default ScannerDiv;