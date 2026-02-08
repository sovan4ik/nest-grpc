import { Observable } from 'rxjs';
import {
  GetFilteredUsersRequest,
  GetFilteredUsersResponse,
} from '../types/users.type';

export interface UsersGrpcService {
  GetFilteredUsers(
    req: GetFilteredUsersRequest,
  ): Observable<GetFilteredUsersResponse>;
}
