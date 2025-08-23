// src/lib/routes.ts
export type RoomType = 'solo' | 'group';

export function getRoomPath(roomType: RoomType, roomId: number | string) {
  const id = String(roomId);
  if (roomType === 'solo') {
    return `/solo/rooms/${id}`;
  }
  // group など他タイプは従来のまま（必要なら後で分岐拡張）
  return `/rooms/${id}`;
}