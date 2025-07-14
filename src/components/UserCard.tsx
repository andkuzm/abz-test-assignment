import type {User} from "./user/User.ts";
import userPhotoPlaceholder from "../assets/photo-cover.svg"
import {useEffect, useState} from "react";
import axios from "axios";

export default function UserCard({ user }: { user: User }) {
    const [validImage, setvalidImage] = useState(false);
    useEffect(() => {
        axios.get(user.photo).then(response=>{ setvalidImage(response.status==200)})
    }, [user.photo]);
    return (
        <div>
            <img src={ ( validImage && user.photo) || userPhotoPlaceholder} alt={"user photo"}/>
            <p>{user.name}</p>
            <br/>
            <p>{user.position_id}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
        </div>
    )
}