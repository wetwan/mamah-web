/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

// export const UseAuth = create({ set } => ({
//     user: null,
//     token: null,


//     setUser: (user) => set({ user })

// }))


export const UseAuth = create((set) => ({
    user: null,
    token: null,

    setUser: (user: any) => set({ user }),
    setToken: (token: any) => set({ token })
}))