import { fill, flatMap, sum, toInteger } from "lodash";

const MAX_ROOM_SIZE = 12;

export default function generateRooms(size, complexity) {
  function buildRoomList(width, wIndex, roomSizes) {
    const x = sum(roomSizes.slice(0, wIndex));

    return roomSizes.map((height, hIndex) => {
      const y = sum(roomSizes.slice(0, hIndex));

      return { x, y, width, height };
    });
  }

  const preferredRoomSize = toInteger(MAX_ROOM_SIZE / Math.sqrt(complexity));
  const roomSizes = fill(Array(toInteger(size / preferredRoomSize)), preferredRoomSize);

  // Make the last room take up any remaining space
  roomSizes.push(roomSizes.pop() + (size % preferredRoomSize));

  return flatMap(roomSizes, buildRoomList);
}
