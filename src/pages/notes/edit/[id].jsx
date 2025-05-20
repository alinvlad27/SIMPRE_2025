import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditNote() {
  const [note, setNote] = useState({ title: '', content: '', date: '', id: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('token');
      if (id && token) {
        try {
          const res = await fetch(`/api/records?id=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setNote({
            title: data.title,
            content: data.content,
            date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
            id: data._id,
          });
        } catch (err) {
          router.push('/login');
        }
      }
    };
    getNote();
  }, [id, router]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/records?id=${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          date: note.date,
        }),
      });
      router.push('/notes');
    } catch (err) {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-gradient-to-r from-black to-blue-600 text-white rounded-lg">
      <h2 className="text-2xl uppercase tracking-wider mb-4">Edit Note</h2>
      <form onSubmit={editNote} className="space-y-4">
        <div>
          <label htmlFor="title" className="block uppercase font-semibold tracking-wider">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={onChangeInput}
            required
            className="w-full p-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="content" className="block uppercase font-semibold tracking-wider">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={onChangeInput}
            required
            rows="10"
            className="w-full p-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="date" className="block uppercase font-semibold tracking-wider">
            Date: {note.date}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={onChangeInput}
            className="w-full p-2 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-blue-900 font-bold uppercase tracking-wider p-2 rounded hover:bg-blue-500 hover:text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}