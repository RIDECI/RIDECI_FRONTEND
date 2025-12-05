import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import ImgConductor from "../../../assets/Conductor.jpeg";
import ImgAcompanante from "../../../assets/RIDECI Logo (Blanco).png";
import ImgPasajero from "../../../assets/imagenLogin (1).png";

const ROLES = ["Conductor", "Acompañante", "Pasajero"] as const;
const ROLE_ROUTES: Record<(typeof ROLES)[number], string> = {
  Conductor: "/app",
  Acompañante: "/app",
  Pasajero: "/app",
};
const ROLE_IMAGES: Record<(typeof ROLES)[number], string> = {
  Conductor: ImgConductor,
  Acompañante: ImgAcompanante,
  Pasajero: ImgPasajero,
};

export function CarouselPick() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleClick = (role: (typeof ROLES)[number]) => {
    const route = ROLE_ROUTES[role];
    if (route) navigate(route);
  };

  return (
    <div className="carousel-wrapper">
      <Carousel
        opts={{
          align: "center",
        }}
        className="carousel-root"
        setApi={setApi}
      >
        <CarouselContent className="carousel-content">
          {ROLES.map((role, index) => {
            const isActive = index === current;
            const imgSrc = ROLE_IMAGES[role];

            return (
              <CarouselItem 
                key={role} 
                className="basis-1/3" // Como en tu ejemplo
              >
                <button 
                  className="carousel-card-wrapper" 
                  onClick={() => handleClick(role)}
                  type="button"
                >
                  <Card
                    className={
                      "carousel-card " +
                      (isActive ? "carousel-card--active" : "carousel-card--inactive")
                    }
                  >
                    <CardContent className="carousel-card-content">
                      <img
                        src={imgSrc}
                        alt={role}
                        className="carousel-image"
                      />
                    </CardContent>
                  </Card>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="carousel-arrow">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M15 6l-6 6 6 6" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </CarouselPrevious>

        <CarouselNext className="carousel-arrow">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </CarouselNext>
      </Carousel>

      <p className="carousel-role-label">
        {ROLES[current]}
      </p>
    </div>
  );
}
