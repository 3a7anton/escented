
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-serif font-semibold tracking-tight">
              enscented
            </Link>
            <p className="text-neutral-400 text-sm mt-2">
              Premium fragrances crafted for the modern individual.
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-neutral-400">
                1234 Fragrance Ave, Suite 567
              </li>
              <li className="text-sm text-neutral-400">
                New York, NY 10001
              </li>
              <li className="text-sm">
                <a href="mailto:info@enscented.com" className="text-neutral-400 hover:text-white transition-colors">
                  info@enscented.com
                </a>
              </li>
              <li className="text-sm">
                <a href="tel:+12125551234" className="text-neutral-400 hover:text-white transition-colors">
                  (212) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Enscented. All rights reserved.
            {" • "}
            <Link to="/admin/login" className="hover:text-white transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
