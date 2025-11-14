import Header from "../components/Header";
import Footer from "../components/Footer";
import { Users, Target, Heart, ShoppingBag, Github } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen font-serif">
        {/* Hero Section */}
        <section className="from-blue-600 to-indigo-700 text-gray-800 py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
            About Our Store
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-800">
            Hello guys, my name is AhmadReza16, I am a full stack developer. I
            created this fake Ecommerce with the help of Django and React
            programming languages. I hope you like my little project.
          </p>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 flex items-center">
              <Target className="text-blue-600 mr-2" /> Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is simple — to make online shopping easier, faster,
              and more enjoyable for everyone. We carefully select our products,
              ensure secure payments, and provide quick delivery, so you can
              shop with confidence.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=900&q=80"
            alt="Team working together"
            className="rounded-2xl shadow-md"
          />
        </section>

        {/* Team Section */}
        <section className="bg-white py-16 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8 flex items-center justify-center text-gray-800">
              <Github className="text-blue-600 mr-2" /> Meet My GitHube
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-10 ">
              I have other small projects on my GitHub, if you want you can
              visit them.
            </p>

            <div className="gap-10 ">
              {[
                {
                  name: "AhmedReza16",
                  role: "Fullstack Developer",
                  img: "https://avatars.githubusercontent.com/u/101175583?s=400&u=c27d3ed228c95859674ff1e48327ad942600694e&v=4",
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-gray-50 shadow-md rounded-xl p-6 hover:shadow-lg transition"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision / Values */}
        <section className="container mx-auto py-16 px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center text-gray-800">
            <Heart className="text-gray-500 mr-2 hover:text-red-500" /> What
            Drives Us
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            We believe shopping should be about joy — not stress. That’s why we
            combine technology, creativity, and human touch to deliver something
            truly special.
          </p>
          <div className="flex justify-center">
            <ShoppingBag className="text-blue-600" size={48} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
