import { useState } from "react";

function ChatForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startChat = () => {
    if (!form.name || !form.email) {
      alert("Name & Email required");
      return;
    }

    if (window.Tawk_API) {
      window.Tawk_API.setAttributes({
        name: form.name,
        email: form.email,
        phone: form.phone,
      }, function(error){});

      window.Tawk_API.maximize();
    }
  };

  return (
    <div className="chat-form">
      <h3>Start Chat</h3>

      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <textarea name="message" placeholder="Question" onChange={handleChange} />

      <button onClick={startChat}>Start Chat</button>
    </div>
  );
}

export default ChatForm;