import { useState } from "react";
import { useDeliveryLocation } from "../../context/LocationContext";

export default function LocationModal() {
  const { open, closeModal, setLocation } = useDeliveryLocation();
  const [pin, setPin] = useState("");
  if (!open) return null;
  const save = (v) => { setLocation(v); setPin(""); closeModal(); };
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>Let's find a store near you</h3>
        <button className="btn dark" onClick={() => save("Current location")}>Use current location</button>
        <p className="center">OR</p>
        <input placeholder="Enter pincode, locality, area..." value={pin} onChange={(e) => setPin(e.target.value)} />
        <button className="btn dark" disabled={!pin.trim()} onClick={() => save(pin.trim())}>Confirm</button>
      </div>
    </div>
  );
}
