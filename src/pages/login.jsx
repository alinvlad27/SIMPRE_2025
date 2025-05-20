import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('/api/users/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setIsLogin(data);
          if (!data) localStorage.removeItem('token');
        } catch (err) {
          setIsLogin(false);
          localStorage.removeItem('token');
        }
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, [setIsLogin]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('');
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.name,
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      setUser({ name: '', email: '', password: '' });
      setErr(data.msg);
      if (res.ok) setShowLogin(true);
    } catch (err) {
      setErr(err.message);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ name: '', email: '', password: '' });
        localStorage.setItem('token', data.token);
        setIsLogin(true);
        router.push('/notes');
      } else {
        setErr(data.msg);
      }
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-blue-600">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
        {showLogin ? (
          <form onSubmit={loginSubmit} className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Log in</h3>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            <p className="text-sm text-center">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => setShowLogin(false)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Register now
              </span>
            </p>
            {err && <p className="text-red-500 text-center">{err}</p>}
          </form>
        ) : (
          <form onSubmit={registerSubmit} className="space-y-4">
            <h3 className="text-2xl font-bold text-center">Register</h3>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChangeInput}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
            <p className="text-sm text-center">
              Have an account?{' '}
              <span
                onClick={() => setShowLogin(true)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Login now
              </span>
            </p>
            {err && <p className="text-red-500 text-center">{err}</p>}
          </form>
        )}
      </div>
    </section>
  );
}