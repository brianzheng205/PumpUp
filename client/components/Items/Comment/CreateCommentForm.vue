<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const props = defineProps(["itemId"]);

const content = ref("");
const emit = defineEmits(["refreshComments"]);

// TODO: add isLinked to body
const createComment = async (content: string) => {
  try {
    await fetchy(`/api/items/${props.itemId}/comments`, "POST", { body: { content } });
  } catch {
    return;
  }
  emit("refreshComments");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createComment(content)">
    <label for="content">Comment Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a comment!" required></textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Comment</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
