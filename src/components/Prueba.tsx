import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <img
          src="https://source.unsplash.com/400x400/?creative,web"
          alt="Contact"
          className="rounded-2xl shadow-md w-full h-auto"
        />

        {/* Text + Form */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Let’s create something meaningful together!</h2>
          <p className="text-gray-700 mb-6">
            I’d love to hear from you—whether you have a project in mind, a question, or just want to say hi.
            I believe in the power of collaboration, empathy, and well-crafted experiences. Send me a message,
            and I’ll get back to you as soon as I can!
          </p>

          {submitted ? (
            <p className="text-green-600 font-semibold">Thank you for your message! I’ll be in touch soon 😊</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                placeholder="What’s on your mind?"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Let’s talk!
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
