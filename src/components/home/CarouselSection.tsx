
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface InformationSlide {
  title: string;
  image: string;
  content: string[];
}

interface CarouselSectionProps {
  slides: InformationSlide[];
}

export function CarouselSection({ slides }: CarouselSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
          Why Choose Quick-Queue-Loco?
        </h2>
        <Carousel className="max-w-5xl mx-auto" opts={{
          align: "start",
          loop: true,
          duration: 30,
          skipSnaps: false,
          dragFree: true,
          watchDrag: false
        }}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="relative overflow-hidden rounded-lg group animate-scale-in">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/20 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-semibold">{slide.title}</h3>
                    <ul className="space-y-4">
                      {slide.content.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="flex items-center text-muted-foreground animate-slide-in-right"
                          style={{ animationDelay: `${itemIndex * 0.1}s` }}
                        >
                          <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-light" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
