import { Spotlight } from "@/components/ui/spotlight-new";
import { ProjectCard } from "@/components/ui/project-card"
import { ParallaxSection } from "@/components/ui/parallax-scroll"
import { ProfileSection } from "@/components/profile-section"
import { Stats } from "@/components/stats"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"

import { WorkExperience } from "@/components/work_experience"

function HomePage() {
  return (
    <>
      <section className="w-full rounded-md flex items-center justify-center antialiased relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" duration={4} />
        <div className="py-8 w-full max-w-7xl">
          <div className="space-y-8 px-4">
            <ProfileSection />
            <Stats />
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="lg:row-span-2">
                <WorkExperience />
              </div>
              <div>
                <Education />
              </div>
              <div>
                <Skills />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mb-12 px-4 sm:px-6 lg:px-8">
          <ParallaxSection />
        </div>
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage;
const projects = [
  {
    title: "Amazon GroupPal",
    description: "Chrome Extension for group purchases",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    link: "https://chrome.google.com/webstore/detail/amazon-grouppal/jnhpkgfnlljbmgkjnkpjbdlbkpnhbpjl",
  },
  {
    title: "Figma Plugin",
    description: "Spacing Validator for Figma",
    image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    link: "https://www.figma.com/community/plugin/1138040726959941002/Figma-Spacing-Validator",
  },
  {
    title: "Personal Website",
    description: "Built with Next.js and Tailwind",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    link: "https://generousyeh.com/",
  },
  {
    title: "Design System",
    description: "Documentation for PayPal design",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    link: "https://paypal.design/",
  },
  {
    title: "UI Experiments",
    description: "Exploring new interface concepts",
    image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    link: "#",
  },
  {
    title: "Mobile App Prototype",
    description: "Concept for a productivity app",
    image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    link: "#",
  },

]


