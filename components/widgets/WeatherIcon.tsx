import Image from "next/image";

export default function WeatherIcon({
  code,
  size = 36,
  alt,
}: {
  code: number;
  size?: number;
  alt?: string;
}) {
  const getIcon = (c: number) => {
    // same mapping you already had
    if (c === 0) return "/images/icon-sunny.webp";
    if (c >= 1 && c <= 3) return "/images/icon-partly-cloudy.webp";
    if (c === 2 || c === 3) return "/images/icon-overcast.webp";
    if (c === 45 || c === 48) return "/images/icon-fog.webp";
    if (c >= 51 && c <= 57) return "/images/icon-drizzle.webp";
    if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82))
      return "/images/icon-rain.webp";
    if ((c >= 71 && c <= 77) || c === 85 || c === 86)
      return "/images/icon-snow.webp";
    if (c >= 95) return "/images/icon-storm.webp";
    return "/images/icon-cloudy.webp";
  };

  return (
    <Image
      src={getIcon(code)}
      alt={alt ?? "Weather icon"}
      width={size}
      height={size}
    />
  );
}
