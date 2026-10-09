import { Link } from "react-router-dom";

export default function FranchiseStrip() {
  return (
    <section className="sec fstrip" aria-labelledby="franchise-title">
      <div className="sec-in">
        <div className="fstrip-panel">
          <div>
            <h2 id="franchise-title">Start your own bakery today</h2>
            <p>Join the Brunch Bakers family. We bring the recipes, training and support.</p>
          </div>
          <Link className="btn dark" to="/franchise#enquire">Enquire</Link>
        </div>
      </div>
    </section>
  );
}
