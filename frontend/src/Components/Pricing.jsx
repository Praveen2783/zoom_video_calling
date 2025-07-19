const plans = [
  {
    title: "Free",
    price: "$0",
    desc: "For individuals and hobby use.",
    features: ["1:1 Calls", "Unlimited Meetings", "Basic Support"],
  },
  {
    title: "Pro",
    price: "$12",
    desc: "For small teams and professionals.",
    features: ["Group Calls", "Screen Sharing", "Priority Support"],
  },
  {
    title: "Business",
    price: "$25",
    desc: "Best for growing businesses.",
    features: ["Everything in Pro", "Admin Dashboard", "Custom Branding"],
  },
];

export default function Pricing() {
  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-12">Simple Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}/mo</p>
            <p className="text-gray-600 mb-4">{plan.desc}</p>
            <ul className="text-gray-700 mb-6 space-y-2">
              {plan.features.map((feat, i) => (
                <li key={i}>✓ {feat}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
