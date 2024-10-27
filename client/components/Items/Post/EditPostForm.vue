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
    console.log({ content, isLinked: isLinked.toString() });
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

<!-- <style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style> -->
