import { APIRequestContext } from "@playwright/test";

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async login(
    username = process.env.ADMIN_LOGIN,
    password = process.env.ADMIN_PASSWORD,
  ) {
    const response = await this.request.post("/api/auth/login", {
      data: { username, password },
    });

    return response;
  }

  async getToken(username?: string, password?: string): Promise<string> {
    const response = await this.login(username, password);
    const responseBody = await response.json();

    return responseBody.token;
  }
}
