import { makeVar } from '@apollo/client';

const isLoggedIn = makeVar<boolean>(false);

export { isLoggedIn };
