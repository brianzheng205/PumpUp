<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import CommentForm from "./CommentForm.vue";

const props = defineProps<{
  comment: Record<string, string>;
}>();
const emit = defineEmits<{
  (e: "refreshComments", author?: string): void;
  (e: "setEditing", id: string): void;
}>();

const initialContent = ref(props.comment.content);
const initialIsLinked = ref<boolean | null>(null);

const editComment = async (content: string, isLinked: boolean) => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "PATCH", { body: { content, isLinked: isLinked.toString() } });
    emit("setEditing", "");
    emit("refreshComments");
  } catch (_) {
    return;
  }
};

const getLink = async () => {
  try {
    initialIsLinked.value = await fetchy("/api/links/exists", "GET", { query: { itemId: props.comment._id } });
  } catch (_) {
    return;
  }
};

onBeforeMount(getLink);
</script>

<template>
  <CommentForm :initialInfo="{ content: initialContent, isLinked: initialIsLinked }" :isEditing="true" @onSave="editComment" @onCancel="emit('setEditing', '')" />
</template>
