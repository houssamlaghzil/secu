import React, {Component} from 'react';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                if (data.success) {
                    this.setState({
                        user: {
                            firstname: '',
                            lastname: '',
                            pn: ''
                        }
                    });
                }
            });
        console.log(this.state.user.firstname);
        console.log(this.state.user.lastname);
        console.log(this.state.user.pn);
    }

    onHandleChange(event) {
        const name = event.target.getAttribute('name');
        this.setState({
            user: { ...this.state.user, [name]: event.target.value }
        });
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <div className="signup">
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="firstname" placeholder="First name" required=""
                           value={this.state.user.firstname}
                           onChange={this.onHandleChange}
                    />
                    <input type="text" name="lastname" placeholder="Last name" required=""
                           value={this.state.user.lastname}
                           onChange={this.onHandleChange}
                    />
                    <input type="number" name="pn" placeholder="Phone number" required=""
                           value={this.state.user.pn}
                           onChange={this.onHandleChange}
                    />
                    <button type="submit">Sign up</button>
                </div>
            </form>
        )
    }
}

export default Login;
