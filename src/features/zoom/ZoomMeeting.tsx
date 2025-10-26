import React, { useEffect, useRef } from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

declare global {
    interface Window {
        testTool?: any;
    }
}

interface ZoomMeetingProps {
    meetingNumber: string;
    userName: string;
    userEmail: string;
    password: string;
    signature: string;
    apiKey: string;
    lang?: string;
    leaveUrl?: string;
}

const ZoomMeeting: React.FC<ZoomMeetingProps> = ({
    meetingNumber,
    userName,
    userEmail,
    password,
    signature,
    apiKey,
    lang = "es-ES",
    leaveUrl = "/",
}) => {
    const zoomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!zoomRef.current) return;

        const zmClient = ZoomMtgEmbedded.createClient();

        const avLibUrl = `${window.location.origin}/lib`;

        zmClient
            .init({
                zoomAppRoot: zoomRef.current,
                language: "es-ES",
                assetPath: avLibUrl,
                debug: true,
            })
            .then(() => {
                console.log("✅ Zoom SDK initialized");

                return zmClient.join({
                    sdkKey: import.meta.env.VITE_ZOOM_SDK_KEY,
                    signature,
                    meetingNumber,
                    userName,
                    password,
                    userEmail,
                });
            })
            .then(() => {
                console.log("🎉 Joined Zoom meeting successfully!");
            })
            .catch((err) => {
                console.error("❌ Zoom SDK error:", err);
            });

        // Cleanup
        return () => {
            zmClient.leaveMeeting?.();
        };
    }, [meetingNumber, userName, userEmail, password, signature, apiKey, lang, leaveUrl]);

    return (
        <div
            ref={zoomRef}
            id="zoom-embedded-container"
            style={{ width: "100%", height: "100vh" }}
        />
    );
};

export default ZoomMeeting;
