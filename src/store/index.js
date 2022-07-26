import {makeVar} from '@apollo/client';

// false otherwise
export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));

// Initializes to an empty array
export const user = makeVar({});