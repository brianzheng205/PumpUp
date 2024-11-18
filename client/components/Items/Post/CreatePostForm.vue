<script setup lang="ts">
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import PostForm from "./PostForm.vue";

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
</script>

<template>
  <PostForm :initialInfo="{ content: '', isLinked: null }" :isEditing="false" @onSave="createPost" @onCancel="() => {}" />
</template>
