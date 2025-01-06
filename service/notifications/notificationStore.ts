import _ from "lodash"
import { create } from "zustand"

export type Notification = {
  id: string,
  title: string,
  body: string,
  createdAt: Date,
  type: string
}

type State = {
  notifications: Notification[],
  newNoti: number,
  unRead: boolean
}

type Action = {
  put: (noti: Notification) => void
  clear: () => void,
  setUnRead: (state: boolean) => void
}

const notiService = create<State & Action>(set => ({
  notifications: [],
  unRead: false,
  newNoti: 0,
  put: (noti: Notification) => set(state => {
    if(!_.some(state.notifications, {id: noti.id})){
      state.notifications.push(noti)
      return {notifications: state.notifications, unRead: true, new: ++state.newNoti}
    }
    return {}
  }),
  clear: () => set({notifications: [], unRead: false}),
  setUnRead: (state: boolean) => set({unRead: state, newNoti: 0})
}))

export default notiService;