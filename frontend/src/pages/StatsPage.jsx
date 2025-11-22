import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StatsPage = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/links/${code}`);
      setLink(res.data);
    } catch (err) {
      console.error("Error loading stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [code]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading…</p>;

  if (!link) return <p className="text-center text-red-600 mt-10">Not found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Stats for <span className="text-blue-600">"{code}"</span>
        </h1>

        <div className="space-y-5 text-lg">
          <p className="break-all whitespace-normal">
            <strong>Original URL:</strong>{" "}
            <a
              href={link.url}
              target="_blank"
              className="text-blue-600 underline break-all hover:text-blue-800"
            >
              {link.url}
            </a>
          </p>

          <p>
            <strong>Total Clicks:</strong> {link.totalClicks}
          </p>

          <p>
            <strong>Last Clicked:</strong>{" "}
            {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "Never"}
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transform transition hover:scale-105 active:scale-95 duration-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
