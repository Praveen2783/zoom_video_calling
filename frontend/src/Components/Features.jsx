const features = [
  {
    title: "HD Video & Audio",
    desc: "Crystal-clear communication for your team or clients.",
  },
  {
    title: "Screen Sharing",
    desc: "Present documents, slides, or your entire screen in one click.",
  },
  {
    title: "Secure & Encrypted",
    desc: "Your meetings are protected with end-to-end encryption.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-12">Powerful Features</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
