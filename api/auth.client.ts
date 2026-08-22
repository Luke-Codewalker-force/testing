import { APIRequestContext } from "@playwright/test";
import { AuthData } from "./types";

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async login({ username, password }: AuthData) {
    const response = await this.request.post("/api/auth/login", {
      data: { username, password },
    });

    return response;
  }

  async getToken({ username, password }: AuthData): Promise<string> {
    const response = await this.login({ username, password });
    const responseBody = await response.json();

    return responseBody.token;
  }

  async validateToken(token?: string) {
    const validationResponse = await this.request.post("/api/auth/validate", {
      data: { token },
    });
    return validationResponse;
  }
}
