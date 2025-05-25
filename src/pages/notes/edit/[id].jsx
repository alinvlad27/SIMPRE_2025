import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../../components/NavBar';

export default function EditNote({ setIsLogin }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) {
        setError('Invalid note ID');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          router.push('/login');
          return;
        }
        const res = await fetch(`/api/noteCtrl?id=${id}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('GET response status:', res.status);
        if (!res.ok) {
          const errorData = await res.json();
          console.log('GET error response:', errorData);
          throw new Error(errorData.message || 'Failed to fetch note');
        }
        const data = await res.json();
        console.log('Fetched note:', data);
        if (data && typeof data === 'object' && data.title && data.content) {
          setTitle(data.title);
          setContent(data.content);
          setDate(data.date ? new Date(data.date).toISOString().split('T')[0] : '');
        } else {
          throw new Error('Invalid note data');
        }
      } catch (err) {
        console.error('Error fetching note:', err);
        setError(err.message || 'Failed to load note. Please try again.');
      }
    };
    fetchNote();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const res = await fetch(`/api/noteCtrl?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content, date }),
      });
      console.log('PUT response status:', res.status);
      if (res.ok) {
        router.push('/notes');
      } else {
        const data = await res.json();
        console.log('PUT error response:', data);
        setError(data.message || 'Failed to update note');
      }
    } catch (err) {
      console.error('Error updating note:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507521628349-6e9b2556d4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar setIsLogin={setIsLogin} />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Edit Note</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-black to-blue-900 text-white shadow-md p-6 rounded-lg space-y-6">
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}