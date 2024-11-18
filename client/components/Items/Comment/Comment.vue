<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["comment"]);
const emit = defineEmits(["refreshComments", "setEditing"]);

const { currentUsername } = storeToRefs(useUserStore());

const isLinked = ref(false);

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

const getLink = async () => {
  try {
    isLinked.value = await fetchy(`/api/links/exists`, "GET", { query: { itemId: props.comment._id } });
  } catch {
    return;
  }
};

onBeforeMount(getLink);
</script>

<template>
  <div>
    <p :class="{ 'self-author': props.comment.author == currentUsername }">
      {{ props.comment.author ? props.comment.author : "Anonymous" }}{{ props.comment.author == currentUsername && !isLinked ? " (Anonymous)" : "" }}
    </p>
    <div class="base">
      <menu v-if="props.comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="editComment">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
      </menu>
    </div>
  </div>
</template>

<style scoped>
.self-author {
  color: var(--gray);
}
</style>
