import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';

export default function CreateNote({ setIsLogin }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Data curentă implicit
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
    <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507521628349-6e9b2556d4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar setIsLogin={setIsLogin} />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Create New Note</h1>
        <form onSubmit={handleSubmit} className="bg-blue-900 text-white shadow-md p-4 rounded space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded text-black"
              rows="5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}