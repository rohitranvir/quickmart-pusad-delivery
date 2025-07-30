import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Product } from "./ProductCard";

interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export const CartSidebar = ({ isOpen, onClose, items, onQuantityChange, onCheckout }: CartSidebarProps) => {
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = totalAmount >= 299 ? 0 : 25;
  const finalAmount = totalAmount + deliveryFee;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full py-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-muted-foreground">Add some groceries to get started!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-secondary/30 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.unit}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">₹{item.price}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            variant="cart"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-success line-through" : ""}>
                      ₹{deliveryFee}
                    </span>
                  </div>
                  {totalAmount < 299 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{299 - totalAmount} more for free delivery
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{finalAmount}</span>
                </div>
                
                <Button
                  onClick={onCheckout}
                  className="w-full"
                  variant="hero"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};