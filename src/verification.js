import ScannerDiv from "./scanner";
import ReactDOM from "react-dom";
import React from "react";

let randomizeNumber;

export function checkUserExist(userPhoneNumber){
    fetch('/api/usersbynumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: userPhoneNumber,
            token: process.env.REACT_APP_BDD_TOKEN
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status===200) {
                console.log("Success");
                if(data.userFound === true){
                    sendMessage(userPhoneNumber);
                }
                else {
                    window.alert("Utilisateur inexistant")
                }
            } else {
                window.alert("Utilisateur inexistant")
                console.log(data);
            }
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function generateNumber(){
    return getRandomInt(9999)
}

function checkNumber(){
    let userValue = document.getElementById("numberInput").value;
    if(parseInt(userValue) === randomizeNumber){
        window.alert("Bravo tu peux entrer BG");
        document.getElementById("backButton").onclick= ()=> {
            ReactDOM.render(
                <React.StrictMode>
                    <ScannerDiv/>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    }
    else{
        window.alert("Mauvais code")
    }
}

function displayVerifDiv(){
    ReactDOM.render(
        <React.StrictMode>
            <div>
                <input id="numberInput" type="number"/>
                <button id="validBtn"> Confirmer </button>
                <button id="backButton">Retour</button>
            </div>
        </React.StrictMode>,
        document.getElementById('root')
    );
    document.getElementById("validBtn").onclick = checkNumber;
}

export function sendMessage(phoneNumber){
    randomizeNumber = generateNumber();
    let dataBody = {
        to: phoneNumber,
        body: randomizeNumber,
        token: process.env.REACT_APP_BDD_TOKEN
    };
    //this.setState({ submitting: true });
    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("Success send message");
            } else {
                console.log("err");
                console.log(data);
            }
        });
    displayVerifDiv();
}