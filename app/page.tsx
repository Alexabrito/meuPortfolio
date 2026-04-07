import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Statement } from "@/components/statement";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Statement />
        <Footer />
      </main>
    </>
  );
}
