<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";
import EditContentForm from "../EditContentForm.vue";
import SearchItemForm from "../SearchItemForm.vue";
import Comment from "./Comment.vue";

const props = defineProps({
  comments: {
    type: Array<Record<string, string>>,
    required: true,
  },
  editing: {
    type: String,
    required: true,
  },
  legendText: {
    type: String,
  },
});
const emit = defineEmits(["setEditing", "refreshComments"]);

// TODO: implement commenting on comments
// const commentsOfComments = reactive(new Map(props.comments.map((comment) => [comment._id, [] as Array<Record<string, string>>])));
const loading = ref(false); // TODO: implement
const searchAuthor = ref("");

// const getCommentsOfComment = async (commentId: string, author?: string) => {
//   const query: Record<string, string> = author !== undefined ? { author } : {};
//   try {
//     const res = await fetchy(`/api/items/${commentId}/comments`, "GET", { query });
//     commentsOfComments.set(commentId, res);
//   } catch {
//     return;
//   }
// };

const editComment = async (id: string, content: string) => {
  try {
    await fetchy(`/api/comments/${id}`, "PATCH", { body: { content } });
    emit("refreshComments");
  } catch {
    return;
  }
  emit("setEditing");
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
        <EditContentForm v-else :contentContainer="comment" @editContainer="(content: string) => editComment(comment._id, content)" @setEditing="setEditing" />
      </article>
    </section>
    <p v-else-if="!loading">No comments found</p>
    <p v-else>Loading...</p>
  </div>
</template>
