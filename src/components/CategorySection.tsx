import { Apple, Carrot, Cookie, Coffee, Home, Beef } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const categories = [
  { id: 'fruits', name: 'Fruits', icon: Apple, color: 'text-red-500' },
  { id: 'vegetables', name: 'Vegetables', icon: Carrot, color: 'text-orange-500' },
  { id: 'snacks', name: 'Snacks', icon: Cookie, color: 'text-yellow-600' },
  { id: 'beverages', name: 'Beverages', icon: Coffee, color: 'text-blue-500' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: Beef, color: 'text-purple-500' },
  { id: 'household', name: 'Household', icon: Home, color: 'text-green-600' },
];

interface CategorySectionProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const CategorySection = ({ selectedCategory, onCategorySelect }: CategorySectionProps) => {
  return (
    <section className="py-8 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Button
            variant="ghost"
            onClick={() => onCategorySelect(null)}
            className={selectedCategory === null ? "bg-primary/10 text-primary" : ""}
          >
            All Items
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-medium border-2 ${
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-medium" 
                    : "border-transparent hover:border-primary/20"
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-secondary rounded-xl flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{category.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};