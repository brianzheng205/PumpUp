<script setup lang="ts">
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import { computed, ref } from "vue";
import LinkAtCreation from "../../Link/LinkAtCreation.vue";

const name = ref("");
const endDate = ref<Date | null>(null);
const isLinked = ref<boolean | null>(null);

const canCreate = computed(() => name.value.trim() !== "" && endDate.value !== null && isLinked.value !== null);

const createCompetition = async () => {
  if (endDate.value === null) return;
  try {
    console.log(name.value);
    console.log(endDate.value);
    console.log(isLinked.value ? "true" : "false");
    await fetchy("/api/competitions", "POST", {
      body: { isLinked: isLinked.value ? "true" : "false", name: name.value, endDate: endDate.value.toString() },
    });
  } catch (_) {
    return;
  }
  void router.push({ name: "Competitions" });
};

const setIsLinked = (value: boolean) => {
  isLinked.value = value;
};
</script>

<template>
  <form class="create-form" @submit.prevent="canCreate && createCompetition()">
    <h2>Competition</h2>
    <label for="content">Name:</label>
    <input type="text" id="content" v-model="name" placeholder="Name" required />
    <label for="endDate">End Date:</label>
    <input type="date" id="endDate" v-model="endDate" required />
    <LinkAtCreation @setIsLinked="setIsLinked" />
    <button type="submit" class="pure-button-primary pure-button" :disabled="!canCreate">Create Competition</button>
  </form>
</template>
