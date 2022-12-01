<template>
    <div class="chat-container">
        <div v-if="!$store.getters.isMobile" class="card chats">
            <div class="searchHeader">
                
                    <div class="searchbar">
                        <UilSearch 
                        :style="{
                        fontSize: '18px',
                        color: '#ffffff',
                        }"
                        />
                        <input 
                        type="text"
                        placeholder="Search Chats"
                        v-on:input="search" 
                        v-on:keyup.enter="search" 
                        v-model.trim="searchText" 
                        />
                    </div>
                    <UilPlus 
                        @click="
                        () => {
                        $store.commit('TOGGLE_CREATECHATMODAL');
                    }
                    " 
                        :style="{
                            fontSize: '2.7rem',
                            color: '#ffffff',
                            background: '#001425',
                            cursor: 'pointer',
                            padding: '7px',
                            borderRadius: '50%',
                        }"
                    />    
                </div>
                <div v-show="allChats.length === 0" class="noChats">
                    <h3>Find People and Connect with them!</h3>
                    <Lottie 
                    :options="{ animationData: chatJson }"
                            :height="300"
                            :width="300"
                    />
                </div>
                <div class="chatListing">
                    <ChatHead
                    v-for="chat in chats"
                    :key="chat._id"
                    :chat="chat"
                    @click="setSelectedChat(chat)"
                    />
                </div>
            </div>
            <div 
                v-if="$store.getters.isMobile && !$store.getters.chatOpenStatus" 
                class="card chats"
                >
                <div class="searchHeader">
                    <div class="searchbar">
                        <UilSearch 
                            :style="{
                                fontSize: '18px',
                                color: '#ffffff',
                            }"
                        />
                        <input 
                        type="text" 
                        placeholder="Search Chats" 
                        v-on:input="search" 
                        v-on:keyup.enter="search" 
                        v-model.trim="searchText"
                        />
                    </div>
                    <UilPlus 
                     @click="
                        () => {
                        $store.commit('TOGGLE_CREATECHATMODAL');
                    }
                    " 
                        :style="{
                            fontSize: '15px',
                            color: 'white',
                            background: '#001425',
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '50%',   
                        }" 
                    />
                </div>
                <div v-show="allChats.length === 0" class="noChats">
                    <h3>Find People and Connect with them!</h3>
                    <Lottie 
                    :options="{ animationData: chatJson }"
                            :height="300"
                            :width="300"
                    />    
                </div>
                <div class="chatListing">
                    <ChatHead
                        v-for="chat in chats"
                        :key="chat._id"
                        :chat="chat"
                        @click="setSelectedChat(chat)"
                    />
                </div>

            </div>
            <div v-else class="card chat">
                <ChatBox v-if="$store.getters.chatOpenStatus" />
                <h2 class="chatBox-msg" v-else>
                    <Lottie 
                    :options="{ animationData: chatboxjson }"
                            :height="300"
                            :width="300"
                    /> 
                </h2>
        </div>
    </div>
</template>
<script>
import { UilPlus } from '@iconscout/vue-unicons'
import { UilSearch } from '@iconscout/vue-unicons';
import json from "../assets/chatAnimate.json";
import chatboxjson from "../assets/gjson.json";
import ChatHead from "../components/ChatHead.vue";
import Lottie from 'vue-lottie';
import ChatBox from "../components/ChatBox.vue";


export default {
    data() {
        return {
            allChats: [],
            chats: [],
            searchText: "",
            chatJson: json,
            chatboxjson,
         };
    },
    components: { 
        Lottie,
        UilSearch,
        UilPlus,
        ChatHead,
         ChatBox,
         },
    async created() {
        if (!this.$store.getters.loginStatus) {
            this.$router.push("/");
        }
        this.fetchChats();
    },
    watch: {
        "$store.state.updateChats": {
            handler() {
                this.fetchChats();
            },
            immediate: true,
        },
    },
    methods: {
        setSelectedChat(chat) {
            this.$store.commit("SET_SELECTED_CHAT", chat);
            this.$store.commit("SET_CHATOPEN");
        },
        async fetchChats() {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.$store.getters.user.token}`,
                    },
                };
                const { data } = await this.$axios.get(`/api/chat`, config);
                this.$store.commit("SET_CHATS", data);
                this.chats = data;
                this.allChats = data;
            } catch (error) {
            console.log(error);
        }
    },
    getSender(loggedIn, users) {
        return users[0]._id === loggedIn._id ? users[1] : users[0];
    },
    search() {
        if (this.searchText) {
            this.chats = this.allChats.filter((chat) => 
            chat.isGroupChat 
            ? chat.chatName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) 
            : this.getSender(this.$store.getters.user, chat.users)
             .name.toLowerCase()
             .includes(this.searchText)
             );
        } else {
            this.chats = this.allChats;
            }
    },
},


};
</script>
<style scoped>
.chat-container {
    height: 90vh;
    width: 100vw;
    display: flex;
    padding: 20px 0;
    flex-direction: row;
    align-items: center;
  }
  .card {
    height: 80vh;
    background: #017562;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
  .chats {
    flex: 3;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .chat {
    flex: 8;
  }
  
  .searchHeader {
    display: flex;
    width: 100%;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    min-height: fit-content;
    height: 60px;
  }
  .searchbar {
    background: #001425;
    border: none;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    border-radius: 5px;
    transition: all 300ms ease-in-out;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    flex-grow: 1;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  .searchbar input {
    outline: none;
    border: none;
    background: transparent;
    flex-grow: 1;
    padding: 0 10px;
    font-size: 14px;
    font-weight: bold;
  }
  .chatBox-msg {
    display: flex;
    align-items: center;
  }
  .chatBox-msg img {
    margin: 0 20px;
  }
  .chatListing {
    width: 100%;
    flex-grow: 2;
    scroll-behavior: smooth;
  }
  .noChats {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }   
</style>