import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  icon?: React.ReactNode;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  icon,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(options.map((o) => o.value));
    }
  };

  const displayLabel =
    selectedValues.length === 0 || selectedValues.length === options.length
      ? label
      : `${label} (${selectedValues.length})`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {icon || <Filter className="h-4 w-4" />}
          <span>{displayLabel}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-card border-border" align="start">
        <div className="flex flex-col gap-1">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted text-muted-foreground"
          >
            {selectedValues.length === options.length ? "Deselect All" : "Select All"}
          </button>
          <div className="h-px bg-border my-1" />
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer"
            >
              <Checkbox
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <span className="text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
