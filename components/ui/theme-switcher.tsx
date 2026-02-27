"use client";
import * as React from "react";
import useSound from "use-sound";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { isDark, toggleTheme: toggleThemeFromSkiper } = useThemeToggle({
    variant: "circle",
    start: "bottom-center",
    blur: false, 
  });
  const [mounted, setMounted] = React.useState(false);
  const [click] = useSound("/audio/click.wav", { volume: 0.20 });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 md:w-10 h-8 md:h-10 p-0" />
    );
  }

  const toggleTheme = () => {
    toggleThemeFromSkiper();
    click();
  };

  return (
    <>
      <div
          className={`flex items-center gap-2 rounded-xl p-0 text-center transition-all duration-300 hover:bg-foreground/5 relative cursor-pointer group`}
          onClick={toggleTheme}
        >
          <motion.img 
            src="/logo.png" 
            alt="navi_logo" 
            width={40} 
            height={40} 
            className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-lg group-hover:scale-100 active:scale-90 transition-all duration-300 shadow-sm"
          />
        </div>
    </>
  );

  // return (
  //   <ThemeToggleButton5
  //     isDark={isDark}
  //     onToggle={toggleTheme}
  //     className="size-10 p-2"
  //   />
  // );
}

export default ThemeSwitcher;
