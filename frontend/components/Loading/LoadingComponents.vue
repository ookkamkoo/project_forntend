<template>
    <div>
      <div class="loading" v-if="spinning">
        <div class="spin">
          <a-spin :indicator="indicator" size="large"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Loading',
    setup() {
      const spinning = ref(false);
  
      const startLoading = () => {
        spinning.value = true;
        setTimeout(() => {
          spinning.value = false;
        }, 2000);
      };

      onMounted(startLoading);
  
      return {
        spinning,
        startLoading,
      };
    }
  };
  </script>
  
  <style>
  .loading {
    margin-top: 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  </style>