export interface EntryResponseInterface {
  createdAt: Date;

  deletable: boolean;

  depth: number;

  folder: string | null;

  id: string;

  isFile: boolean;

  isFolder: boolean;

  name: string;

  path: string;

  public: boolean;

  size: number;

  timestamp: number;

  uid: string;

  updatedAt: Date;
}

export interface ErrorResponseInterface {
  error?: string;

  message: string | string[];

  statusCode: number;
}

export interface IdentifyResponseInterface {
  admin: boolean;

  avatar: string | null;

  createdAt: string;

  displayName: string;

  id: string;

  username: string;
}
