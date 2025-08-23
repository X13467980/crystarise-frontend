export type RoomData = {
  roomName: string;
  goalName: string;
  goalNumber: number;
  goalUnit: string;
};

export function RoomDataGetMock(): RoomData {
  return {
    roomName: "My Room",
    goalName: "Push-ups",
    goalNumber: 100,
    goalUnit: "times",
  };
}