import { useEffect } from "react";

const HeaderAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9578487363976047"  // ✅ Replace with your AdSense ID
        data-ad-slot="5717003751"  // ✅ Replace with your Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default HeaderAd;
