import {ref} from "vue";
import {defineStore} from "pinia";

export const useNetStatusStore = defineStore("netStatus", () => {
  const status = ref(true);

  function update(newStatus: boolean) {
    status.value = newStatus;
  }

  return {status, update};
});
