import { FaGithubSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#A5B68D' }} className="text-center py-8">
      <div className="container mx-auto max-w-screen-md">
        <h5 className="mb-6 text-2xl font-bold text-gray-800">Attributors</h5>
        <ul className="flex justify-center space-x-6 list-none p-0">
          <li>
            <a 
              href="https://github.com/aharper2568" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-800 hover:text-red-600 transition duration-300 hover:scale-110"
            >
              <FaGithubSquare className="mr-2" />
              Harper
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/lllewell" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-800 hover:text-yellow-400 transition duration-300 hover:scale-110"
            >
              <FaGithubSquare className="mr-2" />
              Liane
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/NarSulEsz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-800 hover:text-blue-700 transition duration-300 hover:scale-110"
            >
              <FaGithubSquare className="mr-2" />
              Nariman
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/Bryson987081" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-800 hover:text-indigo-500 transition duration-300 hover:scale-110"
            >
              <FaGithubSquare className="mr-2" />
              Bryson
            </a>
          </li>
        </ul>
        <p className="mt-6 text-gray-600 text-sm">
          © {new Date().getFullYear()} Miles & Memories. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
