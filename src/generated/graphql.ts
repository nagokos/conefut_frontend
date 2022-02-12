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
  loginUser: User;
  logoutUser?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateRecruitmentArgs = {
  input: CreateRecruitmentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
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
  getPrefectures: Array<Prefecture>;
};

export type Recruitment = {
  __typename?: 'Recruitment';
  capacity?: Maybe<Scalars['Int']>;
  closingAt: Scalars['DateTime'];
  competition: Competition;
  content: Scalars['String'];
  id: Scalars['String'];
  level: Level;
  locationLat?: Maybe<Scalars['Float']>;
  locationLng?: Maybe<Scalars['Float']>;
  place?: Maybe<Scalars['String']>;
  prefecture: Prefecture;
  startAt?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  type: Type;
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
  Teammate = 'TEAMMATE'
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

export type CreateRecruitmentInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  closingAt: Scalars['DateTime'];
  competitionId: Scalars['String'];
  content: Scalars['String'];
  level: Level;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  place?: InputMaybe<Scalars['String']>;
  prefectureId: Scalars['String'];
  startAt?: InputMaybe<Scalars['DateTime']>;
  title: Scalars['String'];
  type: Type;
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

export type GetCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionsQuery = { __typename?: 'Query', getCompetitions: Array<{ __typename?: 'Competition', id: string, name: string }> };

export type GetPrefecturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrefecturesQuery = { __typename?: 'Query', getPrefectures: Array<{ __typename?: 'Prefecture', id: string, name: string }> };

export type CreateRecruitmentMutationVariables = Exact<{
  title: Scalars['String'];
  competitionId: Scalars['String'];
  closingAt: Scalars['DateTime'];
  content: Scalars['String'];
  level: Level;
  type: Type;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  prefectureId: Scalars['String'];
  capacity?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
}>;


export type CreateRecruitmentMutation = { __typename?: 'Mutation', createRecruitment: { __typename?: 'Recruitment', title: string, content: string, closingAt: any } };

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


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser?: boolean | null };


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
export const CreateRecruitmentDocument = gql`
    mutation CreateRecruitment($title: String!, $competitionId: String!, $closingAt: DateTime!, $content: String!, $level: Level!, $type: Type!, $locationLat: Float, $locationLng: Float, $startAt: DateTime, $prefectureId: String!, $capacity: Int, $place: String) {
  createRecruitment(
    input: {title: $title, competitionId: $competitionId, closingAt: $closingAt, content: $content, level: $level, type: $type, locationLat: $locationLat, locationLng: $locationLng, startAt: $startAt, capacity: $capacity, place: $place, prefectureId: $prefectureId}
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