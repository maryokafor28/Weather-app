// "use client";

// export default function LoadingOverlay() {
//   return (
//     <div className="flex flex-col lg:flex-row lg:space-x-4 animate-pulse w-full">
//       {/* Left column */}
//       <div className="flex-1 space-y-4 w-full lg:max-w-3xl">
//         {/* HeroCard skeleton */}
//         <div
//           className="
//             bg-[var(--background-card)]
//             border border-[var(--muted)]/15
//             backdrop-blur-md
//             shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]
//             rounded-2xl
//             h-[250px]
//             w-full
//           "
//         />

//         {/* WeatherStats skeleton (4 small cards) */}
//         <div className="grid grid-cols-2 gap-4">
//           {[...Array(4)].map((_, i) => (
//             <div
//               key={i}
//               className="
//                 bg-[var(--background-card)]
//                 border border-[var(--muted)]/15
//                 backdrop-blur-md
//                 shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]
//                 rounded-xl
//                 h-28
//                 w-full
//               "
//             />
//           ))}
//         </div>

//         {/* DailyForecast skeleton (7 day cards) */}
//         <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
//           {[...Array(7)].map((_, i) => (
//             <div
//               key={i}
//               className="
//                 bg-[var(--background-card)]
//                 border border-[var(--muted)]/15
//                 backdrop-blur-md
//                 shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]
//                 rounded-xl
//                 h-[140px]
//                 w-full
//               "
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right column (HourlyForecast skeleton) */}
//       <div className="w-full lg:max-w-sm mt-6 lg:mt-0 space-y-4">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="
//               bg-[var(--background-card)]
//               border border-[var(--muted)]/15
//               backdrop-blur-md
//               shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]
//               rounded-xl
//               h-20
//               w-full
//             "
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
