import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { sampleProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  // Get cart items with product details
  const cartItemsWithDetails = useMemo(() => {
    return Object.entries(cartItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = sampleProducts.find(p => p.id === productId);
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean) as (typeof sampleProducts[0] & { quantity: number })[];
  }, [cartItems]);

  const cartCount = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      if (quantity <= 0) {
        delete newItems[productId];
        toast({
          title: "Item removed from cart",
          description: "Product has been removed from your cart.",
        });
      } else {
        const isNew = !prev[productId];
        newItems[productId] = quantity;
        if (isNew) {
          const product = sampleProducts.find(p => p.id === productId);
          toast({
            title: "Added to cart",
            description: `${product?.name} has been added to your cart.`,
          });
        }
      }
      return newItems;
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout feature coming soon!",
      description: "We're working on the checkout process. Stay tuned!",
    });
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        <HeroSection />
        
        <CategorySection
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        {/* Products Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'All Products'}
                {searchQuery && ` - "${searchQuery}"`}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} items found
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cartItems[product.id] || 0}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found {searchQuery && `for "${searchQuery}"`}
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or browse different categories
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItemsWithDetails}
        onQuantityChange={handleQuantityChange}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
