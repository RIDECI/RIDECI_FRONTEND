import { CarouselPick } from "../components/pickCorrousel";
import "./rolePick.css";
import Logo from "../../../assets/RIDECI Logo (Blanco).png";

function CarouselSelection() {
  return (
    <div className="carousel-page">
      <div className="logo-container">
        <img src={Logo} alt="RIDECI Logo" className="logo-image" />
      </div>

      <div className="selector">
        <h1 className="selector-title">Selecciona tu rol</h1>

        <div className="Carousel">
          <CarouselPick />
        </div>
      </div>

    </div>
  );
}

export default CarouselSelection;
