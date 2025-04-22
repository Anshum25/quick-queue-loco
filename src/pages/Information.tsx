
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { locations } from "@/lib/data";

const Information = () => {
  useEffect(() => {
    document.title = "Information | Quick-Queue-Loco";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar selectedLocation={locations[0]} onLocationChange={() => {}} />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold">Information</h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about using Quick-Queue-Loco for your queue management needs.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">For Customers</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Join virtual queues from anywhere</li>
                  <li>Receive real-time updates</li>
                  <li>Get notified when your turn approaches</li>
                  <li>View estimated wait times</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">For Businesses</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Manage queues efficiently</li>
                  <li>Track customer flow</li>
                  <li>Reduce wait times</li>
                  <li>Improve customer satisfaction</li>
                </ul>
              </section>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="Information Visual" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Information;
