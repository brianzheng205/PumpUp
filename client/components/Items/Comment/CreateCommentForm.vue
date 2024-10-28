<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import CommentForm from "./CommentForm.vue";

const props = defineProps<{
  postId: string;
}>();
const emit = defineEmits<{
  (e: "refreshComments", author?: string): void;
  (e: "setEditing", id: string): void;
}>();

const createComment = async (content: string, isLinked: boolean) => {
  try {
    await fetchy(`/api/items/${props.postId}/comments`, "POST", {
      body: { content, isLinked: isLinked.toString() },
    });
  } catch (_) {
    return;
  }
  emit("refreshComments");
  emit("setEditing", "");
};

const onCancel = () => {
  emit("setEditing", "");
};
</script>

<template>
  <CommentForm :initialInfo="{ content: '', isLinked: null }" :isEditing="false" @onSave="createComment" @onCancel="onCancel" />
</template>
