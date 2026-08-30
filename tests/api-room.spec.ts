import { test, expect } from "../fixtures/page-object.fixture";
import { issue, severity, feature } from "allure-js-commons";
import {
  RoomData,
  RoomDataSchema,
  RoomsListResponseSchema,
} from "../models/room.schema";

const baseTags = ["@smoke", "@regression", "@api", "@room"];

test.describe("API Tests - Room", () => {
  test(
    "Should successfully get rooms list",
    { tag: baseTags },
    async ({ roomClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-12",
        "SCRUM-12",
      );
      severity("critical");
      feature("Room API");

      // Act
      const response = await roomClient.getRooms();

      // Assert
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");

      const responseBody = await response.json();

      const validationResult = RoomsListResponseSchema.safeParse(responseBody);
      expect(validationResult.success).toBe(true);
    },
  );

  test(
    "Should succesfully get room by its Id",
    { tag: baseTags },
    async ({ roomClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-12",
        "SCRUM-12",
      );
      severity("critical");
      feature("Room API");

      // Arrange
      const roomsResponse = await roomClient.getRooms();
      const roomsResponseBody = await roomsResponse.json();
      const roomId = roomsResponseBody.rooms[0].roomid;
      expect(roomId).toBeDefined();
      expect(roomId).toBeGreaterThan(0);

      // Act
      const singleRoomResponse = await roomClient.getRoomById(roomId);
      const singleRoomResponseBody: RoomData = await singleRoomResponse.json();

      // Assert
      const validationResult = RoomDataSchema.safeParse(singleRoomResponseBody);
      expect(validationResult.success).toBe(true);
      expect(singleRoomResponseBody.roomid).toBe(roomId);
    },
  );
});
