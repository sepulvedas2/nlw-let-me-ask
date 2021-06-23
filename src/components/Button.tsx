import { useState, ButtonHTMLAttributes } from "react";

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
  
function Button(props: ButtonProps) {
    const [counter, setCounter] = useState(0);

    function increment() {
        setCounter(counter +1);
    }
    return (
        <button onClick={increment}>{counter}</button>
    )
}

export default Button;