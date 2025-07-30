import { Search, ShoppingCart, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdminClick: () => void;
}

export const Header = ({ cartCount, onCartClick, searchQuery, onSearchChange, onAdminClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-fresh-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">QM</span>
              </div>
              <h1 className="text-xl font-bold text-primary hidden sm:block">QuickMart</h1>
            </div>
            <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Pusad, Maharashtra</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-secondary border-0 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Admin Settings */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="hidden sm:flex"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="outline"
              size="default"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-warm-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};