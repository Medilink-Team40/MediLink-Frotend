// src/store/useZoomStore.ts
import { create } from "zustand";
import { ZoomMtg } from "@zoom/meetingsdk";

export interface ZoomState {
  loading: boolean;
  signature: string | null;
  isJoined: boolean;
  error: string | null;
  meetingNumber: string;
  passWord: string;
  role: 0 | 1;
  userName: string;
  userEmail: string;
  registrantToken?: string;
  zakToken?: string;
  leaveUrl: string;
  setMeetingData: (data: Partial<Omit<ZoomState, "loading" | "isJoined" | "error">>) => void;
  getSignature: () => Promise<void>;
  startMeeting: () => void;
  setError: (error: string | null) => void;
}

export const useZoomStore = create<ZoomState>((set, get) => ({
  loading: false,
  signature: null,
  isJoined: false,
  error: null,
  meetingNumber: "",
  passWord: "",
  role: 0,
  userName: "",
  userEmail: "",
  registrantToken: undefined,
  zakToken: undefined,
  leaveUrl: "http://localhost:5173",

  setMeetingData: (data) => set((state) => ({ ...state, ...data })),

  setError: (error) => set({ error }),

  getSignature: async () => {
    const authEndpoint = import.meta.env.VITE_API_BASE_URL; // <- define tu endpoint backend
    const { meetingNumber, role } = get();

    try {
      set({ loading: true, error: null });
      const res = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNumber, role, videoWebRtcMode: 1 }),
      });
      const data = await res.json();
      set({ signature: data.signature, loading: false });
      get().startMeeting();
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Error generando signature", loading: false });
    }
  },

  startMeeting: () => {
    const { signature, meetingNumber, passWord, userName, userEmail, registrantToken, zakToken, leaveUrl } = get();
    if (!signature) {
      set({ error: "No hay signature para iniciar la reunión" });
      return;
    }

    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: () => {
        ZoomMtg.join({
          signature,
          meetingNumber,
          passWord,
          userName,
          userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: () => {
            set({ isJoined: true });
            console.log("  Joined Zoom meeting");
          },
          error: (err: unknown) => {
            console.error("Join error", err);
            set({ error: JSON.stringify(err) });
          },
        });
      },
      error: (err: unknown) => {
        console.error("Init error", err);
        set({ error: JSON.stringify(err) });
      },
    });
  },
}));
