<template>
  <div v-auto-animate="{ duration: 400 }" class="gap-0">
    <TheDay v-if="data" :key="selectedCityId" :data="data" @parent-refreshtheday="refreshTheDay"
            :selectedCityId="selectedCityId" :class="!showPanel || isTooSmall ? '' : 'hidden xl:flex'"
            class=" lg:m-10"/>
    <div class="w-full 2xl:w-7/12 h-screen lg:h-5/6 flex flex-col items-center rounded-lg shadow-lg bg-white lg:m-10"
         v-if="data && showPanel && !isTooSmall">
      <SalateTimes class="flex w-full h-5/6" v-if="showSalateTimes"/>
      <Settings class="flex w-full h-5/6" v-if="showSettings"/>
      <SectionsNav class="mt-10"/>
    </div>

    <button @click="settingsStore.switchDisplayMode()" :class="isTooSmall ? 'hidden' : null"
            class="fixed bottom-10 right-8 bg-gray-50 w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center hover:drop-shadow-xl">
      <IconLayoutCards color="gray"/>
    </button>
    <SpinnerLoader class="flex justify-center h-screen items-center" v-if="!data && netStatus"/>
    <ExclamationIcon class="flex justify-center h-screen items-center" v-if="!netStatus && !data"/>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useFetch} from "nuxt/app";
import {useCityStore} from "~/stores/city"
import {useSettingsStore} from "~/stores/settings"
import {IconLayoutCards} from '@tabler/icons-vue';
import {vAutoAnimate} from '@formkit/auto-animate'
import {useNetStatusStore} from '@/stores/netStatus';

const store = useCityStore();
const data = ref(null);
const error = ref(null);
const isFetching = ref(null);
const selectedCityId = ref(store.cityId);
const settingsStore = useSettingsStore();
const windowWidth = ref(window?.innerWidth)
const netStatusStore = useNetStatusStore();

onMounted(() => {
  fetchData(selectedCityId.value)
  window.addEventListener('resize', onResize)
})

async function fetchData(cityId) {
  try {
    const response = await useFetch(`/api/hikams/${cityId}`);
    ({
      data: data.value,
      error: error.value,
      isFetching: isFetching.value,
    } = await response);
    selectedCityId.value = cityId;

  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

const onResize = () => windowWidth.value = window.innerWidth
const isTooSmall = computed(() => windowWidth.value <= 500)

const refreshTheDay = async (cityId) => {
  await fetchData(cityId ? cityId : selectedCityId.value);
};

const showPanel = computed(() => settingsStore.displayMode)
const showSalateTimes = computed(() => settingsStore.showSalateTimes)
const showSettings = computed(() => settingsStore.showSettings)
const netStatus = computed(() => netStatusStore.status)
</script>
