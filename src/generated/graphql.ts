import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Applicant = {
  __typename?: 'Applicant';
  createdAt: Scalars['DateTime'];
  managementStatus: ManagementStatus;
};

export type Competition = {
  __typename?: 'Competition';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum EmailVerificationStatus {
  Pending = 'PENDING',
  Verified = 'VERIFIED'
}

export enum ManagementStatus {
  Accepted = 'ACCEPTED',
  Backlog = 'BACKLOG',
  Rejected = 'REJECTED',
  Unnecessary = 'UNNECESSARY'
}

export type Mutation = {
  __typename?: 'Mutation';
  addRecruitmentTag: Scalars['Boolean'];
  applyForRecruitment: Scalars['Boolean'];
  createRecruitment: Recruitment;
  createStock: Scalars['Boolean'];
  createTag: Tag;
  createUser: Scalars['Boolean'];
  deleteRecruitment: Scalars['Boolean'];
  deleteStock: Scalars['Boolean'];
  loginUser: Scalars['Boolean'];
  logoutUser: Scalars['Boolean'];
  updateRecruitment: Recruitment;
};


export type MutationAddRecruitmentTagArgs = {
  recruitmentId: Scalars['String'];
  tagId: Scalars['String'];
};


export type MutationApplyForRecruitmentArgs = {
  input?: InputMaybe<ApplicantInput>;
  recruitmentId: Scalars['String'];
};


export type MutationCreateRecruitmentArgs = {
  input: RecruitmentInput;
};


export type MutationCreateStockArgs = {
  recruitmentId: Scalars['String'];
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteRecruitmentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteStockArgs = {
  recruitmentId: Scalars['String'];
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
  checkApplied: Scalars['Boolean'];
  checkStocked: Scalars['Boolean'];
  getAppliedCounts: Scalars['Int'];
  getAppliedRecruitments: Array<Recruitment>;
  getCompetitions: Array<Competition>;
  getCurrentUser?: Maybe<User>;
  getCurrentUserRecruitments: Array<Recruitment>;
  getPrefectures: Array<Prefecture>;
  getRecruitment: Recruitment;
  getRecruitmentTags: Array<Maybe<Tag>>;
  getRecruitments: Array<Recruitment>;
  getStockedCount: Scalars['Int'];
  getStockedRecruitments: Array<Recruitment>;
  getTags: Array<Tag>;
};


export type QueryCheckAppliedArgs = {
  recruitmentId: Scalars['String'];
};


export type QueryCheckStockedArgs = {
  recruitmentId: Scalars['String'];
};


export type QueryGetAppliedCountsArgs = {
  recruitmentId: Scalars['String'];
};


export type QueryGetRecruitmentArgs = {
  id: Scalars['String'];
};


export type QueryGetRecruitmentTagsArgs = {
  recruitmentId: Scalars['String'];
};


export type QueryGetStockedCountArgs = {
  recruitmentId: Scalars['String'];
};

export type Recruitment = {
  __typename?: 'Recruitment';
  applicant?: Maybe<Applicant>;
  capacity?: Maybe<Scalars['Int']>;
  closingAt?: Maybe<Scalars['DateTime']>;
  competition?: Maybe<Competition>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locationLat?: Maybe<Scalars['Float']>;
  locationLng?: Maybe<Scalars['Float']>;
  place?: Maybe<Scalars['String']>;
  prefecture?: Maybe<Prefecture>;
  startAt?: Maybe<Scalars['DateTime']>;
  status: Status;
  tags: Array<Maybe<Tag>>;
  title: Scalars['String'];
  type: Type;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum Role {
  Admin = 'ADMIN',
  General = 'GENERAL'
}

export enum Status {
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum Type {
  Individual = 'INDIVIDUAL',
  Joining = 'JOINING',
  Member = 'MEMBER',
  Opponent = 'OPPONENT',
  Others = 'OTHERS',
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

export type ApplicantInput = {
  content: Scalars['String'];
  managementStatus: ManagementStatus;
};

export type CreateTagInput = {
  name: Scalars['String'];
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
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  place?: InputMaybe<Scalars['String']>;
  prefectureId?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  status: Status;
  tags: Array<InputMaybe<RecruitmentTagInput>>;
  title: Scalars['String'];
  type: Type;
};

export type RecruitmentTagInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GetAppliedCountsQueryVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type GetAppliedCountsQuery = { __typename?: 'Query', getAppliedCounts: number };

export type CheckAppliedQueryVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type CheckAppliedQuery = { __typename?: 'Query', checkApplied: boolean };

export type ApplyForRecruitmentMutationVariables = Exact<{
  recruitmentId: Scalars['String'];
  content: Scalars['String'];
  managementStatus: ManagementStatus;
}>;


export type ApplyForRecruitmentMutation = { __typename?: 'Mutation', applyForRecruitment: boolean };

export type GetCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompetitionsQuery = { __typename?: 'Query', getCompetitions: Array<{ __typename?: 'Competition', id: string, name: string }> };

export type GetPrefecturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrefecturesQuery = { __typename?: 'Query', getPrefectures: Array<{ __typename?: 'Prefecture', id: string, name: string }> };

export type GetRecruitmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecruitmentsQuery = { __typename?: 'Query', getRecruitments: Array<{ __typename?: 'Recruitment', id: string, title: string, content?: string | null, type: Type, place?: string | null, startAt?: any | null, status: Status, closingAt?: any | null, updatedAt: any, capacity?: number | null, prefecture?: { __typename?: 'Prefecture', name: string } | null, user: { __typename?: 'User', name: string, avatar: string } }> };

export type GetCurrentUserRecruitmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserRecruitmentsQuery = { __typename?: 'Query', getCurrentUserRecruitments: Array<{ __typename?: 'Recruitment', id: string, title: string, status: Status, type: Type, closingAt?: any | null, competition?: { __typename?: 'Competition', id: string, name: string } | null }> };

export type GetStockedRecruitmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStockedRecruitmentsQuery = { __typename?: 'Query', getStockedRecruitments: Array<{ __typename?: 'Recruitment', id: string, title: string, type: Type, status: Status, user: { __typename?: 'User', id: string, name: string, avatar: string } }> };

export type GetAppliedRecruitmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppliedRecruitmentsQuery = { __typename?: 'Query', getAppliedRecruitments: Array<{ __typename?: 'Recruitment', id: string, title: string, type: Type, applicant?: { __typename?: 'Applicant', managementStatus: ManagementStatus, createdAt: any } | null, user: { __typename?: 'User', id: string, name: string, avatar: string } }> };

export type GetRecruitmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRecruitmentQuery = { __typename?: 'Query', getRecruitment: { __typename?: 'Recruitment', id: string, title: string, type: Type, status: Status, place?: string | null, startAt?: any | null, content?: string | null, capacity?: number | null, updatedAt: any, closingAt?: any | null, locationLat?: number | null, locationLng?: number | null, competition?: { __typename?: 'Competition', id: string, name: string } | null, prefecture?: { __typename?: 'Prefecture', id: string, name: string } | null, user: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type GetEditRecruitmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEditRecruitmentQuery = { __typename?: 'Query', getRecruitment: { __typename?: 'Recruitment', id: string, title: string, type: Type, place?: string | null, startAt?: any | null, content?: string | null, capacity?: number | null, closingAt?: any | null, locationLat?: number | null, locationLng?: number | null, status: Status, competition?: { __typename?: 'Competition', id: string, name: string } | null, prefecture?: { __typename?: 'Prefecture', id: string, name: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string } | null> } };

export type CreateRecruitmentMutationVariables = Exact<{
  title: Scalars['String'];
  competitionId?: InputMaybe<Scalars['String']>;
  closingAt?: InputMaybe<Scalars['DateTime']>;
  content?: InputMaybe<Scalars['String']>;
  type: Type;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  prefectureId?: InputMaybe<Scalars['String']>;
  status: Status;
  capacity?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
  tags: Array<InputMaybe<RecruitmentTagInput>> | InputMaybe<RecruitmentTagInput>;
}>;


export type CreateRecruitmentMutation = { __typename?: 'Mutation', createRecruitment: { __typename?: 'Recruitment', title: string, content?: string | null, closingAt?: any | null } };

export type UpdateRecruitmentMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  competitionId?: InputMaybe<Scalars['String']>;
  closingAt?: InputMaybe<Scalars['DateTime']>;
  content?: InputMaybe<Scalars['String']>;
  type: Type;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
  prefectureId?: InputMaybe<Scalars['String']>;
  status: Status;
  capacity?: InputMaybe<Scalars['Int']>;
  place?: InputMaybe<Scalars['String']>;
  tags: Array<InputMaybe<RecruitmentTagInput>> | InputMaybe<RecruitmentTagInput>;
}>;


export type UpdateRecruitmentMutation = { __typename?: 'Mutation', updateRecruitment: { __typename?: 'Recruitment', id: string, title: string, status: Status } };

export type DeleteRecruitmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRecruitmentMutation = { __typename?: 'Mutation', deleteRecruitment: boolean };

export type CheckStockedQueryVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type CheckStockedQuery = { __typename?: 'Query', checkStocked: boolean };

export type GetStockedCountQueryVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type GetStockedCountQuery = { __typename?: 'Query', getStockedCount: number };

export type CreateStockMutationVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type CreateStockMutation = { __typename?: 'Mutation', createStock: boolean };

export type DeleteStockMutationVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type DeleteStockMutation = { __typename?: 'Mutation', deleteStock: boolean };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type GetRecruitmentTagsQueryVariables = Exact<{
  recruitmentId: Scalars['String'];
}>;


export type GetRecruitmentTagsQuery = { __typename?: 'Query', getRecruitmentTags: Array<{ __typename?: 'Tag', id: string, name: string } | null> };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: string, name: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, name: string, email: string, role: Role, avatar: string, introduction?: string | null, emailVerificationStatus: EmailVerificationStatus } | null };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: boolean };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };


export const GetAppliedCountsDocument = gql`
    query GetAppliedCounts($recruitmentId: String!) {
  getAppliedCounts(recruitmentId: $recruitmentId)
}
    `;

export function useGetAppliedCountsQuery(options: Omit<Urql.UseQueryArgs<GetAppliedCountsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppliedCountsQuery>({ query: GetAppliedCountsDocument, ...options });
};
export const CheckAppliedDocument = gql`
    query CheckApplied($recruitmentId: String!) {
  checkApplied(recruitmentId: $recruitmentId)
}
    `;

export function useCheckAppliedQuery(options: Omit<Urql.UseQueryArgs<CheckAppliedQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckAppliedQuery>({ query: CheckAppliedDocument, ...options });
};
export const ApplyForRecruitmentDocument = gql`
    mutation ApplyForRecruitment($recruitmentId: String!, $content: String!, $managementStatus: ManagementStatus!) {
  applyForRecruitment(
    recruitmentId: $recruitmentId
    input: {content: $content, managementStatus: $managementStatus}
  )
}
    `;

export function useApplyForRecruitmentMutation() {
  return Urql.useMutation<ApplyForRecruitmentMutation, ApplyForRecruitmentMutationVariables>(ApplyForRecruitmentDocument);
};
export const GetCompetitionsDocument = gql`
    query GetCompetitions {
  getCompetitions {
    id
    name
  }
}
    `;

export function useGetCompetitionsQuery(options?: Omit<Urql.UseQueryArgs<GetCompetitionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCompetitionsQuery>({ query: GetCompetitionsDocument, ...options });
};
export const GetPrefecturesDocument = gql`
    query GetPrefectures {
  getPrefectures {
    id
    name
  }
}
    `;

export function useGetPrefecturesQuery(options?: Omit<Urql.UseQueryArgs<GetPrefecturesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPrefecturesQuery>({ query: GetPrefecturesDocument, ...options });
};
export const GetRecruitmentsDocument = gql`
    query GetRecruitments {
  getRecruitments {
    id
    title
    content
    type
    place
    startAt
    status
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

export function useGetRecruitmentsQuery(options?: Omit<Urql.UseQueryArgs<GetRecruitmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecruitmentsQuery>({ query: GetRecruitmentsDocument, ...options });
};
export const GetCurrentUserRecruitmentsDocument = gql`
    query GetCurrentUserRecruitments {
  getCurrentUserRecruitments {
    id
    title
    status
    type
    closingAt
    competition {
      id
      name
    }
  }
}
    `;

export function useGetCurrentUserRecruitmentsQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentUserRecruitmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentUserRecruitmentsQuery>({ query: GetCurrentUserRecruitmentsDocument, ...options });
};
export const GetStockedRecruitmentsDocument = gql`
    query GetStockedRecruitments {
  getStockedRecruitments {
    id
    title
    type
    status
    user {
      id
      name
      avatar
    }
  }
}
    `;

export function useGetStockedRecruitmentsQuery(options?: Omit<Urql.UseQueryArgs<GetStockedRecruitmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStockedRecruitmentsQuery>({ query: GetStockedRecruitmentsDocument, ...options });
};
export const GetAppliedRecruitmentsDocument = gql`
    query GetAppliedRecruitments {
  getAppliedRecruitments {
    id
    title
    type
    applicant {
      managementStatus
      createdAt
    }
    user {
      id
      name
      avatar
    }
  }
}
    `;

export function useGetAppliedRecruitmentsQuery(options?: Omit<Urql.UseQueryArgs<GetAppliedRecruitmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppliedRecruitmentsQuery>({ query: GetAppliedRecruitmentsDocument, ...options });
};
export const GetRecruitmentDocument = gql`
    query GetRecruitment($id: String!) {
  getRecruitment(id: $id) {
    id
    title
    type
    status
    place
    startAt
    content
    capacity
    updatedAt
    closingAt
    competition {
      id
      name
    }
    prefecture {
      id
      name
    }
    user {
      id
      name
      avatar
    }
    locationLat
    locationLng
  }
}
    `;

export function useGetRecruitmentQuery(options: Omit<Urql.UseQueryArgs<GetRecruitmentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecruitmentQuery>({ query: GetRecruitmentDocument, ...options });
};
export const GetEditRecruitmentDocument = gql`
    query GetEditRecruitment($id: String!) {
  getRecruitment(id: $id) {
    id
    title
    type
    place
    startAt
    content
    capacity
    closingAt
    competition {
      id
      name
    }
    prefecture {
      id
      name
    }
    locationLat
    locationLng
    status
    tags {
      id
      name
    }
  }
}
    `;

export function useGetEditRecruitmentQuery(options: Omit<Urql.UseQueryArgs<GetEditRecruitmentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEditRecruitmentQuery>({ query: GetEditRecruitmentDocument, ...options });
};
export const CreateRecruitmentDocument = gql`
    mutation CreateRecruitment($title: String!, $competitionId: String, $closingAt: DateTime, $content: String, $type: Type!, $locationLat: Float, $locationLng: Float, $startAt: DateTime, $prefectureId: String, $status: Status!, $capacity: Int, $place: String, $tags: [recruitmentTagInput]!) {
  createRecruitment(
    input: {title: $title, competitionId: $competitionId, closingAt: $closingAt, content: $content, type: $type, locationLat: $locationLat, locationLng: $locationLng, status: $status, startAt: $startAt, capacity: $capacity, place: $place, prefectureId: $prefectureId, tags: $tags}
  ) {
    title
    content
    closingAt
  }
}
    `;

export function useCreateRecruitmentMutation() {
  return Urql.useMutation<CreateRecruitmentMutation, CreateRecruitmentMutationVariables>(CreateRecruitmentDocument);
};
export const UpdateRecruitmentDocument = gql`
    mutation UpdateRecruitment($id: String!, $title: String!, $competitionId: String, $closingAt: DateTime, $content: String, $type: Type!, $locationLat: Float, $locationLng: Float, $startAt: DateTime, $prefectureId: String, $status: Status!, $capacity: Int, $place: String, $tags: [recruitmentTagInput]!) {
  updateRecruitment(
    id: $id
    input: {title: $title, competitionId: $competitionId, closingAt: $closingAt, content: $content, type: $type, locationLat: $locationLat, locationLng: $locationLng, status: $status, startAt: $startAt, capacity: $capacity, place: $place, prefectureId: $prefectureId, tags: $tags}
  ) {
    id
    title
    status
  }
}
    `;

export function useUpdateRecruitmentMutation() {
  return Urql.useMutation<UpdateRecruitmentMutation, UpdateRecruitmentMutationVariables>(UpdateRecruitmentDocument);
};
export const DeleteRecruitmentDocument = gql`
    mutation DeleteRecruitment($id: String!) {
  deleteRecruitment(id: $id)
}
    `;

export function useDeleteRecruitmentMutation() {
  return Urql.useMutation<DeleteRecruitmentMutation, DeleteRecruitmentMutationVariables>(DeleteRecruitmentDocument);
};
export const CheckStockedDocument = gql`
    query CheckStocked($recruitmentId: String!) {
  checkStocked(recruitmentId: $recruitmentId)
}
    `;

export function useCheckStockedQuery(options: Omit<Urql.UseQueryArgs<CheckStockedQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckStockedQuery>({ query: CheckStockedDocument, ...options });
};
export const GetStockedCountDocument = gql`
    query GetStockedCount($recruitmentId: String!) {
  getStockedCount(recruitmentId: $recruitmentId)
}
    `;

export function useGetStockedCountQuery(options: Omit<Urql.UseQueryArgs<GetStockedCountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStockedCountQuery>({ query: GetStockedCountDocument, ...options });
};
export const CreateStockDocument = gql`
    mutation CreateStock($recruitmentId: String!) {
  createStock(recruitmentId: $recruitmentId)
}
    `;

export function useCreateStockMutation() {
  return Urql.useMutation<CreateStockMutation, CreateStockMutationVariables>(CreateStockDocument);
};
export const DeleteStockDocument = gql`
    mutation DeleteStock($recruitmentId: String!) {
  deleteStock(recruitmentId: $recruitmentId)
}
    `;

export function useDeleteStockMutation() {
  return Urql.useMutation<DeleteStockMutation, DeleteStockMutationVariables>(DeleteStockDocument);
};
export const GetTagsDocument = gql`
    query GetTags {
  getTags {
    id
    name
  }
}
    `;

export function useGetTagsQuery(options?: Omit<Urql.UseQueryArgs<GetTagsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTagsQuery>({ query: GetTagsDocument, ...options });
};
export const GetRecruitmentTagsDocument = gql`
    query GetRecruitmentTags($recruitmentId: String!) {
  getRecruitmentTags(recruitmentId: $recruitmentId) {
    id
    name
  }
}
    `;

export function useGetRecruitmentTagsQuery(options: Omit<Urql.UseQueryArgs<GetRecruitmentTagsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecruitmentTagsQuery>({ query: GetRecruitmentTagsDocument, ...options });
};
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  createTag(input: {name: $name}) {
    id
    name
  }
}
    `;

export function useCreateTagMutation() {
  return Urql.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument);
};
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

export function useGetCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentUserQuery>({ query: GetCurrentUserDocument, ...options });
};
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
  createUser(input: {name: $name, email: $email, password: $password})
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password})
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;

export function useLogoutUserMutation() {
  return Urql.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument);
};