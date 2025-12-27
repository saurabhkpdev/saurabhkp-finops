import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type DateRange = {
  label: string;
  value: string;
  months: number[];
};

const dateRanges: DateRange[] = [
  { label: "Full Year", value: "full-year", months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { label: "Q1 (Jan-Mar)", value: "q1", months: [0, 1, 2] },
  { label: "Q2 (Apr-Jun)", value: "q2", months: [3, 4, 5] },
  { label: "Q3 (Jul-Sep)", value: "q3", months: [6, 7, 8] },
  { label: "Q4 (Oct-Dec)", value: "q4", months: [9, 10, 11] },
  { label: "Last 3 Months", value: "last-3", months: [9, 10, 11] },
  { label: "Last 6 Months", value: "last-6", months: [6, 7, 8, 9, 10, 11] },
];

interface DateRangePickerProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function DateRangePicker({ selectedRange, onRangeChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>{selectedRange.label}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1 bg-card border-border" align="end">
        <div className="flex flex-col">
          {dateRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => {
                onRangeChange(range);
                setOpen(false);
              }}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors text-left",
                selectedRange.value === range.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { dateRanges };
