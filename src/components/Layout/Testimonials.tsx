import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import testimonial8 from "@/assets/testimonial-8.jpg";
import testimonial9 from "@/assets/testimonial-9.jpg";
import testimonial10 from "@/assets/testimonial-10.jpg";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Chief Editor, Global News Network",
    image: testimonial1,
    testimonial: "The Truth platform has revolutionized how we verify information. The transparency and comprehensive verification process gives our readers confidence in every story we publish."
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    role: "Investigative Journalist",
    image: testimonial2,
    testimonial: "As a journalist, having access to detailed source tracking and evidence verification has been invaluable. This platform sets a new standard for news credibility."
  },
  {
    id: 3,
    name: "James Kim",
    role: "Media Director, Tech Corp",
    image: testimonial3,
    testimonial: "The verification queue and collaboration features have streamlined our fact-checking process significantly. It's an essential tool for maintaining journalistic integrity."
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Communications Manager",
    image: testimonial4,
    testimonial: "The timeline reconstruction feature helps us track how stories evolve and identify misinformation before it spreads. Absolutely game-changing for our team."
  },
  {
    id: 5,
    name: "Robert Thompson",
    role: "Senior Media Analyst",
    image: testimonial5,
    testimonial: "With decades in the industry, I can confidently say this is the most comprehensive news verification platform I've encountered. The evidence binder alone is worth it."
  },
  {
    id: 6,
    name: "Layla Hassan",
    role: "Digital Media Entrepreneur",
    image: testimonial6,
    testimonial: "The coordinated spread detection has helped us identify and stop misinformation campaigns early. This tool is crucial for maintaining trust with our audience."
  },
  {
    id: 7,
    name: "Daniel Martinez",
    role: "Content Strategist",
    image: testimonial7,
    testimonial: "The source lens feature provides incredible insights into media reliability. It's helped us build partnerships with the most trustworthy news sources."
  },
  {
    id: 8,
    name: "Amara Johnson",
    role: "Professor of Journalism",
    image: testimonial8,
    testimonial: "I use The Truth as a teaching tool for my students. It demonstrates best practices in verification and transparency that every journalist should follow."
  },
  {
    id: 9,
    name: "Alex Patel",
    role: "Tech & Media Consultant",
    image: testimonial9,
    testimonial: "The integration of C2PA and transparency badges makes it easy for readers to understand the authenticity of content. This is the future of trusted media."
  },
  {
    id: 10,
    name: "Sophie Anderson",
    role: "Head of Communications",
    image: testimonial10,
    testimonial: "Our organization relies on The Truth for monitoring news coverage and ensuring accuracy. The expert commentary feature adds invaluable context to complex stories."
  }
];

export const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sections = scrollContainer.querySelectorAll('.testimonial-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          section.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from journalists, editors, and media professionals who rely on The Truth
            for verified news and transparent information.
          </p>
        </div>

        <div ref={scrollContainerRef} className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-section opacity-0 transition-opacity duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className="h-20 w-20 flex-shrink-0">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <Quote className="h-8 w-8 text-primary mb-3 opacity-50" />
                      <p className="text-lg mb-4 leading-relaxed">
                        {testimonial.testimonial}
                      </p>
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
