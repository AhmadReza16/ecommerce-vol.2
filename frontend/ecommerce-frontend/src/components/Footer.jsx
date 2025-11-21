import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t font-serif dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-gray-200">
              {" "}
              About us
            </h3>
            <p className="text-gray-600 mb-4 dark:text-gray-200">
              Our online store is always striving to satisfy our valued
              customers by providing the best products and services.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors dark:text-gray-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors dark:text-gray-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors dark:text-gray-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-gray-200 ">
              Quick access
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600  transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  Home page
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600  transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600  transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  Shopping cart
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-600 transition-colors hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  About us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-gray-200">
              Contact information
            </h3>
            <ul className="space-y-2 ">
              <li className="flex items-center text-gray-600 dark:text-gray-200">
                <Phone className="h-5 w-5 ml-2 mr-2 hover:text-blue-500" />
                <span> 123-456-7890 </span>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-200">
                <Mail className="h-5 w-5 ml-2 mr-2 hover:text-yellow-600" />
                <span> JakePralta@gamil.com</span>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-200">
                <MapPin className="h-5 w-5 ml-2 mr-2  hover:text-green-700" />
                <span> New York , Brooklyn Nine-Nine </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-gray-200">
              {" "}
              Newsletter{" "}
            </h3>
            <p className="text-gray-600 mb-4 dark:text-gray-200">
              Subscribe to our newsletter to get the latest discounts and new
              products.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} All rights reserved "Ahmadreza16".
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
