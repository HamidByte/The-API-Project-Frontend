<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="customClass"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
</template>

<script>
export default {
  name: 'MenuIcon',
  props: {
    customClass: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    strokeWidth: {
      type: [Number, String],
      default: 2
    }
  }
}
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
