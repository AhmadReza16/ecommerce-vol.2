import { Truck, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck size={36} />,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep.",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Secure Payment",
    description: "Your payments are protected and secure.",
  },
  {
    icon: <Headphones size={36} />,
    title: "24/7 Support",
    description: "Our team is always ready to help you.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                rounded-2xl p-8 text-center
                bg-white dark:bg-gray-800
                shadow-md dark:shadow-none
                border border-transparent dark:border-gray-700
                hover:-translate-y-2 hover:shadow-xl
                transition-all
              "
            >
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
