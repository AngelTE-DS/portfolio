"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const handleToggle = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      setTheme("dark");
    } else if (currentTheme === "dark") {
      setCurrentTheme("light");
      setTheme("light");
    }
  };

  return (
    <Button variant="ghost" className="w-10 px-0" onClick={handleToggle}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
