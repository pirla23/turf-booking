import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface BookingState {
  sport: string;
  date: string;
  session: string; // "AM", "PM", "Custom"
  startTime: string;
  endTime: string; // For Custom
  duration: string;
  slots: string[];
  pricePerHour: number;
  playerName: string;
  email: string;
  mobile: string;
  playerCount: string;
}

interface BookingContextType {
  booking: BookingState;
  setSport: (sport: string) => void;
  setDate: (date: string) => void;
  setSession: (session: string) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setDuration: (dur: string) => void;
  setSlots: (slots: string[]) => void;
  setPlayerName: (name: string) => void;
  setEmail: (email: string) => void;
  setMobile: (mobile: string) => void;
  setPlayerCount: (count: string) => void;
  setPricePerHour: (price: number) => void;
  resetBooking: () => void;
  getWhatsAppMessage: () => string;
}

const defaultBooking: BookingState = {
  sport: "",
  date: "",
  session: "",
  startTime: "",
  endTime: "",
  duration: "1",
  slots: [],
  pricePerHour: 500,
  playerName: "",
  email: "",
  mobile: "",
  playerCount: "",
};

const BookingContext = createContext<BookingContextType>({} as BookingContextType);

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(defaultBooking);

  const setSport = useCallback((sport: string) => {
    setBooking(prev => ({ ...prev, sport, slots: [] }));
  }, []);

  const setDate = useCallback((date: string) => {
    setBooking(prev => ({ ...prev, date, slots: [] }));
  }, []);

  const setSession = useCallback((session: string) => {
    setBooking(prev => ({ ...prev, session, slots: [], startTime: "", endTime: "" }));
  }, []);

  const setStartTime = useCallback((startTime: string) => {
    setBooking(prev => ({ ...prev, startTime }));
  }, []);

  const setEndTime = useCallback((endTime: string) => {
    setBooking(prev => ({ ...prev, endTime }));
  }, []);

  const setDuration = useCallback((duration: string) => {
    setBooking(prev => ({ ...prev, duration }));
  }, []);

  const setSlots = useCallback((slots: string[]) => {
    setBooking(prev => ({ ...prev, slots }));
  }, []);

  const setPlayerName = useCallback((playerName: string) => {
    setBooking(prev => ({ ...prev, playerName }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setBooking(prev => ({ ...prev, email }));
  }, []);

  const setMobile = useCallback((mobile: string) => {
    setBooking(prev => ({ ...prev, mobile }));
  }, []);

  const setPlayerCount = useCallback((playerCount: string) => {
    setBooking(prev => ({ ...prev, playerCount }));
  }, []);

  const setPricePerHour = useCallback((pricePerHour: number) => {
    setBooking(prev => ({ ...prev, pricePerHour }));
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(defaultBooking);
  }, []);

  const getWhatsAppMessage = useCallback(() => {
    const b = booking;
    if (b.sport || b.date || b.startTime) {
      const timeStr = b.session === 'Custom' ? `${b.startTime} to ${b.endTime}` : b.startTime;
      return `Hello AKAN'S ARENA Booking Coordinator,
I would like to book a sports slot.
Sport: ${b.sport || "Not selected"}
Date: ${b.date || "Not selected"}
Time: ${timeStr || "Not selected"}
Session: ${b.session || "Not specified"}
Duration: ${b.duration || "Not selected"}
Number of Players: ${b.playerCount || "Not specified"}
My Name: ${b.playerName || "Not provided"}
Mobile: ${b.mobile || "Not provided"}
Email: ${b.email || "Not provided"}
Please confirm the availability.
Thank you.`;
    }
    return `Hello AKAN'S ARENA,
I would like to know more about your sports facilities, available slots, and booking process.
Please assist me.
Thank you.`;
  }, [booking]);

  return (
    <BookingContext.Provider value={{
      booking, setSport, setDate, setSession, setStartTime, setEndTime, setDuration,
      setSlots, setPlayerName, setEmail, setMobile, setPlayerCount, setPricePerHour,
      resetBooking, getWhatsAppMessage
    }}>
      {children}
    </BookingContext.Provider>
  );
}
