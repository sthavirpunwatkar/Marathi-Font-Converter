"use client";

import MarathiConverter from "@/components/MarathiConverter";

export default function Home() {
  return (
    <div className="ancient-bg min-h-screen relative">
      {/* 3D Mythological Elements */}
      <div className="mythological-elements">
        <div className="mythological-element"></div>
        <div className="mythological-element"></div>
        <div className="mythological-element"></div>
        <div className="mythological-element"></div>
        <div className="mythological-element"></div>
        <div className="mythological-element"></div>
      </div>
      
      {/* 3D Lotus Petals */}
      <div className="lotus-petal"></div>
      <div className="lotus-petal"></div>
      <div className="lotus-petal"></div>
      <div className="lotus-petal"></div>
      <div className="lotus-petal"></div>
      <div className="lotus-petal"></div>
      
      {/* 3D Sacred Symbols */}
      <div className="sacred-symbol" style={{ top: '8%', left: '50%' }}>ॐ</div>
      <div className="sacred-symbol" style={{ top: '25%', right: '20%' }}>☸</div>
      <div className="sacred-symbol" style={{ bottom: '15%', left: '40%' }}>🕉</div>
      <div className="sacred-symbol" style={{ bottom: '30%', right: '35%' }}>✡</div>
      
      <MarathiConverter />
    </div>
  );
}
