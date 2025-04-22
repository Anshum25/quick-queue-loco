
interface Step {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
}

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in">How It Works</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-in">
          Join thousands of satisfied customers who save time every day with our virtual queue system
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg bg-card border animate-scale-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute -top-4 -left-4 w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
