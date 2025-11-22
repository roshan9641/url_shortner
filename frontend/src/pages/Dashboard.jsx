import { useEffect, useState } from "react";
import axios from "axios";
import LinkForm from "../components/LinkForm";
import LinksTable from "../components/LinksTable";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/links`);
      setLinks(res.data);
    } catch (err) {
      console.error("Failed to load links", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const filteredLinks = links.filter((link) =>
    link.code.toLowerCase().includes(search.toLowerCase()) ||
    link.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          URL Shortener
        </h1>

        <LinkForm refresh={fetchLinks} />

        <input
          type="text"
          placeholder="Search by code or URL"
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 bg-gray-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        ) : filteredLinks.length === 0 ? (
          <p className="text-center mt-6 text-gray-500">No links found</p>
        ) : (
          <LinksTable links={filteredLinks} refresh={fetchLinks} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
