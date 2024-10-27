<script setup lang="ts">
import { ref, watch } from "vue";
import LinkAtCreation from "../../Link/LinkAtCreation.vue";

const props = defineProps<{
  initialInfo: {
    content: string;
    isLinked: boolean | null;
  };
  isEditing: boolean;
}>();
const emit = defineEmits<{
  (e: "onSave", content: string, isLinked: boolean): void;
  (e: "onCancel"): void;
}>();

const content = ref(props.initialInfo.content);
const isLinked = ref<boolean | null>(props.initialInfo.isLinked);

const setIsLinked = (value: boolean) => {
  isLinked.value = value;
};

watch(
  () => props.initialInfo.isLinked,
  (newValue) => {
    isLinked.value = newValue;
    console.log("update", newValue);
  },
);
</script>

<template>
  <form class="create-form" @submit.prevent="isLinked !== null && emit('onSave', content, isLinked)">
    <h2>Post</h2>
    <LinkAtCreation :isLinked="isLinked" @setIsLinked="setIsLinked" />
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button" :disabled="content.trim() === '' || isLinked === null">{{ props.isEditing ? "Update Post" : "Create Post" }}</button>
    <button v-if="props.isEditing" class="pure-button" @click.prevent="emit('onCancel')">Cancel</button>
  </form>
</template>
