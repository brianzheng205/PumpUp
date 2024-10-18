<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const props = defineProps({
  itemId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["refreshComments", "setEditing"]);

const content = ref("");

// TODO: add isLinked to body
const createComment = async (content: string) => {
  try {
    await fetchy(`/api/items/${props.itemId}/comments`, "POST", {
      body: { content },
    });
  } catch (_) {
    return;
  }
  emit("refreshComments");
  emit("setEditing");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createComment(content)">
    <label for="content">Comment Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a comment!" required></textarea>
    <menu>
      <li><button class="pure-button-primary pure-button" type="submit">Create Comment</button></li>
      <li><button class="pure-button" @click.prevent="emit('setEditing')">Cancel</button></li>
    </menu>
  </form>
</template>
