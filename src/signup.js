import React, {Component} from 'react';
import './signup.css';
import CryptoJS from "crypto-js";
var QRCode = require('qrcode.react');

function hiddenQRcode() {
    document.getElementById("hiddenButton").style.visibility = "hidden";
    document.getElementById("QRcode").style.visibility = "hidden";
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataQRcode: '',
            user: {
                firstname: '',
                lastname: '',
                pn: ''
            }
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        }).then(res => res.json())
            .then(data => {
                console.log('test: '+data.status)
                if (data.status === 200) {
                    const cryptedData = CryptoJS.AES.encrypt(JSON.stringify(this.state.user), process.env.REACT_APP_AES_KEY);
                    document.getElementById("QRcode").style.visibility = "visible";
                    this.setState({
                        dataQRcode: cryptedData,
                        user: {
                            firstname: '',
                            lastname: '',
                            pn: ''
                        }
                    });
                }
            });
    }

    onHandleChange(event) {
        const name = event.target.getAttribute('name');
        this.setState({
            user: {...this.state.user, [name]: event.target.value}
        });
    }

    render() {
        const cryptedData = CryptoJS.AES.encrypt(JSON.stringify(this.state.user), process.env.REACT_APP_AES_KEY);
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <div className="signup">
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <div className="QRcode" id="QRcode" style={{visibility:'hidden'}}>
                        <QRCode value={this.state.dataQRcode.toString()}/>
                    </div>
                    <button id="hiddenButton" onClick={() => {hiddenQRcode()}} style={{visibility:'hidden'}}>cacher</button>
                    <input type="text" name="firstname" placeholder="First name" required=""
                           value={this.state.user.firstname}
                           onChange={this.onHandleChange}
                    />
                    <input type="text" name="lastname" placeholder="Last name" required=""
                           value={this.state.user.lastname}
                           onChange={this.onHandleChange}
                    />
                    <input type="text" name="pn" placeholder="Phone number" required=""
                           value={this.state.user.pn}
                           onChange={this.onHandleChange}
                    />
                    <button type="submit">Sign up</button>
                </div>
            </form>
        )
    }
}

export default Signup;
