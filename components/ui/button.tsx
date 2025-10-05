"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(233,67%,56%)] text-[hsl(0,0%,100%)] shadow-xs hover:bg-[hsl(248,70%,36%)]", // Blue 500 → Blue 700
        destructive:
          "bg-[hsl(28,100%,52%)] text-[hsl(0,0%,100%)] shadow-xs hover:bg-[hsl(28,100%,52%)/90]", // Orange 500
        outline:
          "border border-[hsl(243,27%,20%)] bg-[hsl(243,96%,9%)] text-[hsl(250,6%,84%)] shadow-xs hover:bg-[hsl(243,23%,24%)]", // Neutral 800 border + Neutral 900 bg
        secondary:
          "bg-[hsl(243,23%,24%)] text-[hsl(0,0%,100%)] shadow-xs hover:bg-[hsl(243,23%,30%)]", // Neutral 700 → Neutral 600
        ghost: "hover:bg-[hsl(243,27%,20%)] hover:text-[hsl(0,0%,100%)]", // Neutral 800 bg
        link: "text-[hsl(233,67%,56%)] underline-offset-4 hover:underline", // Blue 500
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
