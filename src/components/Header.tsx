import Logo from "../assets/Logo.svg"
import "./Header.scss"

export default function Header(){
    return (
        <div className="Header">
            <img src={Logo} alt="Testtask logo" />
            <div className="Button-container">
                <button>Users</button>
                <button>Sign up</button>
            </div>
        </div>
    )
}