import { z } from "zod"

export const RoomTypeSchema = z.enum([
  "Double",
  "Family",
  "Single",
  "Suite",
  "Twin",
])

export const RoomFeatureSchema = z.enum([
  "Radio",
  "Refreshments",
  "Safe",
  "TV",
  "Views",
  "WiFi",
])

export const FeaturesObjectSchema = z.object({
  Radio: z.boolean(),
  Refreshments: z.boolean(),
  Safe: z.boolean(),
  TV: z.boolean(),
  Views: z.boolean(),
  WiFi: z.boolean(),
})

export const RoomDataSchema = z.object({
  accessible: z.boolean(),
  description: z.string(),
  features: z.array(RoomFeatureSchema),
  image: z.string(),
  roomName: z.string(),
  roomPrice: z.number().int(),
  roomid: z.number().int(),
  type: RoomTypeSchema,
})

export const EditRoomDataSchema = RoomDataSchema.extend({
  roomId: z.number().int().positive(),
  featuresObject: FeaturesObjectSchema,
})

export const RoomsListResponseSchema = z.union([
  z.object({
    rooms: z.array(RoomDataSchema),
  }),
])

export type RoomType = z.infer<typeof RoomTypeSchema>
export type RoomFeature = z.infer<typeof RoomFeatureSchema>
export type FeaturesObject = z.infer<typeof FeaturesObjectSchema>
export type RoomData = z.infer<typeof RoomDataSchema>
export type EditRoomData = z.infer<typeof EditRoomDataSchema>
export type RoomsListResponse = z.infer<typeof RoomsListResponseSchema>
