<script setup lang="ts">
import { ref } from "vue";
import SearchItemForm from "../SearchItemForm.vue";
import Comment from "./Comment.vue";
import EditCommentForm from "./EditCommentForm.vue";

const props = defineProps<{
  comments: Array<Record<string, string>>;
  editing: string;
  legendText?: string;
}>();
const emit = defineEmits<{
  (e: "refreshComments", author?: string): void;
  (e: "setEditing", id: string): void;
}>();

const loading = ref(false); // TODO: implement
const searchAuthor = ref("");

const refreshComments = async () => {
  emit("refreshComments");
};

const setEditing = (id: string) => {
  emit("setEditing", id);
};
</script>

<template>
  <div>
    <div v-if="props.legendText" class="row">
      <h2 v-if="!searchAuthor">Comments:</h2>
      <h2 v-else>Comments by {{ searchAuthor }}:</h2>
      <SearchItemForm :legendText="props.legendText" />
    </div>
    <section v-if="!loading && props.comments.length !== 0">
      <article v-for="comment in props.comments" :key="comment._id">
        <Comment v-if="props.editing !== comment._id" :comment="comment" @refreshComments="emit('refreshComments')" @setEditing="emit('setEditing', $event)" />
        <EditCommentForm v-else :comment="comment" @refreshComments="refreshComments" @setEditing="setEditing" />
      </article>
    </section>
    <p v-else-if="!loading">No comments found</p>
    <p v-else>Loading...</p>
  </div>
</template>
