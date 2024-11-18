<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDateTime } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import CommentList from "../Comment/CommentList.vue";
import CreateCommentForm from "../Comment/CreateCommentForm.vue";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);

const { currentUsername } = storeToRefs(useUserStore());

const isLinked = ref(false);
const comments = ref<Array<Record<string, string>>>([]);
const editing = ref("");

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};

const getPostComments = async (author?: string) => {
  const query: Record<string, string> = author !== undefined ? { author } : {};
  try {
    comments.value = await fetchy(`/api/items/${props.post._id}/comments`, "GET", { query });
  } catch {
    return;
  }
};

const getLink = async () => {
  try {
    isLinked.value = await fetchy(`/api/links/exists`, "GET", { query: { itemId: props.post._id } });
  } catch {
    return;
  }
};

const setEditing = (itemId: string) => {
  editing.value = itemId;
};

onBeforeMount(async () => {
  await getPostComments();
  await getLink();
});
</script>

<template>
  <p class="author" :class="{ 'self-author': props.post.author == currentUsername }">
    {{ props.post.author ? props.post.author : "Anonymous" }}{{ props.post.author == currentUsername && !isLinked ? " (Anonymous)" : "" }}
  </p>
  <p>{{ props.post.content }}</p>
  <div class="base">
    <menu v-if="props.post.author == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editPost', props.post._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
    </menu>
    <div class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDateTime(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDateTime(props.post.dateCreated) }}</p>
    </div>
    <button v-if="editing !== props.post._id" class="btn-small pure-button" @click="setEditing(props.post._id)">Comment</button>
    <CreateCommentForm v-else :postId="props.post._id" @refreshComments="getPostComments" @setEditing="setEditing" />
  </div>
  <CommentList :comments="comments" :editing="editing" legendText="Search By Author" @refreshComments="getPostComments" @setEditing="setEditing" />
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

.self-author {
  color: var(--gray);
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
