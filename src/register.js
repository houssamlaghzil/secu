import './App.css';
import React from "react";

//nom prenom tel email
  function RegisterDiv() {
    return (
      <form>
        <label>
          Nom :
          <input type="text" value="" />
        </label>
        <label>
          Prénom :
          <input type="text" value="" />
        </label>
        <label>
          Tél :
          <input type="text" value="" />
        </label>
        <label>
          Mail :
          <input type="text" value="" />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }

  export default RegisterDiv;