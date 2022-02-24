import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Competition = {
  __typename?: 'Competition';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum EmailVerificationStatus {
  Pending = 'PENDING',
  Unnecessary = 'UNNECESSARY',
  Verified = 'VERIFIED'
}

export enum Level {
  Beginner = 'BEGINNER',
  Enjoy = 'ENJOY',
  Expert = 'EXPERT',
  Middle = 'MIDDLE',
  Open = 'OPEN',
  Unnecessary = 'UNNECESSARY'
}

export type Mutation = {
  __typename?: 'Mutation';
  createRecruitment: Recruitment;
  createUser: User;
  deleteRecruitment: Scalars['Boolean'];
  loginUser: User;
  logoutUser: Scalars['Boolean'];
  updateRecruitment: Recruitment;
};


export type MutationCreateRecruitmentArgs = {
  input: RecruitmentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteRecruitmentArgs = {
  id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationUpdateRecruitmentArgs = {
  id: Scalars['String'];
  input: RecruitmentInput;
};

export type Prefecture = {
  __typename?: 'Prefecture';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCompetitions: Array<Competition>;
  getCurrentUser?: Maybe<User>;
  getCurrentUserRecruitments: Array<Recruitment>;
  getEditRecruitment: Recruitment;
  getPrefectures: Array<Prefecture>;
  getRecruitments: Array<Recruitment>;
};


export type QueryGetEditRecruitmentArgs = {
  id: Scalars['String'];
};

export type Recruitment = {
  __typename?: 'Recruitment';
  capacity?: Maybe<Scalars['Int']>;
  closingAt?: Maybe<Scalars['DateTime']>;
  competition?: Maybe<Competition>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isPublished: Scalars['Boolean'];
  level: Level;
  locationLat?: Maybe<Scalars['Float']>;
  locationLng?: Maybe<Scalars['Float']>;
  place?: Maybe<Scalars['String']>;
  prefecture?: Maybe<Prefecture>;
  startAt?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  type: Type;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum Role {
  Admin = 'ADMIN',
  General = 'GENERAL'
}

export enum Type {
  Coaching = 'COACHING',
  Individual = 'INDIVIDUAL',
  Joining = 'JOINING',
  Opponent = 'OPPONENT',
  Others = 'OTHERS',
  Teammate = 'TEAMMATE',
  Unnecessary = 'UNNECESSARY'
}

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  email: Scalars['String'];
  emailVerificationStatus: EmailVerificationStatus;
  id: Scalars['String'];
  introduction?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Role;
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RecruitmentInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  closingAt?: InputMaybe<Scalars['DateTime']>;
  competitionId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  level: Level;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  place?: InputMaybe<Scalars['String']>;
  prefectureId?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  title: Scalars['String'];
  type: Type;
};

export type GetCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionsQuery = { __typename?: 'Query', getCompetitions: Array<{ __typename?: 'Competition', id: string, name: string }> };

export type GetPrefecturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrefecturesQuery = { __typename?: 'Query', getPrefectures: Array<{ __typename?: 'Prefecture', id: string, name: string }> };

export type GetRecruitmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecruitmentsQuery = { __typename?: 'Query', getRecruitments: Array<{ __typename?: 'Recruitment', id: string, title: string, content?: string | null, type: Type, level: Level, place?: string | null, startAt?: any | null, closingAt?: any | null, updatedAt: any, capacity?: number | null, prefecture?: { __typename?: 'Prefecture', name: string } | null, user: { __typename?: 'User', name: string, avatar: string } }> };

export type GetCurrentUserRecruitmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserRecruitmentsQuery = { __typename?: 'Query', getCurrentUserRecruitments: Array<{ __typename?: 'Recruitment', id: string, title: string, isPublished: boolean }> };

export type GetEditRecruitmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEditRecruitmentQuery = { __typename?: 'Query', getEditRecruitment: { __typename?: 'Recruitment', id: string, title: string, type: Type, level: Level, place?: string | null, startAt?: any | null, content?: string | null, capacity?: number | null, closingAt?: any | null, locationLat?: number | null, locationLng?: number | null, isPublished: boolean, competition?: { __typename?: 'Competition', id: string } | null, prefecture?: { __typename?: 'Prefecture', id: string } | null } };

export type CreateRecruitmentMutationVariables = Exact<{
  title: Scalars['String'];
  competitionId?: InputMaybe<Scalars['String']>;
  closingAt?: InputMaybe<Scalars['DateTime']>;
  content?: InputMaybe<Scalars['String']>;
  level: Level;
  type: Type;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  prefectureId?: InputMaybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  capacity?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
}>;


export type CreateRecruitmentMutation = { __typename?: 'Mutation', createRecruitment: { __typename?: 'Recruitment', title: string, content?: string | null, closingAt?: any | null } };

export type UpdateRecruitmentMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  competitionId?: InputMaybe<Scalars['String']>;
  closingAt?: InputMaybe<Scalars['DateTime']>;
  content?: InputMaybe<Scalars['String']>;
  level: Level;
  type: Type;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  prefectureId?: InputMaybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  capacity?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
}>;


export type UpdateRecruitmentMutation = { __typename?: 'Mutation', updateRecruitment: { __typename?: 'Recruitment', id: string, title: string, isPublished: boolean } };

export type DeleteRecruitmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRecruitmentMutation = { __typename?: 'Mutation', deleteRecruitment: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, name: string, email: string, role: Role, avatar: string, introduction?: string | null, emailVerificationStatus: EmailVerificationStatus } | null };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, avatar: string, introduction?: string | null, emailVerificationStatus: EmailVerificationStatus } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'User', id: string, name: string, email: string, role: Role, avatar: string, introduction?: string | null, emailVerificationStatus: EmailVerificationStatus } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };


export const GetCompetitionsDocument = gql`
    query GetCompetitions {
  getCompetitions {
    id
    name
  }
}
    `;

/**
 * __useGetCompetitionsQuery__
 *
 * To run a query within a React component, call `useGetCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompetitionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options);
      }
export function useGetCompetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options);
        }
export type GetCompetitionsQueryHookResult = ReturnType<typeof useGetCompetitionsQuery>;
export type GetCompetitionsLazyQueryHookResult = ReturnType<typeof useGetCompetitionsLazyQuery>;
export type GetCompetitionsQueryResult = Apollo.QueryResult<GetCompetitionsQuery, GetCompetitionsQueryVariables>;
export const GetPrefecturesDocument = gql`
    query GetPrefectures {
  getPrefectures {
    id
    name
  }
}
    `;

/**
 * __useGetPrefecturesQuery__
 *
 * To run a query within a React component, call `useGetPrefecturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrefecturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrefecturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPrefecturesQuery(baseOptions?: Apollo.QueryHookOptions<GetPrefecturesQuery, GetPrefecturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrefecturesQuery, GetPrefecturesQueryVariables>(GetPrefecturesDocument, options);
      }
export function useGetPrefecturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrefecturesQuery, GetPrefecturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrefecturesQuery, GetPrefecturesQueryVariables>(GetPrefecturesDocument, options);
        }
export type GetPrefecturesQueryHookResult = ReturnType<typeof useGetPrefecturesQuery>;
export type GetPrefecturesLazyQueryHookResult = ReturnType<typeof useGetPrefecturesLazyQuery>;
export type GetPrefecturesQueryResult = Apollo.QueryResult<GetPrefecturesQuery, GetPrefecturesQueryVariables>;
export const GetRecruitmentsDocument = gql`
    query GetRecruitments {
  getRecruitments {
    id
    title
    content
    type
    level
    place
    startAt
    closingAt
    updatedAt
    capacity
    prefecture {
      name
    }
    user {
      name
      avatar
    }
  }
}
    `;

/**
 * __useGetRecruitmentsQuery__
 *
 * To run a query within a React component, call `useGetRecruitmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecruitmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecruitmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecruitmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecruitmentsQuery, GetRecruitmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecruitmentsQuery, GetRecruitmentsQueryVariables>(GetRecruitmentsDocument, options);
      }
export function useGetRecruitmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecruitmentsQuery, GetRecruitmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecruitmentsQuery, GetRecruitmentsQueryVariables>(GetRecruitmentsDocument, options);
        }
export type GetRecruitmentsQueryHookResult = ReturnType<typeof useGetRecruitmentsQuery>;
export type GetRecruitmentsLazyQueryHookResult = ReturnType<typeof useGetRecruitmentsLazyQuery>;
export type GetRecruitmentsQueryResult = Apollo.QueryResult<GetRecruitmentsQuery, GetRecruitmentsQueryVariables>;
export const GetCurrentUserRecruitmentsDocument = gql`
    query GetCurrentUserRecruitments {
  getCurrentUserRecruitments {
    id
    title
    isPublished
  }
}
    `;

/**
 * __useGetCurrentUserRecruitmentsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserRecruitmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserRecruitmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserRecruitmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserRecruitmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserRecruitmentsQuery, GetCurrentUserRecruitmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserRecruitmentsQuery, GetCurrentUserRecruitmentsQueryVariables>(GetCurrentUserRecruitmentsDocument, options);
      }
export function useGetCurrentUserRecruitmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserRecruitmentsQuery, GetCurrentUserRecruitmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserRecruitmentsQuery, GetCurrentUserRecruitmentsQueryVariables>(GetCurrentUserRecruitmentsDocument, options);
        }
export type GetCurrentUserRecruitmentsQueryHookResult = ReturnType<typeof useGetCurrentUserRecruitmentsQuery>;
export type GetCurrentUserRecruitmentsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserRecruitmentsLazyQuery>;
export type GetCurrentUserRecruitmentsQueryResult = Apollo.QueryResult<GetCurrentUserRecruitmentsQuery, GetCurrentUserRecruitmentsQueryVariables>;
export const GetEditRecruitmentDocument = gql`
    query GetEditRecruitment($id: String!) {
  getEditRecruitment(id: $id) {
    id
    title
    type
    level
    place
    startAt
    content
    capacity
    closingAt
    competition {
      id
    }
    prefecture {
      id
    }
    locationLat
    locationLng
    isPublished
  }
}
    `;

/**
 * __useGetEditRecruitmentQuery__
 *
 * To run a query within a React component, call `useGetEditRecruitmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditRecruitmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditRecruitmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEditRecruitmentQuery(baseOptions: Apollo.QueryHookOptions<GetEditRecruitmentQuery, GetEditRecruitmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEditRecruitmentQuery, GetEditRecruitmentQueryVariables>(GetEditRecruitmentDocument, options);
      }
export function useGetEditRecruitmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEditRecruitmentQuery, GetEditRecruitmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEditRecruitmentQuery, GetEditRecruitmentQueryVariables>(GetEditRecruitmentDocument, options);
        }
export type GetEditRecruitmentQueryHookResult = ReturnType<typeof useGetEditRecruitmentQuery>;
export type GetEditRecruitmentLazyQueryHookResult = ReturnType<typeof useGetEditRecruitmentLazyQuery>;
export type GetEditRecruitmentQueryResult = Apollo.QueryResult<GetEditRecruitmentQuery, GetEditRecruitmentQueryVariables>;
export const CreateRecruitmentDocument = gql`
    mutation CreateRecruitment($title: String!, $competitionId: String, $closingAt: DateTime, $content: String, $level: Level!, $type: Type!, $locationLat: Float, $locationLng: Float, $startAt: DateTime, $prefectureId: String, $isPublished: Boolean!, $capacity: Int, $place: String) {
  createRecruitment(
    input: {title: $title, competitionId: $competitionId, closingAt: $closingAt, content: $content, level: $level, type: $type, locationLat: $locationLat, locationLng: $locationLng, isPublished: $isPublished, startAt: $startAt, capacity: $capacity, place: $place, prefectureId: $prefectureId}
  ) {
    title
    content
    closingAt
  }
}
    `;
export type CreateRecruitmentMutationFn = Apollo.MutationFunction<CreateRecruitmentMutation, CreateRecruitmentMutationVariables>;

/**
 * __useCreateRecruitmentMutation__
 *
 * To run a mutation, you first call `useCreateRecruitmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecruitmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecruitmentMutation, { data, loading, error }] = useCreateRecruitmentMutation({
 *   variables: {
 *      title: // value for 'title'
 *      competitionId: // value for 'competitionId'
 *      closingAt: // value for 'closingAt'
 *      content: // value for 'content'
 *      level: // value for 'level'
 *      type: // value for 'type'
 *      locationLat: // value for 'locationLat'
 *      locationLng: // value for 'locationLng'
 *      startAt: // value for 'startAt'
 *      prefectureId: // value for 'prefectureId'
 *      isPublished: // value for 'isPublished'
 *      capacity: // value for 'capacity'
 *      place: // value for 'place'
 *   },
 * });
 */
export function useCreateRecruitmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecruitmentMutation, CreateRecruitmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecruitmentMutation, CreateRecruitmentMutationVariables>(CreateRecruitmentDocument, options);
      }
export type CreateRecruitmentMutationHookResult = ReturnType<typeof useCreateRecruitmentMutation>;
export type CreateRecruitmentMutationResult = Apollo.MutationResult<CreateRecruitmentMutation>;
export type CreateRecruitmentMutationOptions = Apollo.BaseMutationOptions<CreateRecruitmentMutation, CreateRecruitmentMutationVariables>;
export const UpdateRecruitmentDocument = gql`
    mutation UpdateRecruitment($id: String!, $title: String!, $competitionId: String, $closingAt: DateTime, $content: String, $level: Level!, $type: Type!, $locationLat: Float, $locationLng: Float, $startAt: DateTime, $prefectureId: String, $isPublished: Boolean!, $capacity: Int, $place: String) {
  updateRecruitment(
    id: $id
    input: {title: $title, competitionId: $competitionId, closingAt: $closingAt, content: $content, level: $level, type: $type, locationLat: $locationLat, locationLng: $locationLng, isPublished: $isPublished, startAt: $startAt, capacity: $capacity, place: $place, prefectureId: $prefectureId}
  ) {
    id
    title
    isPublished
  }
}
    `;
export type UpdateRecruitmentMutationFn = Apollo.MutationFunction<UpdateRecruitmentMutation, UpdateRecruitmentMutationVariables>;

/**
 * __useUpdateRecruitmentMutation__
 *
 * To run a mutation, you first call `useUpdateRecruitmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecruitmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecruitmentMutation, { data, loading, error }] = useUpdateRecruitmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      competitionId: // value for 'competitionId'
 *      closingAt: // value for 'closingAt'
 *      content: // value for 'content'
 *      level: // value for 'level'
 *      type: // value for 'type'
 *      locationLat: // value for 'locationLat'
 *      locationLng: // value for 'locationLng'
 *      startAt: // value for 'startAt'
 *      prefectureId: // value for 'prefectureId'
 *      isPublished: // value for 'isPublished'
 *      capacity: // value for 'capacity'
 *      place: // value for 'place'
 *   },
 * });
 */
export function useUpdateRecruitmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecruitmentMutation, UpdateRecruitmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecruitmentMutation, UpdateRecruitmentMutationVariables>(UpdateRecruitmentDocument, options);
      }
export type UpdateRecruitmentMutationHookResult = ReturnType<typeof useUpdateRecruitmentMutation>;
export type UpdateRecruitmentMutationResult = Apollo.MutationResult<UpdateRecruitmentMutation>;
export type UpdateRecruitmentMutationOptions = Apollo.BaseMutationOptions<UpdateRecruitmentMutation, UpdateRecruitmentMutationVariables>;
export const DeleteRecruitmentDocument = gql`
    mutation DeleteRecruitment($id: String!) {
  deleteRecruitment(id: $id)
}
    `;
export type DeleteRecruitmentMutationFn = Apollo.MutationFunction<DeleteRecruitmentMutation, DeleteRecruitmentMutationVariables>;

/**
 * __useDeleteRecruitmentMutation__
 *
 * To run a mutation, you first call `useDeleteRecruitmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecruitmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecruitmentMutation, { data, loading, error }] = useDeleteRecruitmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecruitmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecruitmentMutation, DeleteRecruitmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecruitmentMutation, DeleteRecruitmentMutationVariables>(DeleteRecruitmentDocument, options);
      }
export type DeleteRecruitmentMutationHookResult = ReturnType<typeof useDeleteRecruitmentMutation>;
export type DeleteRecruitmentMutationResult = Apollo.MutationResult<DeleteRecruitmentMutation>;
export type DeleteRecruitmentMutationOptions = Apollo.BaseMutationOptions<DeleteRecruitmentMutation, DeleteRecruitmentMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    name
    email
    role
    avatar
    introduction
    emailVerificationStatus
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
  createUser(input: {name: $name, email: $email, password: $password}) {
    id
    name
    email
    role
    avatar
    introduction
    emailVerificationStatus
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password}) {
    id
    name
    email
    role
    avatar
    introduction
    emailVerificationStatus
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;