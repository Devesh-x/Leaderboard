import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Component for selecting a user and claiming random points for them
const UserSelector = ({onPointsClaimed}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/user/getall`);
            setUsers(res.data.users);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message || "Unknown error");
        }
    };

    const claimPoints = async () => {
        if (!selectedUser) {
            alert("Please select a user");
            return;
        }
        const randomPoints = Math.floor(Math.random() * 10) + 1;
        try {
            const res = await axios.put(
                `${API_URL}/points/add/${selectedUser}`,
                { points: randomPoints }
            );
            if(res.data.success){
                toast.success(`${randomPoints} ${res.data.message} to ${res.data.user.name}`);
            }
            if (onPointsClaimed) {
                onPointsClaimed();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Unknown error");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [users]);

    return (
        <div className="glass-card my-6 flex items-center gap-6 p-4 rounded-2xl shadow-lg justify-center">
            <Select onValueChange={setSelectedUser} value={selectedUser} >
                <SelectTrigger className="w-[220px] border-0 bg-white/60 backdrop-blur-md rounded-lg px-4 py-2 text-lg shadow-inner focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition">
                    <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                    {users.map(user => (
                        <SelectItem key={user._id} value={user._id}>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold border-none shadow-md px-6 py-2 rounded-lg transition-all" onClick={claimPoints}>Claim Points</Button>
        </div>
    );
};

export default UserSelector;