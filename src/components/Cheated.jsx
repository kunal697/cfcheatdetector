import React, { useContext, useEffect, useState } from 'react';
import UserIdContext from './UserIdContext';
import loadingImg from '../assets/loadingImg.png'

function Cheated() {
    const { UserId } = useContext(UserIdContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contestdata, setContestData] = useState([]);
    const [cheatedContests, setCheatedContests] = useState([]);
    const [contestV, setContestV] = useState(false);
    const [queNum, setQuenum] = useState(0);

    useEffect(() => {
        setError(null);
        const fetchData = async () => {
            setLoading(true);
            try {
                if (UserId !== '') {
                    const response = await fetch(`https://codeforces.com/api/user.status?handle=${UserId}`);
                    const result = await response.json();
                    if(result.status !=='OK') {
                        setError(`UserId ${UserId} not found!`);
                    } else if (result.status === 'OK') {
                        const solved = result.result
                            .filter(submission => submission.author.participantType === 'CONTESTANT' || submission.author.participantType === 'OUT_OF_COMPETITION' )
                            .reduce((acc, submission) => {
                                if (!acc[submission.contestId]) {
                                    acc[submission.contestId] = {
                                        contestId: submission.contestId,
                                        Problems: 0,
                                        skippedProblems: 0
                                    };
                                } 
                                acc[submission.contestId].Problems++;
                                 if (submission.verdict === 'SKIPPED') {
                                    acc[submission.contestId].skippedProblems++;
                                }
                                return acc;
                            }, {});
                        const cheatedContests = Object.values(solved)
                            .filter(contest => {
                                
                                return contest.Problems > 1 && contest.skippedProblems === contest.Problems;
                            });

                        setData(cheatedContests);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchContests = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://codeforces.com/api/contest.list');
                const result = await response.json();
                if (result.status === 'OK') {
                    const sortedContests = result.result
                        .filter(contest => contest.phase === 'FINISHED')
                        .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);
                    setContestData(sortedContests);
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
        fetchContests();

        return () => {
            setContestV(false);
        };
    }, [UserId]);

    useEffect(() => {
        if (contestdata.length > 0) {
            const solvedContestIds = new Set(data.map(contest => contest.contestId));
            const solvedContests = contestdata.filter(contest => solvedContestIds.has(contest.id));
            setCheatedContests(solvedContests);
            setQuenum(solvedContests.length);
        }
    }, [data]);

    if (UserId === '') {
        return <p className='text-lg font-sans text-white m-5'></p>;
    }

    if (loading || contestdata.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center p-5 text-black'>
                <img src={loadingImg} alt='Loading...' className='m-5 w-20 ' />
                <p className='text-lg font-sans text-white m-5'>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <p className='text-lg font-sans text-white m-5'>{error}</p>;
    }

    if (queNum === 0 && UserId !== '') {
        return <p className='text-lg font-sans text-white m-5'>{UserId} is a legit person!!</p>;
    }

    return (
        <div className='flex flex-col items-center justify-center p-5 text-black'>
            <p className='text-lg font-sans text-white m-5'>{UserId} Cheated in {queNum} Contest(s)!!</p>

            <div className='flex'>
                <button onClick={() => setContestV(!contestV)} className='bg-cyan-800 text-white lg:py-2 py-4 px-4 rounded-xl font-bold mb-5 mr-4'>
                    {contestV ? 'Hide Cheated Contests' : 'View Cheated Contests'}
                </button>
                
          <button
            className='bg-gray-700 text-white lg:py-2 py-4 px-4 rounded-xl font-bold mb-5'
            onClick={() => window.open('https://solvecp-ac.netlify.app', '_blank')} >
            Try this!
        </button>
            </div>

            {contestV && (
                <div className='flex items-center justify-center p-5'>
                    <table className='table-auto border-collapse bg-white rounded-xl min-w-[9cm] max-w-[15cm]'>
                        <thead className='font-bold'>
                            <tr className='border-b border-gray-800'>
                                <th className='p-3'>Contest ID</th>
                                <th className='p-3'>Contest Name</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold'>
                            {cheatedContests.map((contest, index) => (
                                <tr key={index} className='mb-5 border-b border-gray-800'>
                                    <td className='p-3' style={{ borderRadius: '0.75rem' }}>
                                        <a href={`https://codeforces.com/submissions/${UserId}/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                                            {contest.id}
                                        </a>
                                    </td>
                                    <td className='p-3' style={{ borderRadius: '0.75rem' }}>
                                        <a href={`https://codeforces.com/submissions/${UserId}/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                                            {contest.name}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default Cheated;
