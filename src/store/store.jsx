import { create } from "zustand";

 const useStore = create((set) =>({

    slideMenu:false,
 
    setSlideMenu: () => set({slideMenu:true}),
    removeSlideMenu: () => set({slideMenu:false}),

}))

export default useStore;