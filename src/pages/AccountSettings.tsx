import { useState } from "react";

export default function AccountSettings() {
  const [name, setName] = useState("Sana");
  const [email, setEmail] = useState("sana@gmail.com");
  const [contact, setContact] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleSave = () => {
  const userData = {
    name,
    email,
    contact,
    linkedin,
  };

  localStorage.setItem("user", JSON.stringify(userData));

  alert("Profile Updated!");
};

  return (
    <div className="max-w-xl mx-auto p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded bg-white/5 border border-white/10"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/5 border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contact Number"
          className="w-full p-3 rounded bg-white/5 border border-white/10"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type="text"
          placeholder="LinkedIn URL"
          className="w-full p-3 rounded bg-white/5 border border-white/10"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full py-3 bg-neon-teal text-midnight font-bold rounded-xl"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}