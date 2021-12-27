import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export const TestComponent = () => {
  return (
    <Parallax pages={3} style={{ top: "0", left: "0" }}>
      <ParallaxLayer
        offset={0}
        speed={2.5}
        factor={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Parallaxの実装
      </ParallaxLayer>
      <ParallaxLayer
        offset={1.2}
        speed={2}
        style={{
          backgroundColor: "orange",
          width: "100%",
          height: "300px",
        }}
      />

      <ParallaxLayer
        offset={1.6}
        speed={1}
        style={{
          backgroundColor: "skyblue",
          marginLeft: "100px",
          width: "100%",
          height: "500px",
        }}
      />
      <ParallaxLayer
        offset={1}
        speed={0.5}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "500px",
          backgroundColor: "lime",
        }}
      />
      <ParallaxLayer
        offset={2}
        speed={2}
        style={{
          backgroundColor: "blue",
          width: "80%",
          height: "500px",
        }}
      />
      <ParallaxLayer
        offset={1.6}
        horizontal={true}
        speed={1.7}
        factor={1}
        style={{
          backgroundColor: "yellow",
          width: "50%",
          height: "500px",
        }}
      />
    </Parallax>
  );
};
