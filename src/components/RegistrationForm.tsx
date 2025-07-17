import axios from "axios";
import {useRef, useState} from "react";
import SuccessImage from "../assets/successImage.svg";
import "./RegistrationForm.scss"
import TextField from '@mui/material/TextField';

export default function RegistrationForm({onSuccess}: {onSuccess: ()=>void}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [fileName, setFileName] = useState("Upload your photo");
    if (success) {
        return (
            <div className="RegistrationFormContainer">
                <img src={SuccessImage} alt={"success image"} />
            </div>
        )
    }
    return (
        <div className="RegistrationFormContainer">
            <form ref={formRef} onSubmit={(e) => {
                e.preventDefault();
                const form = formRef.current!;
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                const formData = new FormData(form);
                handleSubmit(formData);
            }}>
                <TextField id="outlined-basic" label="Your name" variant="outlined"  name="name" required={true} />
                <TextField id="outlined-basic" type="email" name="email" required={true} label="Email"/>
                <TextField id="outlined-basic"
                           type="tel" name="phone" required={true}
                           label="Phone" helperText={"+38 (XXX) XXX - XX - XX"}
                />

                <div className="positions">
                    <p>Select your position</p>
                    <div className="position-container">
                        <input type="radio" id="Lawyer" name="position_id" value="1" required={true}/>
                        <label htmlFor="Lawyer">Lawyer</label>
                        <input type="radio" id="Content-manager" name="position_id" value="2" required={true}/>
                        <label htmlFor="Content-manager">Content manager</label>
                        <input type="radio" id="Security" name="position_id" value="3" required={true}/>
                        <label htmlFor="Security">Security</label>
                        <input type="radio" id="Designer" name="position_id" value="4" required={true}/>
                        <label htmlFor="Designer">Designer</label>
                    </div>
                </div>
                <div className="file-upload-wrapper">
                    <label htmlFor="photo">Upload</label>
                    <span className="upload-text">{fileName}</span>
                    <input
                        id="photo"
                        type="file"
                        name="photo"
                        accept="image/jpeg"
                        required
                        className="file-selector"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFileName(file.name);
                            } else {
                                setFileName("Upload your photo");
                            }
                        }}
                    />
                </div>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                <button type="submit" formAction={formData => {
                    handleSubmit(formData)
                }}>Sign up
                </button>
            </form>
        </div>
    )

    function handleSubmit(formData: FormData) {
        const file = formData.get("photo") as File;
        if (file && file.size > 5227520) {
            setErrorMessage("File size must be less than 5MB.");
            return;
        }

        const phone = formData.get("phone") as string;
        if (phone && !phone.startsWith("+380")) {
            setErrorMessage("Phone number must start with +380");
            return;
        }
        if (phone && isNaN(Number(phone))) {
            setErrorMessage("Phone must only include digits");
            return;
        }

        axios.get("https://frontend-test-assignment-api.abz.agency/api/v1/token").then((response) => {
            const token = response.data.token;
            axios.post("https://frontend-test-assignment-api.abz.agency/api/v1/users",
                formData, {
                    headers: {
                        Token: token,
                    },
                }).then(response => {
                    if(response.status==201) {
                        setSuccess(true);
                        onSuccess();
                    }
            }).catch(error => {
                setErrorMessage(error.response.data.message);
            })
        })
    }
}