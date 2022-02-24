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