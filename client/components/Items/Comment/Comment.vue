<!-- <script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const props = defineProps(["comment"]);
const emit = defineEmits(["editComment", "refreshComments", "commentComment"]);

const { currentUsername } = storeToRefs(useUserStore());

const commentComments = ref<Array<Record<string, string>>>([]);
const showComments = ref(false);

const commentComment = () => {
  emit("commentComment", props.comment._id);
};

const getCommentComments = async () => {
  showComments.value = !showComments.value;
  if (showComments.value) {
    const res = await fetchy(`/api/items/${props.comment._id}/comments`, "GET");
    commentComments.value = res;
  }
};

const deleteComment = async () => {
  try {
    await fetchy(`/api/items/${props.comment._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshComments");
};
</script>

<template>
  <article>
    <p class="author">{{ comment.author }}</p>
    <p>{{ comment.content }}</p>
    <div class="base">
      <menu v-if="comment.author == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editComment', comment._id)">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
      </menu>
      <article class="timestamp">
        <p v-if="comment.dateCreated !== comment.dateUpdated">Edited on: {{ formatDate(comment.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(comment.dateCreated) }}</p>
      </article>
      <button class="btn-small pure-button" @click="commentComment">Comment</button>
      <button class="btn-small pure-button" @click="getCommentComments">Get Comments</button>
    </div>
    <div v-if="showComments && commentComments.length > 0">
      <h3>Comments:</h3>
      <article v-for="comment in commentComments" :key="comment._id">
        <Comment :comment="comment" @editComment="emit('editComment', comment._id)" @refreshComments="emit('refreshComments')" @commentComment="commentComment(comment._id)" />
      </article>
    </div>
  </article>
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}

.timestamp {
  margin-left: auto;
}
</style> -->
