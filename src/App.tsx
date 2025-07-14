import './App.css'
import Header from "./components/Header.tsx";
import UpperTextField from "./components/UpperTextField.tsx";
import RegistrationForm from "./components/RegistrationForm.tsx";
import UserList from "./components/UserList.tsx";

function App() {
  return (
    <div>
        <Header />
        <UpperTextField />
        <h1>Working with GET request</h1>
        <UserList />
        <h1>Working with POST request</h1>
        <RegistrationForm />
    </div>
  )
}

export default App
