<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";
import LinkAtCreation from "../../Link/LinkAtCreation.vue";

const emit = defineEmits(["refreshPosts"]);

const isLinked = ref<boolean | null>(null);
const content = ref("");

const createPost = async (content: string, isLinked: boolean) => {
  try {
    await fetchy("/api/posts", "POST", {
      body: { content, isLinked: isLinked.toString() },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
  isLinked.value = null;
};

const setIsLinked = (value: boolean) => {
  isLinked.value = value;
};
</script>

<template>
  <LinkAtCreation @setIsLinked="setIsLinked" />
  <form @submit.prevent="content.trim() !== '' && isLinked !== null && createPost(content, isLinked)">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button" :disabled="content.trim() === '' || isLinked === null">Create Post</button>
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
