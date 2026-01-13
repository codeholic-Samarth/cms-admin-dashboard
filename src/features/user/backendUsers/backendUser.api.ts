import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  BackendUser,
  BackendUserCreatePayload,
  BackendUserListResponse,
  UseBackendUsersParams,
} from './backendUser.types'

export const backendUserService = {
  getAllUsers: async (
    params: UseBackendUsersParams,
  ): Promise<BackendUserListResponse> => {
    const response = await axiosFetch.get<BackendUserListResponse>(
      API_ENDPOINTS.BACKEND_USER.GET_ALL,
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          offset: params.offset,
          search: params.search ?? '',
        },
      },
    )

    return response.data
  },
  addUser: async (payload: BackendUserCreatePayload): Promise<BackendUser> => {
    const response = await axiosFetch.post<BackendUser>(
      API_ENDPOINTS.BACKEND_USER.ADD_USER,
      payload,
    )

    return response.data
  },
}
