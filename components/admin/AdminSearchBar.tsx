import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
}: AdminSearchBarProps) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceMs]);

  return (
    <div className="relative max-w-sm w-full group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      <Input
        placeholder={placeholder}
        value={debouncedValue}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
      />
    </div>
  );
}