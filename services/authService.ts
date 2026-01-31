import { UserProfile } from '../types';

// NOTE: In a real app, you would import firebase/auth here.
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Simulating network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email: string, password: string): Promise<UserProfile> => {
  await delay(800); // Fake latency
  
  if (email === 'fail@test.com') {
    throw new Error("Invalid email or password.");
  }

  // Return a mock user
  return {
    uid: 'user_12345',
    email: email,
    displayName: 'Alex Doe',
    photoURL: 'https://picsum.photos/200'
  };
};

export const registerUser = async (email: string, password: string): Promise<UserProfile> => {
  await delay(1000);
  return {
    uid: 'user_new_67890',
    email: email,
    displayName: 'New User',
  };
};

export const logoutUser = async (): Promise<void> => {
  await delay(500);
  return;
};
