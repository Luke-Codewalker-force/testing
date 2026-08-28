import { test, expect } from "../fixtures/page-object.fixture"
import { issue, severity, feature } from "allure-js-commons"
import { RoomsListResponseSchema } from "../models/room.schema"

test.describe("API Tests - Room", () => {
  test(
    "Should successfully get rooms list",
    { tag: ["@smoke", "@regression", "@api", "@room"] },
    async ({ roomClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-12",
        "SCRUM-12",
      )
      severity("critical")
      feature("Room API")

      // Act
      const response = await roomClient.getRooms()

      // Assert
      expect(response.status()).toBe(200)
      expect(response.headers()["content-type"]).toContain("application/json")

      const responseBody = await response.json()

      const validationResult = RoomsListResponseSchema.safeParse(responseBody)
      expect(validationResult.success).toBe(true)
    },
  )
})
