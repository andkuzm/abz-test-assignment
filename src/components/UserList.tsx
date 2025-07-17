import {useEffect, useState} from "react";
import axios from "axios";
import type { User } from "./user/User";
import UserCard from "./UserCard";
import "./UserList.scss"

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setcurrentPage] = useState("");
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        axios
            .get("https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6")
            .then((response) => {
                setUsers(response.data.users);
                setcurrentPage(response.data.links.next_url)
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="UserListMainContainer">
            <ul>
                {users.map((user) => (
                    <li key={user.email}>
                        <UserCard user={user} />
                    </li>
                ))}
            </ul>
            { !lastPage &&
                <button onClick={() => {
                    ShowMoreUsersButtonHandle(currentPage)
                }}>
                Show more
            </button>
            }
        </div>
    );
    
    function ShowMoreUsersButtonHandle(nextPageUrl: string) {
        axios
            .get(nextPageUrl)
            .then((response) => {
                if(response.data.links.next_url==null){
                    setLastPage(true);
                }
                setUsers(users.concat(response.data.users));
            })
    }
}