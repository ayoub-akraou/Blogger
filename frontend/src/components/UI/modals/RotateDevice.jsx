import { useState, useEffect } from "react";
import RotateIcon from "../../Icons/RotateIcon";

export default function RotateDeviceModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 500;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      console.log(window.innerWidth);

      setShowModal(isMobile || isPortrait);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex flex-col justify-center items-center text-center text-white p-5 text-2xl"
    >
      <h2>Tournez votre appareil</h2>
      <p>
        Pour une meilleure expérience, veuillez utiliser votre appareil en mode
        paysage.
      </p>
      <div style={{ fontSize: "50px", marginBottom: "20px" }}>
        <RotateIcon className="fill-white" />
      </div>
    </div>
  );
}
