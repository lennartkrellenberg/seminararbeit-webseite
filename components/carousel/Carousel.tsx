"use client";

import Image from "next/image";

type CarouselItem = {
  imageUrl: string;
  title: string;
  description: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

function Carousel({ items }: CarouselProps) {
  return (
    <section className="mb-16">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {item.title}
              </h2>
              <p className="text-xl md:text-2xl text-center">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
