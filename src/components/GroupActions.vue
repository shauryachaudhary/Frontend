<template>
    <div class="container">
      <Button
        @click="removeMember($store.getters.user)"
        class="leaveBtn"
        text=""
        :leave="true"
      />
      <h2 class="groupName">{{ $store.getters.selectedChat.chatName }}</h2>
      <div class="membersList">
        <span>Members:</span>
        <div v-for="member in membersList" :key="member._id" class="member">
          <span class="memberName">{{ member.name }}</span>
          <UilTimes 
            v-if="
              $store.getters.selectedChat.groupAdmin._id ===
              $store.getters.user._id
            "
            :style="{
              fontSize: '10px',
              color: 'red',
              margin: '0 5px',
              cursor: 'pointer',
            }"
            @click="removeMember(member)"
          />
        </div>
      </div>
      <div class="updateName">
        <input
          type="text"
          placeholder="Edit Group Name:"
          v-model.trim="groupName"
          id="groupChatName"
        />
        <Button @click="updateGroupName" class="updateBtn" text="" :edit="true" />
      </div>
      <h6 v-if="errorMsg" class="error">{{ errorMsg }}</h6>
      <h6 v-else class="success">{{ successMsg }}</h6>
  
      <div
        v-if="
          $store.getters.selectedChat.groupAdmin._id === $store.getters.user._id
        "
        class="memberSearchbar"
      >
        <UilSearch
          :style="{
            fontSize: '18px',
            color: '#ffffff',
          }"
        />
        <input
          type="text"
          placeholder="Search Users to add"
          v-on:input="search"
          v-on:keyup.enter="search"
          v-model.trim="searchText"
        />
      </div>
      <div
        v-if="
          usersToRender &&
          $store.getters.selectedChat.groupAdmin._id === $store.getters.user._id
        "
        class="listUsers"
      >
        <UserHead
          v-for="user in usersToRender"
          :key="user._id"
          :user="user"
          @click="addMember(user)"
        />
      </div>
    </div>
  </template>
  <script>
  import { UilTimes } from '@iconscout/vue-unicons';
  import { UilSearch } from '@iconscout/vue-unicons';
  import UserHead from "../components/UserHead.vue";
  import Button from "../components/ButtonPage.vue";
  export default {
    props: {
      groupChat: {
        type: Object,
      },
    },
    components: {
      UilSearch,
      UilTimes,
      Button,
      UserHead,
    },
    data() {
      return {
        membersList: [],
        errorMsg: "",
        successMsg: "",
        groupName: "",
        searchText: "",
        usersToRender: [],
        users: [],
      };
    },
    async mounted() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.getters.user.token}`,
          },
        };
        const { data } = await this.$axios.get(`api/user`, config);
  
        this.users = JSON.parse(JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    },
    created() {
      this.membersList = this.$store.getters.selectedChat.users;
      this.groupName = this.$store.getters.selectedChat.chatName;
    },
    methods: {
      search() {
        if (this.searchText) {
          this.usersToRender = this.users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(this.searchText.toLowerCase())
            )
            .filter((user) => !this.membersList.includes(user));
        } else {
          this.usersToRender = [];
        }
      },
      async addMember(user) {
        let memberIds = [];
        this.membersList.map((member) => memberIds.push(member._id));
        if (memberIds.includes(user._id)) {
          this.errorMsg = "Already in the Group!";
          return;
        } else {
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.$store.getters.user.token}`,
              },
            };
  
            const { data } = await this.$axios.put(
              `api/chat/groupadd`,
              {
                chatId: this.$store.getters.selectedChat._id,
                userId: user._id,
              },
              config
            );
            this.successMsg = "User Added!";
            this.membersList.push(user);
            this.searchText = "";
            this.$store.commit("SET_SELECTED_CHAT", data);
            this.$store.commit("TOGGLE_UPDATE_CHATS");
          } catch (error) {
            this.errorMsg = "Error: Couldn't add user!";
            console.log(error);
          }
        }
      },
      async removeMember(user) {
        this.successMsg = "";
        this.errorMsg = "";
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$store.getters.user.token}`,
            },
          };
  
          const { data } = await this.$axios.put(
            `api/chat/groupremove`,
            {
              chatId: this.$store.getters.selectedChat._id,
              userId: user._id,
            },
            config
          );
  
          if (user._id === this.$store.getters.user._id) {
            this.$store.commit("SET_SELECTED_CHAT", null);
            this.$store.commit("TOGGLE_PROFILE");
            this.$store.commit("SET_CHATCLOSE");
          } else {
            this.$store.commit("SET_SELECTED_CHAT", data);
          }
  
          this.$store.commit("TOGGLE_UPDATE_CHATS");
          this.membersList = this.membersList.filter(
            (member) => member._id !== user._id
          );
          this.successMsg = "User Removed!";
        } catch (error) {
          this.errorMsg = "Error: Couldn't Remove user!";
          console.log(error);
        }
      },
  
      isAdmin() {
        return (
          this.$store.getters.selectedChat.groupAdmin._id ==
          this.$store.getters.user._id
        );
      },
      async updateGroupName() {
        this.errorMsg = "";
        this.successMsg = "";
        if (this.groupName === this.$store.getters.selectedChat.chatName) {
          this.errorMsg = "Make some change to Group Name!";
          return;
        }
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$store.getters.user.token}`,
            },
          };
  
          const { data } = await this.$axios.put(
            `api/chat/rename`,
            {
              chatId: this.$store.getters.selectedChat._id,
              chatName: this.groupName,
            },
            config
          );
          this.successMsg = "Name Updated!";
          this.$store.commit("SET_SELECTED_CHAT", data);
          this.$store.commit("TOGGLE_UPDATE_CHATS");
        } catch (error) {
          this.errorMsg = "Some error occured!";
          console.log(error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .container {
    min-width: 100%;
    width: 50vw;
    height: fit-content;
  }
  .membersList {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 10px;
    min-height: 60px;
  }
  .error {
    color: rgb(219, 0, 0);
    font-size: 16px;
    margin: 0px 8px;
    overflow: hidden;
    text-align: left;
  }
  .success {
    color: green;
    font-size: 16px;
    margin: 0px 8px;
    overflow: hidden;
    text-align: left;
  }
  .member {
    display: flex;
    align-items: center;
    text-align: center;
    background-image: linear-gradient(
      64.5deg,
      rgba(245, 116, 185, 1) 14.7%,
      rgba(89, 97, 223, 1) 88.7%
    );
    color: #fff;
    border-radius: 10px;
    padding: 4px;
    cursor: default;
    margin: 10px;
  }
  .updateName {
    display: flex;
    width: 100%;
    padding: 0 5px;
    margin: 10px 0;
    align-items: center;
  }
  .updateName input {
    outline: none;
    background: #001425;
    border: none;
    padding: 8px 20px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    border-radius: 5px;
    width: 220px;
    flex-grow: 2;
    height: 40px;
  }
  .updateBtn {
    width: fit-content;
    margin-left: 10px;
  }
  .leaveBtn {
    width: fit-content;
    margin-left: 10px;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
  .memberSearchbar {
    background: #001425;
    border: none;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    transition: all 300ms ease-in-out;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    width: 100%;
    max-width: 300px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin-left: 6px;
  }
  .memberSearchbar input {
    outline: none;
    border: none;
    background: transparent;
    flex-grow: 1;
    padding: 0 10px;
    font-size: 14px;
    font-weight: bold;
  }
  .listUsers {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(5, 1fr); */
    gap: 5px;
    margin-bottom: 40px;
  }
  </style>
  