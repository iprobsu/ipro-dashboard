import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/data");
      setData(res.data);
      setActiveTab(Object.keys(res.data)[0]);
    };
    fetchData();
  }, []);

  const filteredData = (records) => {
    return records.filter((record) =>
      Object.values(record).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 IP Dashboard</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 w-64"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(data).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="overflow-auto rounded-md border border-zinc-200 dark:border-zinc-700">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
            <tr>
              {data[activeTab]?.length > 0 &&
                Object.keys(data[activeTab][0]).map((col) => (
                  <th key={col} className="text-left p-2 border-b dark:border-zinc-600">
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData(data[activeTab] || []).map((row, idx) => (
              <tr
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-zinc-900"
                    : "bg-zinc-50 dark:bg-zinc-800"
                }
              >
                {Object.values(row).map((cell, i) => (
                  <td key={i} className="p-2 border-b dark:border-zinc-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
