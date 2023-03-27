import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"

export const useSettingsStore = defineStore("settings", () => {
    const displayMode = ref(useLocalStorage('displayMode', displayModes.isFull));
    const showRamadanDashboard = ref(useLocalStorage('showRamadanDashboard', false));
    const showSalateTimes = ref(useLocalStorage('showSalateTimes', false));
    const showSettings = ref(useLocalStorage('showSettings', false));
    
    const switchDisplayMode = () => displayMode.value = !displayMode.value;
    const switchVisibilityRamadanDashboard = () => showRamadanDashboard.value = !showRamadanDashboard.value;
    const switchVisibilitySalateTimes = () => showSalateTimes.value = !showSalateTimes.value;
    const switchVisibilitySettings = () => showSettings.value = !showSettings.value;
    
    return { 
        displayMode, switchDisplayMode,
        showRamadanDashboard, switchVisibilityRamadanDashboard,
        showSalateTimes, switchVisibilitySalateTimes,
        showSettings, switchVisibilitySettings,
    };
});