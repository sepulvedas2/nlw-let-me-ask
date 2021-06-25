import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
  
function Button(props: ButtonProps) {
    return (
        <button className="button" {...props}></button>
    )
}

export default Button;