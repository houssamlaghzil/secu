import logo from './logo.svg';
import './App.css';

function App() {
  const React = require('react');
  const QRCode = require('qrcode.react');

  return (

    <div className="App">
      <QRCode value="https://www.npmjs.com/package/qrcode.react" />
    </div>
  );
}

export default App;
