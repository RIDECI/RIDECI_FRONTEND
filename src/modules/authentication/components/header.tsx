import RideciLogo from "../../../assets/RIDECI Logo (Blanco).png";

export function Header() {
  return (
    <header className="flex items-center justify-start px-6 h-16 mr-4 mt-10">
      <img src={RideciLogo} alt="RIDECI Logo" className="h-55 w-auto"
      />
    </header>
  );
}
