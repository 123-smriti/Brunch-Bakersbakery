import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { PROMOS, calcDiscount } from "../data/promos";

const CartContext = createContext(null);
const KEY = "cocoa_cart";
const PROMO_KEY = "cocoa_promo";

function reducer(state, a) {
  switch (a.type) {
    case "add":
      return state.some((i) => i.id === a.item.id)
        ? state.map((i) => (i.id === a.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...a.item, qty: 1 }];
    case "dec":
      return state.map((i) => (i.id === a.id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== a.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);
  const [toast, setToast] = useState("");
  const [promoCode, setPromoCode] = useState(() => {
    try { return localStorage.getItem(PROMO_KEY) || ""; } catch { return ""; }
  });
  const timer = useRef();

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  useEffect(() => {
    try { promoCode ? localStorage.setItem(PROMO_KEY, promoCode) : localStorage.removeItem(PROMO_KEY); } catch { /* ignore */ }
  }, [promoCode]);

  const applyPromo = useCallback((raw) => {
    const found = PROMOS.find((x) => x.code === String(raw).trim().toUpperCase());
    if (!found) return null;
    setPromoCode(found.code);
    return found;
  }, []);

  const addItem = useCallback((item) => {
    dispatch({ type: "add", item });
    setToast(`${item.name} added to cart`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 1600);
  }, []);

  const promo = PROMOS.find((x) => x.code === promoCode) || null;
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  const value = useMemo(() => ({
    items, toast, addItem, promo, applyPromo, clearPromo: () => setPromoCode(""),
    discount: calcDiscount(promo, subtotal),
    decrease: (id) => dispatch({ type: "dec", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal,
  }), [items, toast, addItem, promo, applyPromo, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
