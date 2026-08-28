import { APIRequestContext } from "@playwright/test";
import { AuthCredentials } from "../models/auth.schema";

export class AuthClient {
  constructor(
    private request: APIRequestContext,
    private authUrl: string = "/api/auth",
  ) {}

  async login(payload: AuthCredentials) {
    const response = await this.request.post(`${this.authUrl}/login`, {
      data: payload,
    });

    return response;
  }

  async getToken(payload: AuthCredentials): Promise<string> {
    const response = await this.login(payload);
    const responseBody = await response.json();

    return responseBody.token;
  }

  async validateToken(token: string) {
    const validationResponse = await this.request.post(
      `${this.authUrl}/validate`,
      {
        data: { token },
      },
    );
    return validationResponse;
  }
}
