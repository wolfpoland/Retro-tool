import { PrismaClient } from "@prisma/client";

export type ExternalProvider = {
  externalId: string;
  name: string;
  email: string;
  avatar: string;
};

export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUserFromExternalProvider({
    externalId,
    avatar,
    name,
    email,
  }: ExternalProvider) {
    await this.prisma.user.create({
      data: {
        email,
        externalId,
        avatar,
        name,
      },
    });
  }

  getUser(externalId: string) {
    return this.prisma.user.findUnique({
      where: {
        externalId: externalId,
      },
    });
  }
}
