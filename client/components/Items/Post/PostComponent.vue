<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts", "commentPost"]);
const { currentUsername } = storeToRefs(useUserStore());

const comments = ref<Array<Record<string, string>>>([]);

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};

const getComments = async () => {
  try {
    const res = await fetchy(`/api/items/${props.post._id}/comments`, "GET");
    comments.value = res;
  } catch {
    return;
  }
};

const commentPost = () => {
  emit("commentPost", props.post._id);
};

const commentComment = (commentId: string) => {
  emit("commentPost", props.post._id, commentId);
};

onBeforeMount(async () => {
  await getComments();
});
</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <p>{{ props.post.content }}</p>
  <div class="base">
    <menu v-if="props.post.author == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editPost', props.post._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </article>
    <button class="btn-small pure-button" @click="commentPost">Comment</button>
  </div>
  <div v-if="comments.length > 0">
    <h3>Comments:</h3>
    <article v-for="comment in comments" :key="comment._id">
      <PostComponent :post="comment" @editPost="emit('editPost', comment._id)" @refreshPosts="emit('refreshPosts')" @commentPost="commentComment(comment._id)" />
    </article>
  </div>
</template>

<style scoped>
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

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
