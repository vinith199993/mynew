import Image from "next/image";
import Header from "../components/Header";

export default function AboutUs() {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Providing top-notch electronic parts for innovators and tech
          enthusiasts worldwide.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Established in 2022, we are passionate about electronics. Our mission
            is to make high-quality parts accessible to everyone, empowering the
            next generation of creators and innovators.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-xs text-left">
              <h3 className="text-xl font-bold">Quality</h3>
              <p className="text-gray-600">
                We ensure every product meets the highest standards.
              </p>
            </div>
            <div className="max-w-xs text-left">
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-gray-600">
                Supporting creative solutions with cutting-edge parts.
              </p>
            </div>
            <div className="max-w-xs text-left">
              <h3 className="text-xl font-bold">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 py-16 px-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to Build Something Amazing?</h2>
        <p className="text-gray-700 mb-6">
          Explore our extensive catalog of electronic parts today!
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
}
