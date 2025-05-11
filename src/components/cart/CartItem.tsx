
import { useCart } from "../../contexts/CartContext";
import { Plus, Minus, Trash } from "lucide-react";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CartItem = ({ id, name, price, image, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  
  return (
    <div className="flex items-center py-4 border-b border-slate-200">
      <div className="w-20 h-20 rounded-md overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h4 className="text-slate-800 font-medium">{name}</h4>
        <p className="text-slate-500 text-sm mt-1">
          ${price.toFixed(2)} each
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(id, quantity - 1)}
          className="p-1 rounded-full text-slate-600 hover:bg-slate-100"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="p-1 rounded-full text-slate-600 hover:bg-slate-100"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="ml-6 w-20 text-right">
        <span className="font-medium text-slate-800">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>
      
      <button
        onClick={() => removeItem(id)}
        className="ml-4 p-2 text-slate-400 hover:text-red-500"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default CartItem;
