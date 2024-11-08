import { Target } from 'puppeteer-core';
import { useState } from 'react';

function FormTest(){
    const [name, setName] = useState("");
    const sub = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`)
      }
   return (
    <form onSubmit={sub}>
      <label>Enter your name:
        <input
         type="text"
         value={name}
         onChange={(e) => setName(e.target.value)}
          

          />
      </label>
      <input type="submit" />
    </form>
   )
    
}
export default FormTest