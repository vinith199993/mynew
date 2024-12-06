import { Phone, Facebook, Mail, MessageCircle } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="contact-us">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We are here to assist you! Reach out for inquiries, support, or any questions.
        </p>
      </section>

      {/* Contact Details */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {/* Phone */}
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-lg transition-all">
              <Phone size={32} className="text-green-600 mb-4" />
              <h3 className="font-bold">Phone</h3>
              <p>0789600847</p>
              <p>0764563721</p>
            </div>
            {/* Facebook */}
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-lg transition-all">
              <Facebook size={32} className="text-green-600 mb-4" />
              <h3 className="font-bold">Facebook</h3>
              <a
                href="https://facebook.com/vinithchamika"
                className="text-green-700 hover:underline"
              >
                Vinith Chamika
              </a>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-lg transition-all">
              <Mail size={32} className="text-green-600 mb-4" />
              <h3 className="font-bold">Email</h3>
              <a
                href="mailto:vinithchamika@gmail.com"
                className="text-green-700 hover:underline"
              >
                vinithchamika@gmail.com
              </a>
            </div>
            {/* WhatsApp */}
            <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow hover:shadow-lg transition-all">
              <MessageCircle size={32} className="text-green-600 mb-4" />
              <h3 className="font-bold">WhatsApp</h3>
              <a
                href="https://wa.me/0789600847"
                className="text-green-700 hover:underline"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Visit Us</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63492.95583422907!2d80.50954808930008!3d5.951990672255693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d151937cd9%3A0x1d711f45897009a3!2sMatara!5e0!3m2!1sen!2slk!4v1733315518666!5m2!1sen!2slk"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
