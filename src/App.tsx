import './App.css'
import Header from "./components/Header.tsx";
import UpperTextField from "./components/UpperTextField.tsx";
import RegistrationForm from "./components/RegistrationForm.tsx";
import UserList from "./components/UserList.tsx";
import {useRef, useState} from "react";
import "@fontsource/nunito";

function App() {

    const [reloadKey, setReloadKey] = useState(0);
    const myRef = useRef(null);


    const executeScroll = () => {
        if (myRef.current) {
            myRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            console.log("went wrong");
        }
    }

    function triggerListRefresh() {
        setReloadKey(prev => prev + 1);
        executeScroll();
    }

  return (
    <div id="main-container">
        <Header />
        <UpperTextField />
        <br className="working-with-text"/>
        <h1>Working with GET request</h1>
        <div ref={myRef}/>
        <UserList key={reloadKey}/>
        <br className="working-with-text"/>
        <h1>Working with POST request</h1>
        <RegistrationForm onSuccess={triggerListRefresh} />
    </div>
  )
}

export default App
