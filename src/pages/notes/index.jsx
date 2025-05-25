import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavBar from '../../components/NavBar';

export default function Notes({ setIsLogin }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          router.push('/login');
          return;
        }
        const res = await fetch('http://localhost:3000/api/noteCtrl', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await res.json();
        console.log('Fetched notes:', data);
        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Failed to load notes. Please try again.');
        router.push('/login');
      }
    };
    fetchNotes();
  }, [router]);

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/noteCtrl?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      router.push('/login');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507521628349-6e9b2556d4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar setIsLogin={setIsLogin} />
      <section className="max-w-7xl mx-auto mt-4 flex flex-wrap justify-around">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {notes.length === 0 ? (
          <div className="text-center w-full">
            <p className="text-gray-500 mb-4">No notes found. Create a new note!</p>
            <Link href="/notes/create" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Create New Note
            </Link>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="w-72 bg-blue-900 text-white shadow-md p-4 m-4 relative rounded"
            >
              <h4 className="truncate">{note.title}</h4>
              <div className="h-36 overflow-hidden">
                <p>{note.content}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-wheat">{formatDate(note.date)}</span>
                <Link href={`/notes/edit/${note._id}`} className="text-blue-300 hover:text-blue-500">
                  Edit
                </Link>
              </div>
              <button
                onClick={() => deleteNote(note._id)}
                className="absolute top-0 right-2 text-red-500 font-bold"
              >
                X
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}