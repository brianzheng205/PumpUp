<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";

const props = defineProps(["comment"]);
const emit = defineEmits(["refreshComments", "setEditing"]);

const { currentUsername } = storeToRefs(useUserStore());

const deleteComment = async () => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "DELETE");
    emit("refreshComments", props.comment._id);
  } catch (_) {
    return;
  }
};

const editComment = async () => {
  console.log(props.comment._id);
  emit("setEditing", props.comment._id);
};
</script>

<template>
  <article>
    <p class="author">{{ props.comment.author }}</p>
    <p>{{ props.comment.content }}</p>
    <div class="base">
      <menu v-if="props.comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="editComment">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
      </article>
      <!-- <button class="btn-small pure-button">Comment</button> -->
    </div>
  </article>
</template>
