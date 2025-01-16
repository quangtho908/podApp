import { create } from "zustand"

type State = {
  file: string
}

type Action = {
  setFile: (visible: string) => void
}

const useChooseImage = create<State & Action>(set => ({
  file: "",
  setFile: (newState: string) => set(() => ({file: newState})),
}))

export default useChooseImage;