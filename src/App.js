import logo from './logo.svg';
import './App.css';

function App() {
  var React = require('react');
  var QRCode = require('qrcode.react');
  return (
    <div className="App">
      <QRCode value="https://facebook.github.io/react/" />,
    </div>
  );
}

export default App;
