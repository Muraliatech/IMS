import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define Product type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  description: string;
  stock: number;
  SKU: string;
}

// Define CartItem type (Product with quantity)
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  totalPrice: () => number;
  price: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCartItems = localStorage.getItem('cartItems');
  const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
         
        const updatedCart = [...prevCart];
        if (updatedCart[existingItemIndex]) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            id: updatedCart[existingItemIndex].id,
            name: updatedCart[existingItemIndex].name,
            price: updatedCart[existingItemIndex].price,
            imageUrls: updatedCart[existingItemIndex].imageUrls,
            description: updatedCart[existingItemIndex].description,
            stock: updatedCart[existingItemIndex].stock,
            SKU: updatedCart[existingItemIndex].SKU,
            quantity: updatedCart[existingItemIndex].quantity + 1
          };
        }
        return updatedCart;
      } else {
       
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id: string) => {
    setCartItems((prevCart) => {
      return prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    });
  };

  const decrementQuantity = (id: string) => {
    setCartItems((prevCart) => {
      return prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      );
    });
  };

  const totalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  useEffect(() => {
    setPrice(totalPrice());
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      incrementQuantity,
      decrementQuantity,
      totalPrice, 
      price 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};