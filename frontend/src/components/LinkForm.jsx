import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LinkForm = ({ refresh }) => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/links`, { url, code });
      setUrl("");
      setCode("");
      refresh();
    } catch (err) {
      if (err.response?.status === 409) setError("Code already exists");
      else setError(err.response?.data?.message || "Error creating link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Paste your long URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
        required
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-3 rounded-lg cursor-pointer transform hover:scale-105 active:scale-95 duration-200"
      >
        {loading ? "Creating..." : "Create Short Link"}
      </button>
    </form>
  );
};

export default LinkForm;
