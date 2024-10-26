<script setup lang="ts">
import { useEditStore } from "@/stores/editing";
import { computed, ref, watch } from "vue";
import LinkAtCreation from "../../Link/LinkAtCreation.vue";

const props = defineProps<{
  initialInfo: {
    name: string;
    endDate: Date | null;
    isLinked: boolean | null;
  };
  isEditing: boolean;
}>();
const emit = defineEmits<{
  (e: "onSave", name: string, endDate: Date, isLinked: boolean): void;
}>();

const editStore = useEditStore();

const name = ref(props.initialInfo.name);
const endDate = ref<Date | null>(props.initialInfo.endDate);
const isLinked = ref<boolean | null>(props.initialInfo.isLinked);

const formattedEndDate = computed({
  get: () => (endDate.value ? endDate.value.toISOString().slice(0, 10) : ""),
  set: (value: string) => {
    endDate.value = value ? new Date(value) : null;
  },
});

const canCreate = computed(() => name.value.trim() !== "" && endDate.value !== null && isLinked.value !== null);

watch(
  () => props.initialInfo.isLinked,
  (newValue) => (isLinked.value = newValue),
);

const setIsLinked = (value: boolean) => {
  isLinked.value = value;
};

const onCancel = () => {
  editStore.resetEditing();
};
</script>

<template>
  <form class="create-form" @submit.prevent="endDate !== null && isLinked !== null && emit('onSave', name, endDate, isLinked)">
    <h2>Competition</h2>
    <label for="content">Name:</label>
    <input type="text" id="content" v-model="name" placeholder="Name" required />
    <label for="endDate">End Date:</label>
    <input type="date" id="endDate" v-model="formattedEndDate" required />
    <LinkAtCreation :isLinked="isLinked" @setIsLinked="setIsLinked" />
    <button type="submit" class="pure-button-primary pure-button" :disabled="!canCreate">{{ props.isEditing ? "Save" : "Create Competition" }}</button>
    <button v-if="props.isEditing" class="pure-button" @click="onCancel">Cancel</button>
  </form>
</template>
