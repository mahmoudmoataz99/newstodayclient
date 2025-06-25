import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    setOpen(false);
    navigate('/');
  };

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white py-6 px-4 sm:px-10 w-full">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Link to="/" className="text-3xl sm:text-4xl font-bold hover:text-gray-300 transition-colors">
            News Today
          </Link>

          <div className="text-center sm:text-left">
            <p className="font-semibold md:text-xl text-sm">
              Know The Biggest News Before Anybody Else
            </p>
          </div>

          <div className="relative inline-block text-left">
            {user ? (
              <>
                <button 
                  onClick={() => setOpen(!open)} 
                  className="bg-white text-gray-800 p-2 px-4 text-lg rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {user.First_Name}
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10" ref={menuRef}>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <Link to="/newarticle" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      New Article
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="bg-white text-gray-800 p-2 px-4 text-lg rounded-xl hover:bg-gray-100 transition-colors">
                Login / SignUp
              </Link>
            )}
          </div>
        </div>
      </nav>

      <section className="bg-gray-200 flex-grow">
        {children}
      </section>

      <footer className="bg-gray-800 text-white py-4 px-4 sm:px-10">
        <p className="text-center text-md md:text-xl">
          © {new Date().getFullYear()} News Today App
        </p>
      </footer>
    </main>
  );
};

export default MainLayout;
