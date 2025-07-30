import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, User } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (userDetails: UserDetails) => void;
  totalAmount: number;
  deliveryFee: number;
  itemCount: number;
}

export interface UserDetails {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
}

export const CheckoutModal = ({ isOpen, onClose, onPlaceOrder, totalAmount, deliveryFee, itemCount }: CheckoutModalProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    // Load saved details from localStorage
    const saved = localStorage.getItem('quickmart_user_details');
    return saved ? JSON.parse(saved) : { name: '', phone: '', address: '', landmark: '' };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save user details for future orders
    localStorage.setItem('quickmart_user_details', JSON.stringify(userDetails));

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    onPlaceOrder(userDetails);
    setIsSubmitting(false);
  };

  const isFormValid = userDetails.name.trim() && userDetails.phone.trim() && userDetails.address.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Delivery Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={userDetails.name}
              onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Mobile Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={userDetails.phone}
              onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
              maxLength={10}
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </Label>
            <Textarea
              id="address"
              placeholder="House/Flat No, Street, Area, Pusad"
              value={userDetails.address}
              onChange={(e) => setUserDetails(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              required
            />
          </div>

          {/* Landmark (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="landmark">
              Landmark (Optional)
            </Label>
            <Input
              id="landmark"
              type="text"
              placeholder="Near temple, school, etc."
              value={userDetails.landmark}
              onChange={(e) => setUserDetails(prev => ({ ...prev, landmark: e.target.value }))}
            />
          </div>

          {/* Order Summary */}
          <div className="bg-secondary/20 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>{itemCount} items</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "text-success line-through" : ""}>
                ₹{deliveryFee}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{totalAmount + deliveryFee}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              💰 Cash on Delivery
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};