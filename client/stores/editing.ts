import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditStore = defineStore(
  "editing",
  () => {
    const editingId = ref("");

    const setEditing = (id: string) => {
      editingId.value = id;
    };

    const resetEditing = () => {
      editingId.value = "";
    };

    return {
      editingId,
      setEditing,
      resetEditing,
    };
  },
  { persist: true },
);
