import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "../common/Toast";
import LocationModal from "../common/LocationModal";
import { useCart } from "../../context/CartContext";

export default function Layout() {
  const { toast } = useCart();
  return (
    <div id="top">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <Toast message={toast} />
      <LocationModal />
      <ScrollRestoration />
    </div>
  );
}
