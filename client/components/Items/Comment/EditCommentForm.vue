<!-- TODO: convert this and EditPostForm into a single component -->
<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import EditContentForm from "../EditContentForm.vue";

const props = defineProps(["comment"]);
const emit = defineEmits(["refreshComments", "setEditing"]);

const editComment = async (content: string) => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "PATCH", { body: { content: content } });
  } catch (e) {
    return;
  }
  emit("setEditing");
  emit("refreshComments");
};

const setEditing = () => {
  emit("setEditing");
};
</script>

<template>
  <EditContentForm :contentContainer="comment" @editContainer="editComment" @setEditing="setEditing" />
</template>
