<template>
    <div 
    :class="[
                'chatHead',
                { active: $store.getters.selectedChat?._id === chat._id },
                ]"
    >
    <h3 class="chatName">
        {{ 
            !chat.isGroupChat 
            ? getSender($store.getters.user, chat.users) 
            : chat.chatName 
        }}
    </h3>

    <h6>
        {{ chat.latestMessage?.content }}
    </h6>


    </div>
</template>
<script>
export default {
    props: {
        chat: {
            type: Object,
        },
    },
    methods: {
        getSender(loggedIn, users) {
            return users[0]._id === loggedIn._id ? users[1].name : users[0].name;
        },
    },

};
</script>
<style scoped>
.chatHead {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid #53644f;
    cursor: pointer;
    margin-bottom: 5px;
    border-radius: 10px;
    transition: 300ms;
  }
  .chatHead:hover,
  .active {
    background: #0014256b;
    transition: 300ms;
  }
  
    
</style>