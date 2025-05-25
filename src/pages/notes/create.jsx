import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';

export default function CreateNote({ setIsLogin }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const res = await fetch('http://localhost:3000/api/noteCtrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content, date }),
    });
    if (res.ok) {
      router.push('/notes');
    } else {
      alert('Failed to create note');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: "url('https://st4.depositphotos.com/18186852/40791/i/450/depositphotos_407914094-stock-photo-bright-colored-sticky-notes-blue.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar setIsLogin={setIsLogin} />
      <div className="max-w-lg mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">Create a New Note</h1>
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter note title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="5"
              placeholder="Write your note here..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
}