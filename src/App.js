import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CSRFToken from './CSRFToken';

class App extends React.Component {


  constructor(props) {
    super(props);
    // CSRFToken();
    
    // this.login();
    // this.signup();
    // delay(10);
    // this.signup();
    // this.test();
  }

  generationRandomString = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYG1234567890abcdefghijklmnopqrstuvwxyg";
    for (let i = 0 ; i < length ; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  generateCsrfToken = () => {
    return btoa(this.generationRandomString(32));
  }


  login = async () => {
    let value = this.generateCsrfToken();
    // document.cookie = 'CSRF_TOKEN='+value;
    const aa = await axios.post("http://localhost:8080/user/api/v1/login", 
                                {email: 'ekfrl2815@gmail.com', password: 'aaa'}, 
                                {withCredentials: true, 
                                  headers: {'Content-type': 'application/json',
                                            'X-CSRF-TOKEN': value}}, 
);
    console.log(aa.headers);
    console.log(aa.data.data);
  }

  signup = async () => {
    let value = this.generateCsrfToken();
    document.cookie = 'CSRF_TOKEN='+value;
    const aa = await axios.post("http://localhost:8080/user/api/v1/signup", 
                                {email: 'ekfrl2815@gmail.com', password: 'aaa', nickname: '한발로걷는개'}, 
                                {withCredentials: true, 
                                  headers: {'Content-type': 'application/json',
                                            'X-CSRF-TOKEN': value}}, 
);
    console.log(aa.headers);
    console.log(aa.data.data);
  }



  
  signup = () => {
    let value = this.generateCsrfToken();
    document.cookie = 'CSRF_TOKEN='+value;
    const aa = axios.post("http://localhost:8081/user/api/v1/user", 
                                {email: 'ekfrl2812@gmail.com', password: 'aaa', nickname: '열한발로걷는개'}, 
                                {withCredentials: true, 
                                  headers: {'Content-type': 'application/json',
                                            'X-CSRF-TOKEN': value}}, 
);
    // console.log(aa.data.data);
  }

  test = async () => {
    const aa = await axios.get("http://localhost:8081/user/api/v1/test", 
    { headers: {'Content-Type': 'application/json',
                'X-CSRF-TOKEN' : this.generateCsrfToken()},
              Cookie: "CSRF_TOKEN=" + this.generateCsrfToken()} );
    // console.log(aa.data.data);
  }

  // login = async () => {
  //   const aa = await axios.post("http://13.124.86.90:8080/user/api/v1/login", {email: 'ekfrl2815@gmail.com', password: 'aaa'}, 
  //   { headers: {'Content-type': 'application/json'}} );
  //   console.log(aa.data.data);
  // }

  // test = async () => {
  //   const aa = await axios.get("http://13.124.86.90:8080/user/api/v1/test", 
  //   { headers: {'Content-type': 'application/json',
  //               '_csrf' : this.generateCsrfToken()},
  //             Cookie: "CSRF_TOKEN=" + this.generateCsrfToken()} );
  //   console.log(aa.data.data);
  // }



 render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <button className="btn btn-primary" style={{marginRight:'3rem'}} onClick={this.login}>Login</button>
        <button className="btn btn-primary" style={{marginRight:'3rem'}} onClick={this.signup}>signup</button>
        <button className="btn btn-primary" style={{marginRight:'3rem'}} onClick={this.test}>test</button>
      </header>
      {/* <CSRFToken/> */}
    </div>
  );
 }

}

export default App;
