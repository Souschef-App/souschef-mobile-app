import {create, StateCreator} from 'zustand';
import {UserSlice, createUserSlice} from './slices/userSlice';

export type StoreState = UserSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
}));

export default useStore;
