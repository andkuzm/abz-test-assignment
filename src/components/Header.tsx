import Logo from "../assets/Logo.svg"

export default function Header(){
    return (
        <div>
            <img src={Logo} alt="Testtask logo" />
            <div>
                <button>Users</button>
                <button>Sign up</button>
            </div>
        </div>
    )
}