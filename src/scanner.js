import './App.css';
import QrScanner from 'qr-scanner';

function startScan(){
    let videoElem = document.getElementById("videoDiv");
    const qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result));
    console.log(qrScanner);
    qrScanner.start();
}

function ScannerDiv() {
    console.log("cc");

    return (
        <div onLoad={startScan()}>
            <video id="videoDiv"/>
        </div>
    );
}

export default ScannerDiv;