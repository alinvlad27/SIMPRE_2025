import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Notes({ setIsLogin }) {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('/api/records', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setNotes(data);
        } catch (err) {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };
    fetchNotes();
  }, [router]);

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/records?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      router.push('/login');
    }
  };

  const logoutSubmit = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    router.push('/login');
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-100 to-white shadow-lg">
        <div className="flex space-x-2">
          <h2 className="text-2xl font-light bg-black text-transparent bg-clip-text">
            <span className="text-4xl">A</span>plicatie
          </h2>
          <h2 className="text-2xl font-light bg-black text-transparent bg-clip-text">
            <span className="text-4xl">C</span>loud
            <span className="text-4xl">C</span>omputing
          </h2>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/notes" className="text-xl text-black hover:text-green-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/notes/create" className="text-xl text-black hover:text-green-500 transition">
              Create Note
            </Link>
          </li>
          <li>
            <Link href="/notes/about" className="text-xl text-black hover:text-green-500 transition">
              About
            </Link>
          </li>
          <li>
            <button
              onClick={logoutSubmit}
              className="text-xl text-black hover:text-green-500 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <section className="max-w-7xl mx-auto mt-4 flex flex-wrap justify-around">
        {notes.map((note) => (
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
        ))}
      </section>
    </div>
  );
}