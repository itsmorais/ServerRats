import { Group } from "@prisma/client";

export type GroupWithOwner = Group & {
    owner: {
      id: string;
      name: string;
    };
  };
  