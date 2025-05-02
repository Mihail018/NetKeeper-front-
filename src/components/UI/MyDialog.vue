<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
      <div @click.stop class="dialog-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'my-dialog',
    props: {
      show: {
        type: Boolean,
        required: false
      }
    },

    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
  }
  </script>
  
  <style scoped>
  .dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

  .dialog-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
  </style>
  