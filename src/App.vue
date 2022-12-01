<template>
  <div class="parent">
    <HeaderPage title="Chanty" />
    <ProfilePage v-if="$store.getters.isProfileOpen" />
    <NewChat v-if="$store.getters.isCreateChatModalOpen" />
    <router-view class="views"></router-view> 
  </div>
  
  


  
</template>

<script>
import HeaderPage from "./components/HeaderPage.vue";
import ProfilePage from "./components/ProfilePage.vue";
import NewChat from "./components/NewChat.vue";

export default {
  name: "App",
  components:{
    HeaderPage,ProfilePage,
    NewChat,
  },
  
};
</script>

<style >
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Nunito", sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}
.parent {
  overflow: hidden;
}
*::-webkit-scrollbar {
  width: 2px;
}
*::-webkit-scrollbar-track {
  background: #0014256b;
}
*::-webkit-scrollbar-thumb {
  background: #5b81c0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background: #001425;
  min-height: 100vh;
  overflow-y: hidden;
}
nav {
  width: 100vw;
  height: 80px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #001425;
}
.views {
  margin-top: 80px;
}
</style>
