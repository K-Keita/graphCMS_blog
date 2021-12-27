// import {
//   useSpring,
//   useTrail,
//   useSprings,
//   config,
// } from "react-spring";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

// const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
// const trans1 = (x, y) => `translate3d(${x}px,${y}px,0)`;
// const trans2 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;

const Test2 = () => {
  // const [springProps, setSpring] = useSpring(() => ({
  //   xy: [0, 0],
  //   config: { mass: 10, tension: 550, friction: 140 },
  // }));

  // const msg = "Hello React Spring";
  // const [{ x, y }, setXY] = useState({ x: 0, y: 0 });
  // const trails = useTrail(msg.length, {
  //   config: config.gentle,
  //   left: `${x}px`,
  //   top: `${y}px`,
  //   position: "absolute",
  // });

  // const [springs, set] = useSprings(msg.length, (idx) => ({
  //   // idxによって異なる設定をしてもよい。
  //   config: config.wobbly,
  //   fontSize: "24pt",
  // }));

  // const [enter, setEnter] = useState(false);
  // const spring = useSpring({
  //   fontSize: enter ? "48pt" : "24pt",
  //   color: enter ? "red" : "green",
  // });

  // const onMouseMoveHandle = (e) =>
  //   setSpring({ xy: calc(e.clientX, e.clientY) });

  return (
    <>
      <Parallax pages={3} style={{ top: "0", left: "0" }}>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            backgroundColor: "pink",
          }}
        >
          Parallaxの実装
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.3}
          speed={2}
          style={{
            backgroundColor: "yellow",
            width: "100%",
            height: "300px",
          }}
        />
        <ParallaxLayer
          offset={1.0}
          speed={1}
          style={{
            width: "60%",
            height: "500px",
            margin: "0 auto",
            backgroundColor: "lime",
          }}
        />
        <ParallaxLayer
          offset={1.6}
          speed={1.4}
          style={{
            backgroundColor: "skyblue",
            marginLeft: "auto",
            width: "50%",
            height: "400px",
          }}
        />
        <ParallaxLayer
          offset={1.0}
          speed={2.4}
          style={{
            width: "30%",
            height: "400px",
            backgroundColor: "red",
          }}
        />
        <ParallaxLayer
          offset={1.6}
          speed={0.8}
          style={{
            backgroundColor: "orange",
            width: "40%",
            height: "600px",
          }}
        />
      </Parallax>
      {/* {[...Array(20)]
        .map((_, i) => i)
        .map((row, index) => {
          return (
            <div onMouseMove={onMouseMoveHandle} key={index}>
              <animated.div
                style={{ transform: springProps.xy.interpolate(trans1) }}
              >
                <p>{row}</p>
              </animated.div>
              <animated.div
                style={{ transform: springProps.xy.interpolate(trans2) }}
              >
                <p>{row}/</p>
              </animated.div>
            </div>
          );
        })} */}
      {/* <animated.div
        style={spring}
        onMouseEnter={(e) => setEnter(true)}
        onMouseLeave={(e) => setEnter(false)}
      >
        Hello React Spring
      </animated.div> */}
      {/* <div style={{ fontSize: "24pt" }}>
        {springs.map((item, idx) => (
          <animated.span
            key={idx}
            onMouseEnter={(e) =>
              set((i) => (i === idx ? { fontSize: "48pt" } : {}))
            }
            onMouseLeave={(e) =>
              set((i) => (i === idx ? { fontSize: "24pt" } : {}))
            }
            style={{ verticalAlign: "top", ...item }}
          >
            {msg[idx * 2]}
          </animated.span>
        ))}
      </div> */}
      {/* <div
        style={{ width: "100%", height: 1000, fontSize: "24pt" }}
        onMouseMove={(e) => {
          e.persist();
          setXY({ x: e.clientX, y: e.clientY });
        }}
      >
        {trails.map((trail, idx) => (
          <animated.span key={idx} style={{ ...trail, paddingLeft: idx * 23 }}>
            {msg[idx]}
          </animated.span>
        ))}
      </div> */}
    </>
  );
};
export default Test2;
