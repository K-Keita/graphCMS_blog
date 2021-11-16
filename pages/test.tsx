import React from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";

const App: React.VFC = () => {
  const { ref, inView } = useInView({
    // オプション
    rootMargin: "-50px", // ref要素が現れてから50px過ぎたら
    triggerOnce: false, // 最初の一度だけ実行
  });

  return (
    <div>
      <div style={{ height: "2000px", backgroundColor: "blue" }}>contents</div>

      {/* refを与えた要素がウインドウ内に現れるとinViewがtrueになります */}
      <div ref={ref} style={{ height: "300px" }}>
        {inView && (
          <div
            className="animate__animated animate__fadeOutUp"
            style={{ backgroundColor: "yellow" }}
          >
            <p>黄色の要素が出現！</p>
          </div>
        )}
      </div>
      <div ref={ref} style={{ height: "300px" }}>
        {inView && (
          <div
            className="animate__animated animate__fadeInUp"
            style={{ backgroundColor: "yellow" }}
          >
            <p>黄色の要素が出現！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
