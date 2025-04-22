// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // TODO: Fetch user-specific data (listings, requests)
  const [myListings, setMyListings] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // --- TODO: Replace with actual API calls ---
            // const listingsRes = await fetch('/api/users/me/listings'); // Needs auth
            // const incomingReqRes = await fetch('/api/users/me/requests/incoming');
            // const outgoingReqRes = await fetch('/api/users/me/requests/outgoing');
            // Simulate fetch
            await new Promise(res => setTimeout(res, 800));
            setMyListings([ { _id: '1', title: 'The Great Gatsby' }, { _id: '6', title: 'The Hobbit' } ]);
            setIncomingRequests([ { _id: 'req1', bookTitle: 'The Great Gatsby', requesterName: 'Bob' } ]);
            setOutgoingRequests([ { _id: 'req2', bookTitle: '1984', status: 'Pending' } ]);
             // --- End Simulation ---
        } catch (err) {
             setError('Failed to load dashboard data.');
             console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  // Placeholder action handlers
  const handleAcceptRequest = (requestId) => console.log("Accept request:", requestId);
  const handleDeclineRequest = (requestId) => console.log("Decline request:", requestId);
  const handleCancelRequest = (requestId) => console.log("Cancel request:", requestId);
  const handleRemoveListing = (listingId) => console.log("Remove listing:", listingId);

  if (loading) return <p className="text-center py-10">Loading Dashboard...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-serif text-brand-brown mb-8">My Dashboard</h1>

      {/* TODO: Implement Tabbed navigation or better layout */}
      <div className="space-y-10">

        {/* My Listings Section */}
        <section>
           <h2 className="text-2xl font-semibold font-sans text-gray-800 mb-4 border-b pb-2">My Listings</h2>
           {myListings.length === 0 ? (
                <p className="text-gray-500">You haven't listed any books yet. <Link to="/add-book" className="text-brand-brown hover:underline">Add one now!</Link></p>
           ) : (
               <ul className="space-y-3">
                 {myListings.map(listing => (
                    <li key={listing._id} className="flex justify-between items-center p-3 bg-white rounded shadow-sm">
                        <Link to={`/book/${listing._id}`} className="text-link-text hover:text-brand-brown font-medium">{listing.title}</Link>
                        <button onClick={() => handleRemoveListing(listing._id)} className="text-sm text-red-600 hover:text-red-800">Remove</button>
                    </li>
                 ))}
               </ul>
           )}
        </section>

         {/* Incoming Requests Section */}
        <section>
           <h2 className="text-2xl font-semibold font-sans text-gray-800 mb-4 border-b pb-2">Incoming Requests</h2>
            {incomingRequests.length === 0 ? (
                 <p className="text-gray-500">No one has requested your books yet.</p>
            ) : (
               <ul className="space-y-3">
                 {incomingRequests.map(req => (
                    <li key={req._id} className="p-3 bg-white rounded shadow-sm">
                        <p className="mb-1"><span className="font-medium">{req.requesterName}</span> requested <span className="font-medium">{req.bookTitle}</span></p>
                        {/* TODO: Add request details link */}
                        <div className="flex gap-x-3 mt-2">
                            <button onClick={() => handleAcceptRequest(req._id)} className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">Accept</button>
                            <button onClick={() => handleDeclineRequest(req._id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Decline</button>
                        </div>
                    </li>
                 ))}
               </ul>
            )}
        </section>

         {/* Outgoing Requests Section */}
         <section>
           <h2 className="text-2xl font-semibold font-sans text-gray-800 mb-4 border-b pb-2">Outgoing Requests</h2>
             {outgoingRequests.length === 0 ? (
                 <p className="text-gray-500">You haven't requested any books.</p>
            ) : (
               <ul className="space-y-3">
                 {outgoingRequests.map(req => (
                    <li key={req._id} className="flex justify-between items-center p-3 bg-white rounded shadow-sm">
                        <span>Requested: <span className="font-medium">{req.bookTitle}</span></span>
                         {/* TODO: Add request details link */}
                        <span className="text-sm text-gray-500 mr-4">Status: {req.status}</span>
                        {req.status === 'Pending' && (
                             <button onClick={() => handleCancelRequest(req._id)} className="text-sm text-gray-600 hover:text-red-700">Cancel</button>
                        )}
                    </li>
                 ))}
               </ul>
            )}
        </section>

      </div>
    </div>
  );
};

export default DashboardPage;