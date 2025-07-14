import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Component for adding a new user to the leaderboard
const Adduser = ({ refreshUsers }) => {
  const [name, setName] = useState("");

  // Function to handle adding a user
  const addUser = async () => {
    try {
      // Send a POST request to the backend to add the user
      const res = await axios.post(`${API_URL}/user/add`, { name });
      if (res.data.success) {
        // Show a success toast notification
        toast.success(`${res.data.message}: ${name}`);
      }
      setName("");    // Clear the input field
      refreshUsers(); // Refresh the user list in the parent component
    } catch (error) {
      // Show an error toast if the request fails
      toast.error(error?.response?.data?.message || error.message || "Unknown error");
    }
  };

  return (
    <div className="glass-card flex gap-4 my-6 p-4 rounded-2xl shadow-lg items-center justify-center">
      <Input
        className="w-60 border-0 bg-white/60 backdrop-blur-md rounded-lg px-4 py-2 text-lg shadow-inner focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        placeholder="New user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold border-none shadow-md px-6 py-2 rounded-lg transition-all" onClick={addUser}>Add user</Button>
    </div>
  );
};

export default Adduser;
