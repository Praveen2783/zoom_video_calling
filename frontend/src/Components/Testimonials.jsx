export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white text-center px-6">
      <h2 className="text-4xl font-bold mb-12">Loved by Users</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        <blockquote className="italic text-lg text-gray-700">
          “This is hands down the best video call platform we’ve used. Simple,
          reliable, and lightning fast.”
          <span className="block mt-4 font-semibold text-blue-600">
            — Sarah Patel, HR Manager
          </span>
        </blockquote>
        <blockquote className="italic text-lg text-gray-700">
          “Our remote team stays perfectly connected thanks to this platform.”
          <span className="block mt-4 font-semibold text-blue-600">
            — James Lin, Product Lead
          </span>
        </blockquote>
      </div>
    </section>
  );
}
