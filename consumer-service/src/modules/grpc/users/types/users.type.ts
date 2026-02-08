import { Observable } from 'rxjs';

export type User = { id: number; name: string; age: number };

export type GetFilteredUsersRequest = Record<string, never>;
export type GetFilteredUsersResponse = { users: User[] };

export interface UsersGrpcService {
  GetFilteredUsers(
    req: GetFilteredUsersRequest,
  ): Observable<GetFilteredUsersResponse>;
}
