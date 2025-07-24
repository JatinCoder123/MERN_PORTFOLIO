// components/Footer.jsx
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Your Name */}
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Jatin Verma. All rights reserved.</p>
        
        {/* Right: Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/JatinCoder123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/jatin-verma-aa75b8248/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:verm.jatin2004@gmail.com"
            className="hover:text-blue-400 transition-colors"
          >
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
}
