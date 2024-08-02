// import partices from react-tsparticles
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesContainer = () => {
  // init
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "#000000",
          },
        },
      }}
    />
  );
};

export default ParticlesContainer;
