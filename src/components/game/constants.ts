export const GAME_NAME = "ECHOES OF ORBIT";
export type Character = "boy" | "girl";
export type Destination = "moon" | "mars" | "deep";

export function makeGuestId() {
  return `GUEST-${Math.floor(1000 + Math.random() * 9000)}`;
}
