
import MainLayout from "../components/layout/MainLayout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-slate-900 text-white">
        <div className="ecommerce-container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About ModernShop</h1>
            <p className="text-xl text-slate-300">
              A modern ecommerce experience with quality products for your home and workspace.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="ecommerce-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4">
                Founded in 2020, ModernShop began with a simple idea: to create a curated marketplace 
                where people could find high-quality, well-designed products for their homes and workspaces.
              </p>
              <p className="text-slate-600 mb-4">
                We believe that the objects we surround ourselves with should be both beautiful and functional,
                enhancing our daily lives through thoughtful design and quality craftsmanship.
              </p>
              <p className="text-slate-600">
                Today, we work with over 50 independent designers and brands to bring you a carefully 
                selected collection of products that meet our standards for design, quality, and sustainability.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200" 
                alt="Our journey" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-slate-50">
        <div className="ecommerce-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="text-xl text-slate-600">
              To provide thoughtfully designed products that enhance your everyday experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Quality</h3>
              <p className="text-slate-600">
                We carefully vet each product for durability, functionality, and craftsmanship.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Design</h3>
              <p className="text-slate-600">
                We believe in the power of good design to enhance everyday experiences.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Sustainability</h3>
              <p className="text-slate-600">
                We prioritize products made with sustainable materials and ethical manufacturing practices.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="ecommerce-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Meet the people who make ModernShop possible, from our curators to our customer service team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=500" },
              { name: "Michael Chen", role: "Head of Design", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500" },
              { name: "Jessica Park", role: "Product Curator", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500" },
              { name: "David Wilson", role: "Customer Experience", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500" }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
                  <p className="text-slate-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="ecommerce-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to shop?</h2>
            <p className="text-emerald-100 mb-8">
              Visit our shop to discover our curated collections of modern products.
            </p>
            <Link 
              to="/products" 
              className="inline-flex bg-white text-emerald-600 font-medium px-6 py-3 rounded-md hover:bg-emerald-50 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
