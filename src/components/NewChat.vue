<template>
    <div
      @click="
        () => {
        $store.commit('TOGGLE_CREATECHATMODAL');
        }
      "
      class="profile"
    >
      <div
        @click="
          (e) => {
            e.stopPropagation();
          }
        "
        class="card"
      >
        <div
          :style="{
            fontSize: '20px',
            position: 'absolute',
            bottom: '15px',
            right: '15px',
            display: 'flex',
            alignItems: 'center',
            width: '80px',
            cursor: 'pointer',
          }"
          @click="
            () => {
        $store.commit('TOGGLE_CREATECHATMODAL');
            }
          "
        >
          Close
          <UilTimes  />
        </div>
  
        <div class="container">
          <div class="tabs">
            <div
              @click="
                () => {
                  direct = true;
                }
              "
              :class="['tab', 'directChat', { active: direct }]"
            >
              <span>Private</span><UilUser />
            </div>
            <div
              @click="
                () => {
                  direct = false;
                }
              "
              :class="['tab', 'groupChat', { active: !direct }]"
            >
              <span> Group </span><UilUsersAlt />
            </div>
          </div>
          <div class="content">
            <div v-if="direct" class="directContent">
              <div class="searchbar">
                <UilSearch
                  :style="{
                    fontSize: '18px',
                    color: '#ffffff',
                  }"
                />
                <input
                  type="text"
                  placeholder="Search Users by Name or Email"
                  v-on:input="search"
                  v-on:keyup.enter="search"
                  v-model.trim="searchText"
                />
              </div>
              <h3 class="suggest" v-show="!this.searchText">Suggestions</h3>
              <div class="listUsers">
                <UserHead
                  @click="accessChat(user._id)"
                  v-for="user in usersToRender"
                  :key="user._id"
                  :user="user"
                />
              </div>
            </div>
            <div v-else class="groupContent">
              <div class="groupChatInfo">
                <div class="groupName">
                  <label v-if="!$store.getters.isMobile" for="groupChatName"
                    >Group Name:</label
                  >
                  <input
                    type="text"
                    placeholder="Type a name for your Group"
                    v-model.trim="groupName"
                    id="groupChatName"
                  />
                  <Button
                    @click="createGroup"
                    class="createBtn"
                    :text="$store.getters.isMobile ? '' : 'Create'"
                    :group="true"
                  />
                  <h6 class="error">{{ errorMsg }}</h6>
                </div>
                <div class="members">
                  <label v-if="!$store.getters.isMobile">Add Members:</label>
                  <div v-if="membersList" class="membersList">
                    <div
                      v-for="member in membersList"
                      :key="member._id"
                      class="member"
                    >
                      <span class="memberName">{{ member.name }}</span>
                      <UilTimes 
                        :style="{
                          fontSize: '10px',
                          color: 'red',
                          margin: '0 5px',
                          cursor: 'pointer',
                        }"
                        @click="removeMember(member._id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="memberSearchbar">
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
              <div class="listUsers">
                <UserHead
                  @click="addMember(user)"
                  v-for="user in usersToRender"
                  :key="user._id"
                  :user="user"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
 
  import { UilTimes } from '@iconscout/vue-unicons';
  import { UilUser } from '@iconscout/vue-unicons';
  import { UilUsersAlt } from '@iconscout/vue-unicons';
  import { UilSearch } from '@iconscout/vue-unicons';

  import UserHead from "../components/UserHead.vue";
  import Button from "../components/ButtonPage.vue";
  export default {
    data() {
      return {
        direct: true,
        searchText: "",
        users: [],
        usersToRender: [],
        groupName: "",
        membersList: [],
        errorMsg: "",
      };
    },
    components: {
      UserHead,
      UilSearch,
      UilTimes ,
      UilUser,
      UilUsersAlt,
      Button,
    },
    async mounted() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.getters.user.token}`,
          },
        };
        const { data } = await this.$axios.get(`api/user`, config);
  
        this.users = data;
        this.usersToRender = data.filter(
          (user) =>
            user._id === "625168b0d9218d05ab04b717" ||
            user._id === "62530603ae30f4f77ec48adc" ||
            user._id === "62517519d9218d05ab04b84f" ||
            user._id === "62534560fe40ae24afbc95ba"
        );
      } catch (error) {
        console.log(error);
      }
    },
  
    methods: {
      search() {
        if (this.searchText) {
          this.usersToRender = this.users.filter(
            (user) =>
              user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
              user.email.toLowerCase().includes(this.searchText.toLowerCase())
          );
        } else {
          this.usersToRender = this.users.filter(
            (user) =>
              user._id === "625168b0d9218d05ab04b717" ||
              user._id === "62530603ae30f4f77ec48adc" ||
              user._id === "62517519d9218d05ab04b84f" ||
              user._id === "62534560fe40ae24afbc95ba"
          );
        }
      },
      async accessChat(userId) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.getters.user.token}`,
            },
          };
          const { data } = await this.$axios.post(`api/chat`, { userId }, config);
  
          this.$store.commit("SET_SELECTED_CHAT", data);
          this.$store.commit("SET_CHATOPEN", data);
          this.$store.commit("TOGGLE_CREATECHATMODAL");
          this.$store.commit("TOGGLE_UPDATE_CHATS");
        } catch (error) {
          console.log(error);
        }
      },
      addMember(user) {
        this.membersList.includes(user) ? "" : this.membersList.push(user);
      },
      removeMember(userId) {
        this.membersList = this.membersList.filter(
          (member) => member._id !== userId
        );
      },
      async createGroup() {
        if (!this.groupName && this.membersList.length === 0) {
          this.errorMsg = "All Fields are required!";
          return;
        } else if (!this.groupName) {
          this.errorMsg = "Please enter a Group Name!";
          return;
        } else if (this.membersList.length === 0) {
          this.errorMsg = "Add Members to your Group!";
          return;
        }
  
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${this.$store.getters.user.token}`,
            },
          };
  
          const { data } = await this.$axios.post(
            `api/chat/group`,
            {
              name: this.groupName,
              users: JSON.stringify(this.membersList.map((user) => user._id)),
            },
            config
          );
  
          this.$store.commit("SET_SELECTED_CHAT", data);
          this.$store.commit("SET_CHATOPEN", data);
          this.$store.commit("TOGGLE_CREATECHATMODAL");
          this.$store.commit("TOGGLE_UPDATE_CHATS");
        } catch (error) {
          console.log(error);
        }
      },
    },
  
  };
  </script>
  <style scoped>
  .profile {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.342);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    border-radius: 50%;
  }
  .error {
    color: rgb(219, 0, 0);
    font-size: 14px;
    height: 20px;
    margin: 4px 0;
    overflow: hidden;
  }
  .suggest {
    margin-top: 10px;
    margin-left: 5px;
    text-align: left;
  }
  .card {
    width: 90%;
    height: 80%;
    background: #022422;
    border-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 2px #7facff, 0 0 4px #7facff, 0 0 6px #7facff,
      0 0 15px #7facff;
    position: relative;
  }
  .card img {
    margin: 20px 0;
  }
  
  .container {
    width: 101%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .tabs {
    display: flex;
    width: 100%;
    font-size: 25px;
    align-items: center;
    padding-bottom: 20px;
  }
  .tab {
    width: 50%;
    padding: 20px 0;
    border-bottom: 1px solid #0014256b;
    cursor: pointer;
  }
  .directChat {
    border-top-left-radius: 10px;
  }
  .groupChat {
    border-top-right-radius: 10px;
  }
  .active {
    background: #001425;
    box-shadow: 0 0 2px #7facff, 0 0 4px #7facff, 0 0 6px #7facff,
      0 0 15px #7facff;
    transition: all ease-in-out 100ms;
  }
  .tab:hover {
    background: #013e74;
    transition: all ease-in-out 100ms;
  }
  .tab span {
    margin: 0 6px;
  }
  
  .content {
    width: 90%;
    height: 90%;
    /* padding: 20px; */
  }
  
  .directContent {
    width: 100%;
    height: 100%;
  }
  .groupContent {
    width: 100%;
    height: 100%;
  }
  
  .groupChatInfo {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  
  .groupName {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: visible;
    padding-top: 10px;
  }
  
  .members {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    margin: 15px 0;
    padding: 10px 0;
  }
  
  .membersList {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 10;
    padding: 0 10px;
    min-height: 60px;
  }
  
  .member {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
      64.5deg,
      rgba(245, 116, 185, 1) 14.7%,
      rgba(89, 97, 223, 1) 88.7%
    );
    color: #fff;
    border-radius: 10px;
    padding: 8px 5px;
    cursor: pointer;
    margin: 10px;
  }
  
  .memberName {
    margin: 0 4px;
  }
  .groupName label,
  .members label {
    font-size: 20px;
    width: fit-content;
    white-space: nowrap;
  }
  
  .members label {
    flex: 2;
    align-self: flex-start;
    margin-top: 10px;
    text-align: left;
  }
  
  .groupName input {
    outline: none;
    background: #001425;
    border: none;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    border-radius: 5px;
    width: 220px;
    margin: 0 10px;
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
    width: 300px;
    max-width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
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
  
  .createBtn {
    margin: 0 20px;
  }
  
  .searchbar {
    background: #001425;
    border: none;
    padding: 15px 20px;
    color: #ffffff;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    transition: all 300ms ease-in-out;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    width: 300px;
    max-width: 100%;
    margin-top: 10px;
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
  
  .listUsers {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(5, 1fr); */
    gap: 5px;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 600px) {
    .searchbar {
      width: 100%;
    }
  }
  </style>
  