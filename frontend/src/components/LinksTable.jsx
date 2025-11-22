import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LinksTable = ({ links, refresh }) => {
  const handleDelete = async (code) => {
    await axios.delete(`${BASE_URL}/api/links/${code}`);
    refresh();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Code</th>
            <th className="p-3">URL</th>
            <th className="p-3">Clicks</th>
            <th className="p-3">Last Clicked</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l) => (
            <tr key={l.code} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 font-semibold text-blue-600">
                <a href={`${BASE_URL}/${l.code}`} target="_blank">{l.code}</a>
              </td>
              <td className="p-3 truncate max-w-xs">{l.url}</td>
              <td className="p-3">{l.totalClicks}</td>
              <td className="p-3">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "-"}</td>

              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${BASE_URL}/${l.code}`);
                    alert("Copied!");
                  }}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg cursor-pointer transform transition hover:scale-105 active:scale-95 duration-200"
                >
                  Copy
                </button>

                <Link
                  to={`/code/${l.code}`}
                  className="bg-gray-700 text-white px-4 py-1 rounded-lg cursor-pointer transform transition hover:scale-105 active:scale-95 duration-200"
                >
                  Stats
                </Link>

                <button
                  onClick={() => handleDelete(l.code)}
                  className="bg-red-600 text-white px-4 py-1 rounded-lg cursor-pointer transform transition hover:scale-105 active:scale-95 duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksTable;
