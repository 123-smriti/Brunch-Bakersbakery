import { useDeliveryLocation } from "../../context/LocationContext";

// Last call to action on the page: find the nearest store (opens the existing store-finder popup).
export default function CallToAction() {
  const { openModal } = useDeliveryLocation();
  return (
    <section className="sec mint findstore" aria-labelledby="findstore-title">
      <div className="sec-in">
        <h2 id="findstore-title">Find a Bakery Near You</h2>
        <p>Enter your area to find your nearest Brunch Bakers store.</p>
        <button type="button" className="btn" onClick={openModal}>Find a Store</button>
      </div>
    </section>
  );
}
