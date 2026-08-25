import { APIRequestContext } from "@playwright/test";
import { EditRoomData, RoomData } from "./types";

export class RoomClient {
  constructor(
    private request: APIRequestContext,
    private apiUrl: string = "/api/room",
  ) {}

  async getRooms() {
    const response = await this.request.get(this.apiUrl);

    return response;
  }

  async getRoomById(roomId: number) {
    const response = await this.request.get(`${this.apiUrl}/${roomId}`);

    return response;
  }

  async createRoom(roomData: RoomData) {
    const response = await this.request.post(this.apiUrl, {
      data: roomData,
    });

    return response;
  }

  async deleteRoom(roomId: number) {
    const response = await this.request.delete(`${this.apiUrl}/${roomId}`);

    return response;
  }

  async editRoom(editRoomData: EditRoomData) {
    const response = await this.request.put(
      `${this.apiUrl}/${editRoomData.roomId}`,
    );

    return response;
  }
}
