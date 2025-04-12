
import { BusinessCategory, categoryIcons, categoryLabels } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: BusinessCategory | null;
  onCategoryChange: (category: BusinessCategory | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories: BusinessCategory[] = [
    "restaurant",
    "hospital",
    "salon",
    "government",
    "repair",
    "bank",
  ];

  return (
    <div className="flex flex-wrap gap-2 py-4 justify-center md:justify-start">
      <Button
        key="all"
        variant={selectedCategory === null ? "default" : "outline"}
        className={cn(
          "rounded-full px-4",
          selectedCategory === null
            ? "bg-primary text-primary-foreground"
            : "bg-background hover:bg-muted/80"
        )}
        onClick={() => onCategoryChange(null)}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={cn(
            "rounded-full px-4",
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-muted/80"
          )}
          onClick={() => onCategoryChange(category)}
        >
          <span className="mr-2">{categoryIcons[category]}</span>
          {categoryLabels[category]}
        </Button>
      ))}
    </div>
  );
}
