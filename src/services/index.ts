import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://example.com',
  prepareHeaders: (headers, { getState }) => {
    const token = '';

    headers.append('Authorization', `Bearer ${token}`);

    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Reauth logic here
  }

  return result;
};

const api = createApi({
  reducerPath: 'api',
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    exampleEndpoint: builder.query({
      query: () => 'example'
    })
  })
});

export default api;
export const { useExampleEndpointQuery } = api;
