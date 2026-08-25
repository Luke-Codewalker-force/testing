export type AuthData = {
  username?: string;
  password?: string;
};

type RoomType = "Double" | "Family" | "Single" | "Suite" | "Twin";

type RoomFeatures = "Radio" | "Refreshments" | "Safe" | "TV" | "Views" | "WiFi";

type FeaturesObject = {
  Radio: boolean;
  Refreshments: boolean;
  Safe: boolean;
  TV: boolean;
  Views: boolean;
  WiFi: boolean;
};

export type EditRoomData = RoomData & {
  featuresObject: FeaturesObject;
  roomId: number;
};

export type RoomData = {
  accessible: boolean;
  description: string;
  features: RoomFeatures[];
  image: string;
  roomName: string;
  roomPrice: string;
  type: RoomType;
};
