<!-- TODO: convert this and EditPostForm into a single component -->
<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { ref } from "vue";

const props = defineProps(["comment"]);
const content = ref(props.comment.content);
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
</script>

<template>
  <form @submit.prevent="editComment(content)">
    <p class="author">{{ props.comment.author }}</p>
    <textarea id="content" v-model="content" placeholder="Create a comment!" required> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('setEditing')">Cancel</button></li>
      </menu>
      <p v-if="props.comment.dateCreated !== props.comment.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.comment.dateCreated) }}</p>
    </div>
  </form>
</template>
