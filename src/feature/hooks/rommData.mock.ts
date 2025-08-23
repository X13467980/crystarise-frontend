'use client'

export type Room = {
  roomName?: string;
  goalName?: string;
  goalNumber?: number;
  goalUnit?: string;
};

export function RoomDataGetMock(): Room {
  return {
    roomName: 'roomName',
    goalName: 'goalName',
    goalNumber: 100,
    goalUnit: 'km',
  };
}