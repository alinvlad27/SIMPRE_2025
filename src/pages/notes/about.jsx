import NavBar from '../../components/NavBar';

export default function About({ setIsLogin }) {
  return (
    <div className="min-h-screen" style={{ backgroundImage: "url('https://st4.depositphotos.com/18186852/40791/i/450/depositphotos_407914094-stock-photo-bright-colored-sticky-notes-blue.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar setIsLogin={setIsLogin} />
      <div className="max-w-3xl mx-auto p-6 mt-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6 drop-shadow-lg">About This App</h1>
        <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl shadow-2xl p-8 text-gray-200">
          <p className="text-lg mb-4">
            Welcome to <span className="font-semibold text-blue-400">Aplicatie Cloud Computing</span>, a sleek and modern note-taking application built with Next.js and MongoDB.
          </p>
          <p className="text-lg mb-4">
            This app allows you to create, edit, and manage your notes with ease. Whether you're jotting down ideas, planning your day, or keeping track of important tasks, we've got you covered.
          </p>
          <p className="text-lg">
            Features include:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Secure user authentication</li>
              <li>Easy note creation and editing</li>
              <li>Customizable note dates</li>
              <li>Responsive and modern design</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}