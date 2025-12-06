import React from "react";

interface MainMenuProps {
  RIDECILogoBlanco?: string;
  RIDECILogoBlancoClassName?: string;
  className?: string;
  divClassName?: string;
  headerClassName?: string;
  menuBarClassName?: string;
  profileClassName?: string;
  rectangleClassName?: string;
}

export const MainMenu: React.FC<MainMenuProps> = (props) => {
  return (
    <aside className={`${props.className ?? ""}`}>
      <div className={`flex items-center gap-3 ${props.headerClassName ?? ""}`}>
        {props.RIDECILogoBlanco ? (
          <img
            alt="RIDECI"
            src={props.RIDECILogoBlanco}
            className={props.RIDECILogoBlancoClassName ?? "h-10"}
          />
        ) : (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
        )}
      </div>
    </aside>
  );
};

export default MainMenu;