import {useEffect, useState} from "react";
import axios from "axios";
import type { User } from "./user/User";
import UserCard from "./UserCard";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setcurrentPage] = useState(2);
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        axios
            .get("https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6")
            .then((response) => {
                setUsers(response.data.users);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
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
                    setcurrentPage(currentPage + 1);
                }}>
                Show more
            </button>
            }
        </div>
    );
    
    function ShowMoreUsersButtonHandle(nextPageNumber: number) {
        console.log(nextPageNumber)
        axios
            .get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${nextPageNumber}&count=6`)
            .then((response) => {
                if(response.data.links.next_url==null){
                    setLastPage(true);
                }
                setUsers(users.concat(response.data.users));
                return nextPageNumber;
            })
    }
}