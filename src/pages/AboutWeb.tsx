
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { locations } from "@/lib/data";

const AboutWeb = () => {
  useEffect(() => {
    document.title = "About the Web | Quick-Queue-Loco";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar selectedLocation={locations[0]} onLocationChange={() => {}} />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold">About the Web Application</h1>
            <p className="text-muted-foreground text-lg">
              Quick-Queue-Loco is a modern web application designed to streamline queue management and improve customer experience.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Technology Stack</h2>
              <p className="text-muted-foreground">
                Built with cutting-edge technologies including React, TypeScript, and real-time updates to provide a seamless queue management experience.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Features</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Real-time queue updates</li>
                <li>Smart notifications system</li>
                <li>Multi-location support</li>
                <li>Business management dashboard</li>
              </ul>
            </div>
          </section>

          <div className="relative h-64 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
              alt="Technology Background" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutWeb;
