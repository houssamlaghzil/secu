import ScannerDiv from "./scanner";
import ReactDOM from "react-dom";
import React from "react";

let randomizeNumber;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function generateNumber(){
    return getRandomInt(9999)
}

function checkNumber(){
    let userValue = document.getElementById("numberInput").value;
    if(parseInt(userValue) === randomizeNumber){
        document.getElementById("resultDiv").innerHTML='<p>"Bravo !!"</p> <button id="backButton">Retour</button>';
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
        document.getElementById("resultDiv").innerHTML="Mauvais code !!";
    }
}

function displayVerifDiv(){
    ReactDOM.render(
        <React.StrictMode>
            <div>
                <input id="numberInput" type="number"/>
                <button id="validBtn"> Confirmer </button>
                <p id="resultDiv"/>
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
        body: randomizeNumber
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