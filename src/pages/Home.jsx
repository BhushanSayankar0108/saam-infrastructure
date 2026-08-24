import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <Hero />

      <About />

      <Services />

      <Testimonials />

    </main>
  );
}

export default Home;