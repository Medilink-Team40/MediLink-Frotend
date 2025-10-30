// import React, { useEffect } from "react";
// import { useZoomStore } from "@/store/useZoomStore";

// export const ZoomApp: React.FC = () => {
//   const { getSignature, loading, error, isJoined, setMeetingData } = useZoomStore();

//   useEffect(() => {
//     // Inicializar datos de la reunión (puedes cargarlo desde backend o props)
//     setMeetingData({
//       meetingNumber: "123456789",
//       passWord: "12345",
//       role: 0,
//       userName: 'medilink',
//       userEmail: "orlandocv0107@gmail.com",
//       leaveUrl: import.meta.env.VITE_URL_HOME,
//     });

//     // Preload SDK
//     import("@zoom/meetingsdk").then(({ ZoomMtg }) => {
//       ZoomMtg.preLoadWasm();
//       ZoomMtg.prepareWebSDK();
//     });
//   }, [setMeetingData]);

//   return (
//     <div className="App">
//       <main>
//         <h1>Zoom Meeting SDK React + Zustand</h1>

//         {loading && <p>🔄 Conectando...</p>}
//         {error && <p style={{ color: "red" }}>  {error}</p>}
//         {!isJoined && !loading && <button onClick={getSignature}>Join Meeting</button>}
//         {isJoined && <p>🎉 Estás en la reunión</p>}

//         <div id="zmmtg-root" style={{ display: "none" }}></div>
//       </main>
//     </div>
//   );
// };
