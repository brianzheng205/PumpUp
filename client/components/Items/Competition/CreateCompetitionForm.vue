<script setup lang="ts">
import router from "@/router";
import { fetchy } from "@/utils/fetchy";
import CompetitionForm from "./CompetitionForm.vue";

const createCompetition = async (name: string, endDate: Date, isLinked: boolean) => {
  try {
    await fetchy("/api/competitions", "POST", {
      body: { isLinked: isLinked ? "true" : "false", name, endDate: endDate.toString() },
    });
  } catch (_) {
    return;
  }
  void router.push({ name: "Competitions" });
};
</script>

<template>
  <CompetitionForm :initialInfo="{ name: '', endDate: null, isLinked: null }" :isEditing="false" @onSave="createCompetition" />
</template>
