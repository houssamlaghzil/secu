import QRCode from "qrcode.react";
import React from "react";
import {startScan} from "./scanner";

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
        document.getElementById("resultDiv").innerHTML="Bravo !!";
    }
    else{
        document.getElementById("resultDiv").innerHTML="Mauvais code !!";
    }
}

function displayVerifDiv(){
    document.getElementById("scanDiv").style.visibility = "hidden";
    document.body.innerHTML += verifDiv();
    document.getElementById("validBtn").onclick = checkNumber;
    console.log(randomizeNumber); // Remove later
}

function verifDiv(){
    return (
        '<div>'+
            '<input id="numberInput" type="number"/>'+
            '<button id="validBtn"> Confirmer </button>'+
            '<p id="resultDiv"></p>'+
        '</div>'
    );
}

export function sendMessage(phoneNumber){
    console.log(phoneNumber)
    randomizeNumber = generateNumber();
    displayVerifDiv();
}