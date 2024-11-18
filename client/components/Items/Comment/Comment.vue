<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
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
  emit("setEditing", props.comment._id);
};
</script>

<template>
  <div>
    <p class="author">
      <strong>{{ props.comment.author ? props.comment.author : "Anonymous" }} -</strong> {{ props.comment.content }}
    </p>
    <div class="base">
      <menu v-if="props.comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="editComment">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
      </menu>
    </div>
  </div>
</template>

<style scoped></style>
