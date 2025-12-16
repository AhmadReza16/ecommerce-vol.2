const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">
      <div className="relative h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <img
          src="/public/hero-6.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>

        {/* Glass Content Box */}
        <div className="relative z-10 h-full flex items-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 ml-6 md:ml-16 max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Upgrade Your Shopping Experience
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Discover premium products with unbeatable prices and fast
              delivery.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition">
                Shop Now
              </button>

              <button className="px-6 py-3 border border-white/70 rounded-xl hover:bg-white hover:text-black transition">
                View Collections
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
