import { makeVar } from '@apollo/client';
import { User } from '../generated/graphql';

const currentUser = makeVar<User | null>(null);

export { currentUser };
