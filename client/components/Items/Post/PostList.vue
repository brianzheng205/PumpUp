<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import EditContentForm from "../EditContentForm.vue";
import SearchItemForm from "../SearchItemForm.vue";
import Post from "./Post.vue";

const loaded = ref(false);
const posts = ref<Array<Record<string, string>>>([]);
const editing = ref("");
const searchAuthor = ref("");

async function getPosts(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let postResults;
  try {
    postResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  posts.value = postResults;
}

function setEditing(id: string) {
  editing.value = id;
}

const editPost = async (postId: string, content: string) => {
  try {
    await fetchy(`/api/posts/${postId}`, "PATCH", { body: { content } });
  } catch (e) {
    return;
  }
  editing.value = "";
  await getPosts();
};

onBeforeMount(async () => {
  await getPosts();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2 v-if="!searchAuthor">Posts:</h2>
    <h2 v-else>Posts by {{ searchAuthor }}:</h2>
    <SearchItemForm legendText="Search By Author" @getItemsByUser="getPosts" />
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0">
    <article v-for="post in posts" :key="post._id">
      <Post v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="setEditing" />
      <EditContentForm v-else :contentContainer="post" @editContainer="(content: string) => editPost(post._id, content)" @setEditing="setEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  max-width: 60em;
}
</style>
