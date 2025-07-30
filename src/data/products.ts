import { Product } from "@/components/ProductCard";

export const sampleProducts: Product[] = [
  // Fruits
  { id: '1', name: 'Fresh Bananas', price: 40, unit: '1 dozen', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', category: 'fruits', inStock: true },
  { id: '2', name: 'Red Apples', price: 120, unit: '1 kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', category: 'fruits', inStock: true },
  { id: '3', name: 'Fresh Oranges', price: 80, unit: '1 kg', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', category: 'fruits', inStock: true },
  { id: '4', name: 'Green Grapes', price: 100, unit: '500g', image: 'https://images.unsplash.com/photo-1549888834-3ec93abae044?w=400', category: 'fruits', inStock: true },
  
  // Vegetables
  { id: '5', name: 'Fresh Tomatoes', price: 30, unit: '1 kg', image: 'https://images.unsplash.com/photo-1546470427-e1c2969e27be?w=400', category: 'vegetables', inStock: true },
  { id: '6', name: 'Green Capsicum', price: 60, unit: '500g', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400', category: 'vegetables', inStock: true },
  { id: '7', name: 'Fresh Onions', price: 25, unit: '1 kg', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400', category: 'vegetables', inStock: true },
  { id: '8', name: 'Fresh Potatoes', price: 20, unit: '1 kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', category: 'vegetables', inStock: true },
  
  // Snacks
  { id: '9', name: 'Potato Chips', price: 20, unit: '50g pack', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', category: 'snacks', inStock: true },
  { id: '10', name: 'Mixed Nuts', price: 150, unit: '200g', image: 'https://images.unsplash.com/photo-1599599810694-57a2ca389442?w=400', category: 'snacks', inStock: true },
  { id: '11', name: 'Chocolate Cookies', price: 45, unit: '100g pack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', category: 'snacks', inStock: true },
  
  // Beverages
  { id: '12', name: 'Fresh Milk', price: 30, unit: '500ml', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', category: 'dairy', inStock: true },
  { id: '13', name: 'Orange Juice', price: 35, unit: '200ml', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', category: 'beverages', inStock: true },
  { id: '14', name: 'Green Tea', price: 80, unit: '100g', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', category: 'beverages', inStock: true },
  
  // Dairy
  { id: '15', name: 'Greek Yogurt', price: 45, unit: '200g', image: 'https://images.unsplash.com/photo-1571212515416-46a81c8f5db1?w=400', category: 'dairy', inStock: true },
  { id: '16', name: 'Farm Fresh Eggs', price: 60, unit: '12 pieces', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', category: 'dairy', inStock: true },
  
  // Household
  { id: '17', name: 'Dishwash Liquid', price: 85, unit: '500ml', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', category: 'household', inStock: true },
  { id: '18', name: 'Toilet Paper', price: 120, unit: '4 rolls', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', category: 'household', inStock: true },
];