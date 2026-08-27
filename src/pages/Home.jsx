import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <main className="min-h-screen bg-[#F8F7F2] text-[#171815]">

      {/* HERO */}
      <Hero />

      {/* STATISTICS */}
      <Statistics />

      {/* ABOUT */}
      <About />

      {/* SERVICES */}
      <Services />

      {/* TESTIMONIALS */}
      <Testimonials />

    </main>
  );
}

export default Home;