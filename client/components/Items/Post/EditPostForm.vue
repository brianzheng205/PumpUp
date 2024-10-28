<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import PostForm from "./PostForm.vue";

const props = defineProps<{
  post: Record<string, string>;
}>();
const emit = defineEmits<{
  (e: "refreshPosts", author?: string): void;
  (e: "setEditing", id: string): void;
}>();

const initialContent = ref(props.post.content);
const initialIsLinked = ref<boolean | null>(null);

const editPost = async (content: string, isLinked: boolean) => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "PATCH", { body: { content, isLinked: isLinked.toString() } });
    emit("setEditing", "");
    emit("refreshPosts");
  } catch (_) {
    return;
  }
};

const getLink = async () => {
  try {
    initialIsLinked.value = await fetchy("/api/links/exists", "GET", { query: { itemId: props.post._id } });
  } catch (_) {
    return;
  }
};

onBeforeMount(getLink);
</script>

<template>
  <PostForm :initialInfo="{ content: initialContent, isLinked: initialIsLinked }" :isEditing="true" @onSave="editPost" @onCancel="emit('setEditing', '')" />
</template>
