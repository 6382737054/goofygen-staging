import { createContext, useContext, useEffect, useState } from "react";

const EventsContext = createContext(null);

const STORAGE_KEY = "divya_events_v1";

const seed = [
  {
    id: "evt-1",
    title: "Open Mic: Tech Talks Friday",
    description: "Lightning talks from the community. Bring your ideas.",
    date: "2026-06-12",
    location: "Online",
    speakers: [],
    audience: [],
  },
  {
    id: "evt-2",
    title: "Forum Meetup — Intro Night",
    description: "Meet other members, share what you're working on.",
    date: "2026-06-20",
    location: "Bangalore",
    speakers: [],
    audience: [],
  },
];

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return seed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (evt) => {
    setEvents((prev) => [
      ...prev,
      { ...evt, id: `evt-${Date.now()}`, speakers: [], audience: [] },
    ]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const joinEvent = (id, role, name) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const key = role === "speaker" ? "speakers" : "audience";
        if (e[key].some((p) => p.name.toLowerCase() === name.toLowerCase())) return e;
        return { ...e, [key]: [...e[key], { name }] };
      })
    );
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent, joinEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used within EventsProvider");
  return ctx;
}
