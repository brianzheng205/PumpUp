import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditStore = defineStore(
  "editing",
  () => {
    const editingId = ref("");

    const setEditing = (id: string) => {
      setTimeout(() => (editingId.value = id), 200);
    };

    const resetEditing = () => {
      setTimeout(() => (editingId.value = ""), 200);
    };

    return {
      editingId,
      setEditing,
      resetEditing,
    };
  },
  { persist: true },
);
