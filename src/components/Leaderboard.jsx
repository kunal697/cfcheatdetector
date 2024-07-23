import React, { useContext, useEffect, useState } from 'react';
import UserIdContext from './UserIdContext';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const [leader, setLeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { setUserId } = useContext(UserIdContext);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await fetch('http://localhost:3000/leader');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.count - a.count);
        setLeader(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    setUserId('');
    fetchLeader();
  }, [setUserId]);

  const totalPages = Math.ceil(leader.length / itemsPerPage);
  const currentEntries = leader.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">Error: {error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto mb-20"> {/* Added mb-20 here */}
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Searchboard</h1>
      <p className="text-lg mb-6 text-center text-gray-300">
        This Searchboard showcases the most searched profiles on <span className='font-bold text-yellow-50 font-mono'>CFCheatDetector</span>. The rankings are updated based on the number of searches.
      </p>
      <div className="bg-gray-800 rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-700">
          <li className="flex items-center justify-between p-4 font-bold text-gray-200 bg-gray-900 rounded-t-lg">
            <span>#</span>
            <span>Username</span>
            <span>Searches</span>
          </li>
          {currentEntries.map((entry, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 text-gray-200 hover:bg-gray-700 transition-colors duration-300"
            >
              <span className="font-semibold">
                {((currentPage - 1) * itemsPerPage) + index + 1}.
              </span>
              <Link to={`https://codeforces.com/profile/${entry.username}`} className="font-semibold">
                {entry.username}
              </Link>
              <span>{entry.count}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center space-x-2 mt-6"> 
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded-md text-lg transition-colors duration-300 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-blue-500 hover:bg-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-sm">
          Made by 
          <a 
            href="https://www.linkedin.com/in/kunal-bodke-b29663252" 
            className="text-blue-500 hover:underline ml-1"
          >
            Kunal Bodke
          </a>
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;
