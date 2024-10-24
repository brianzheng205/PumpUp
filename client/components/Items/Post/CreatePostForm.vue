<script setup lang="ts">
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";
import LinkAtCreation from "../../Link/LinkAtCreation.vue";

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
  void router.push({ name: "Home" });
};

const setIsLinked = (value: boolean) => {
  isLinked.value = value;
};
</script>

<template>
  <form class="create-form" @submit.prevent="content.trim() !== '' && isLinked !== null && createPost(content, isLinked)">
    <h2>Post</h2>
    <LinkAtCreation @setIsLinked="setIsLinked" />
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button" :disabled="content.trim() === '' || isLinked === null">Create Post</button>
  </form>
</template>
