import type {User} from "./user/User.ts";
import userPhotoPlaceholder from "../assets/photo-cover.svg"
import {useEffect, useState} from "react";
import axios from "axios";
import "./UserCard.scss"

export default function UserCard({ user }: { user: User }) {
    const [validImage, setvalidImage] = useState(false);
    useEffect(() => {
        axios.get(user.photo).then(response=>{ setvalidImage(response.status==200)})
    }, [user.photo]);
    let position:string = "Designer"
    switch (user.position_id){
        case 1: position = "Lawyer"; break;
        case 2: position = "Content manager"; break;
        case 3: position = "Security"; break;
        case 4: position = "Designer"; break;
    }
    return (
        <div className="user-card">
            <div className="user-image-name">
                <img src={ ( validImage && user.photo) || userPhotoPlaceholder} alt={"user photo"}/>
                <p>{user.name}</p>
                <div className="user-details">
                    <p>{position}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            </div>
        </div>
    )
}