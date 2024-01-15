<template>
  <div class="relative h-full w-full">
    <yandex-map
      v-model="map"
      class="h-full w-full"
      :settings="mapSettings"
    >
      <yandex-map-default-features-layer />
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-zoom-control />
      </yandex-map-controls>
      <yandex-map-default-scheme-layer />
      <yandex-map-listener :settings="{ onActionStart, onActionEnd }" />
    </yandex-map>

    <div class="radial absolute left-1/2 top-1/2 h-4 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"></div>

    <img
      alt=""
      :src="'/map-marker.png'"
      draggable="false"
      class="absolute left-1/2 top-1/2 -ml-5 -mt-12 h-12 w-10 cursor-pointer transition-all"
      :class="{
        '-translate-y-2': isDragging,
      }"
      @click="map?.setLocation({ center: coordinates, zoom: 17, duration: 400 })"
    />
  </div>
</template>

<script setup lang="ts">
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapZoomControl,
  YandexMapListener,
} from 'vue-yandex-maps'
import type { LngLat, YMap } from '@yandex/ymaps3-types'
import type { YandexMapSettings } from 'vue-yandex-maps'
import type { MyCoords } from '~/interfaces/common'

const props = withDefaults(
  defineProps<{
    coordinates?: LngLat
  }>(),
  {
    coordinates: () => [37.617698, 55.755864],
  }
)
const { coordinates } = toRefs(props)

const emit = defineEmits<{
  (e: 'updateCoordsDrag', coords: MyCoords): void
}>()

const map = shallowRef<YMap | null>(null)

const isDragging = ref(false)
const onActionStart = (action: any) => {
  if (action.type === 'drag') {
    isDragging.value = true
  }
}
const onActionEnd = (action: any) => {
  if (action.type === 'drag') {
    emit('updateCoordsDrag', {
      Lng: action.location.center[0],
      Lat: action.location.center[1],
    })
    isDragging.value = false
  }
}

const mapSettings = reactive<YandexMapSettings>({
  location: {
    center: [37.617698, 55.755864],
    zoom: 17,
    duration: 700,
  },
})

watchEffect(() => {
  const location = mapSettings.location as any
  location.center = coordinates.value
})
</script>

<style>
.radial {
  background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, transparent 100%);
}
</style>
