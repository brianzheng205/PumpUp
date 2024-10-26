<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";
import LinkAtCreation from "../../Link/LinkAtCreation.vue";

const props = defineProps({
  itemId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["refreshComments", "setEditing"]);

const isLinked = ref<boolean | null>(null);
const content = ref("");

const createComment = async (content: string, isLinked: boolean) => {
  try {
    await fetchy(`/api/items/${props.itemId}/comments`, "POST", {
      body: { content, isLinked: isLinked.toString() },
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

const setIsLinked = (value: boolean) => {
  isLinked.value = value;
};
</script>

<template>
  <form @submit.prevent="isLinked !== null && content.trim() !== '' && createComment(content, isLinked)">
    <label for="content">Comment Contents:</label>
    <LinkAtCreation :isLinked="null" @setIsLinked="setIsLinked" />
    <textarea id="content" v-model="content" placeholder="Create a comment!" required></textarea>
    <menu>
      <li><button class="pure-button-primary pure-button" type="submit" :disabled="content.trim() === '' || isLinked === null">Create Comment</button></li>
      <li><button class="pure-button" @click.prevent="emit('setEditing')">Cancel</button></li>
    </menu>
  </form>
</template>
