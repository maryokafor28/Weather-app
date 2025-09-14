import HeroCard from "@/components/widgets/WeatherCard";
import Image from "next/image";

export default function WeatherPage() {
  return (
    <main className="flex justify-center">
      <HeroCard
        location="Berlin, Germany"
        date="Tuesday, Aug 5, 2025"
        temperature={20}
        icon={
          <Image
            src="/images/icon-sunny.webp"
            alt="Sunny"
            width={64}
            height={64}
            className="h-16 w-16"
          />
        }
        backgroundImage="/images/bg-today-large.svg" // put your blue bg image in /public/images
      />
    </main>
  );
}
