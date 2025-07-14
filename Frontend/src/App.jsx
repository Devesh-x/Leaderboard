import img from './assets/bg.jpg'
import { useEffect, useState } from "react";
import axios from "axios";
import UserSelector from "./components/UserSelector";
import Adduser from "./components/Adduser";  // fixed casing
import Leaderboard from "./components/Leaderboard";
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
    // State to hold all users, the selected user, and the leaderboard
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

    // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getall`);
      setUsers(res.data.users);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Unknown error");
    }
  };

  // Fetch the sorted leaderboard from the backend
  const fetchLeaderboard = async () => {
    try {
      // Show a toast notification when the leaderboard is refreshed
      const res = await axios.get(`${API_URL}/user/sorted`);
      if(res.data.success){
        toast.success(res.data.message);
      }
      setLeaderboard(res.data.users);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Unknown error");
    }
  };
// Refresh both users and leaderboard data
  const refreshData = async () => {
    await fetchUsers();
    await fetchLeaderboard();
  };
 
  // Fetch data when the component mounts
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="modern-glass p-8 max-w-screen mx-auto min-h-screen">
      {/* Navbar */}
      <nav className="glass-card w-full mb-10 px-8 py-4 flex items-center justify-between shadow-lg rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1
          className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg"
          style={{
            textShadow: "0 2px 8px rgba(99,102,241,0.5), 0 1px 0 #fff"
          }}
        >
          Leaderboard System
        </h1>
        {/* You can add nav links or a logo here if needed */}
      </nav>
      <div className='flex flex-col items-center justify-center '>
        <UserSelector 
          users={users} 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser}
          onPointsClaimed={refreshData}
        />
        <Adduser refreshUsers={refreshData} />
      </div>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default App;
