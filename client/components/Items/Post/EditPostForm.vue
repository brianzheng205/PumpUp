<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import EditContentForm from "../EditContentForm.vue";

const props = defineProps(["post"]);
const emit = defineEmits(["setEditing", "refreshPosts"]);

const editPost = async (content: string) => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "PATCH", { body: { content: content } });
  } catch (e) {
    return;
  }
  emit("setEditing");
  emit("refreshPosts");
};

const setEditing = () => {
  emit("setEditing");
};
</script>

<template>
  <EditContentForm :contentContainer="post" @editContainer="editPost" @setEditing="setEditing" />
</template>
