import NavBar from '../../components/NavBar';

export default function About({ setIsLogin }) {
  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507521628349-6e9b2556d4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar setIsLogin={setIsLogin} />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">About</h1>
        <p>This is a simple note-taking application built with Next.js and MongoDB.</p>
      </div>
    </div>
  );
}