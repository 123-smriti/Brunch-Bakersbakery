import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <article className="prod">
      <div className="pimg" aria-hidden="true">{product.icon}</div>
      <h4>{product.name}</h4>
      <div className="prow">
        <b>₹{product.price}</b>
        <button onClick={() => addItem(product)}>Add +</button>
      </div>
    </article>
  );
}
