<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import ToggleLink from "../../Link/ToggleLink.vue";

const props = defineProps(["comment"]);
const emit = defineEmits(["refreshComments", "setEditing"]);

const { currentUsername } = storeToRefs(useUserStore());

const link = ref<Record<string, string> | null>(null);

const deleteComment = async () => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "DELETE");
    emit("refreshComments", props.comment._id);
  } catch (_) {
    return;
  }
};

const editComment = async () => {
  emit("setEditing", props.comment._id);
};

const getCommentLink = async () => {
  try {
    link.value = await fetchy(`/api/links`, "GET", { query: { itemId: props.comment._id } });
  } catch {
    return;
  }
};

const createCommentLink = async () => {
  try {
    link.value = await fetchy(`/api/links/comments`, "POST", { body: { commentId: props.comment._id } });
  } catch {
    return;
  }
};

const deleteCommentLink = async () => {
  if (link.value === null) return;

  try {
    await fetchy(`/api/links/comments/${link.value._id}`, "DELETE");
    link.value = null;
  } catch {
    return;
  }
};

onBeforeMount(async () => {
  await getCommentLink();
});
</script>

<template>
  <article>
    <p class="author">{{ props.comment.author }}</p>
    <p>{{ props.comment.content }}</p>
    <div class="base">
      <menu v-if="props.comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="editComment">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
        <li><ToggleLink :linkExists="link !== null" @createLink="createCommentLink" @deleteLink="deleteCommentLink" /></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
      </article>
    </div>
  </article>
</template>
