import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface BookingState {
  sport: string;
  date: string;
  startTime: string;
  duration: string;
  slots: string[];
  pricePerHour: number;
  playerName: string;
  playerCount: string;
}

interface BookingContextType {
  booking: BookingState;
  setSport: (sport: string) => void;
  setDate: (date: string) => void;
  setStartTime: (time: string) => void;
  setDuration: (dur: string) => void;
  setSlots: (slots: string[]) => void;
  setPlayerName: (name: string) => void;
  setPlayerCount: (count: string) => void;
  setPricePerHour: (price: number) => void;
  resetBooking: () => void;
  getWhatsAppMessage: () => string;
}

const defaultBooking: BookingState = {
  sport: "",
  date: "",
  startTime: "",
  duration: "",
  slots: [],
  pricePerHour: 500,
  playerName: "",
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

  const setStartTime = useCallback((startTime: string) => {
    setBooking(prev => ({ ...prev, startTime }));
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
      return `Hello AKAN'S ARENA Booking Coordinator,
I would like to book a sports slot.
Sport: ${b.sport || "Not selected"}
Date: ${b.date || "Not selected"}
Time: ${b.startTime || "Not selected"}
Duration: ${b.duration || "Not selected"}
Number of Players: ${b.playerCount || "Not specified"}
My Name: ${b.playerName || "Not provided"}
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
      booking, setSport, setDate, setStartTime, setDuration,
      setSlots, setPlayerName, setPlayerCount, setPricePerHour,
      resetBooking, getWhatsAppMessage
    }}>
      {children}
    </BookingContext.Provider>
  );
}
