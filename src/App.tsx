import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';
import { StructuredData } from '@/components/common/StructuredData';

function App() {
  return (
    <div className="min-h-screen bg-navy text-text-primary">
      <StructuredData />
      
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue focus:text-white focus:rounded"
      >
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
