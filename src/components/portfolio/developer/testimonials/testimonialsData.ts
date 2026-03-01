export type Testimonial = {
  id: number;
  image: string;
  quote: string;
  author: string;
  role: string;
  heading: string;
  description: string;
  emphasis: string
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    image: "/img/Project/1.png",
    quote:
      "A sharp visual direction, clear communication, and delivery speed that impressed our whole team.",
    author: "Laura Domenge",
    role: "Comedian",
    heading: "Your satisfaction comes first",
    description:
      "A healthy customer relationship is vital. You can count on me to solve your problems and always help your company grow in a respectful and cheerful way.",
    emphasis:
      "My clients appreciate my multidisciplinary approach, my reactivity and my ability to listen in order to best respond to their needs."
  },
  {
    id: 2,
    image: "/img/Project/3.png",
    quote:
      "From strategy to launch, every detail was handled with precision and creativity.",
    author: "Maya Laurent",
    role: "Brand Manager",
    heading: "Reliable delivery, every sprint",
    description:
      "Each project phase is built to stay transparent and measurable. You always know what is shipped, what is next, and what impact it creates.",
    emphasis:
      "Expect clear priorities, strong ownership and practical decisions focused on outcomes."
  },
  {
    id: 3,
    image: "/img/Project/5.png",
    quote:
      "Fast turnaround, excellent quality, and a final product that truly reflected our vision.",
    author: "Noah Walker",
    role: "Startup Founder",
    heading: "Built for long-term growth",
    description:
      "Great design is only one part of the process. I also focus on maintainable code and scalable architecture so your platform keeps performing as your business expands.",
    emphasis:
      "The goal is simple: products that are easy to use, easy to manage and ready to evolve."
  }
];
