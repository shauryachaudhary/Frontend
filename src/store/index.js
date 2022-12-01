import { createStore } from "vuex";

export default createStore({
    state: {
        user: {
            name:"Shaurya Chaudhary",
            email:"shauryac00@gmail.com",
            avatar: "https://icons8.com/icon/11727/account",
            token: "",
            _id: "",
        },
        isLoggedIn: false,
        chats: [],
        isProfileOpen: false,
        isChatOpen: false,
        isCreateModalOpen: false,
        profileStates: {
            name: "Shaurya Chaudhary",
            email: "shauryac00@gmail.com",
            avatar: "https://icons8.com/icon/11727/account",
        },
        selectedChat: null,
        updateChats: false,
        mobileView: false,
        isProfile: true,
            
        },
        mutations: {
            SET_MOBILE_VIEW(state, value) {
                state.mobileView = value;
            },
            SET_ISPROFILE(state, value) {
                state.isProfile = value;
            },
            SET_NAME(state, name) {
                state.user.name = name;
            },
            SET_EMAIL(state, email) {
                state.user.email = email;
            },
            SET_AVATAR(state, avatar) {
                state.user.avatar = avatar;
            },
            SET_TOKEN(state, token) {
                state.user.token = token;
            },
            SET_ID(state, id) {
                state.user._id = id;
            },
            SET_LOGINSTATUS(state) {
                state.isLoggedIn = true;
            },
            SET_CHATOPEN(state) {
                state.isChatOpen = true;
            },
            SET_CHATCLOSE(state) {
                state.isChatOpen = false;
            },
            SET_CHATS(state, chats) {
                state.chats = chats;
            },
            TOGGLE_PROFILE(state) {
                state.isProfileOpen = !state.isProfileOpen;
            },
            TOGGLE_UPDATE_CHATS(state) {
                state.updateChats = !state.updateChats;
            },
            TOGGLE_CREATECHATMODAL(state) {
                state.isCreateModalOpen = !state.isCreateModalOpen;
            },
            LOGOUT(state) {
                state.isLoggedIn = false;
                state.user.name = null;
                state.user.email = null;
                state.user.avatar = null;
            },
            SET_PROFILESTATES(state, { name, email, avatar }) {
                state.profileStates.name = name;
                state.profileStates.email = email;
                state.profileStates.avatar = avatar;
            },
            SET_SELECTED_CHAT(state, chat) {
            
                state.selectedChat = chat;
            },

            

        },
        actions: {},
        getters: {
            user: (state) => {
                return state.user;
            },
            isMobile: (state) => {
                return state.mobileView;
            },
            isProfile: (state) => {
                return state.isProfile;
            },
            profileStates: (state) => { 
                return state.profileStates;
            },
            loginStatus: (state) => {
                return state.isLoggedIn;
            },
            chatOpenStatus: (state) => {
                return state.isChatOpen;
            },
            isProfileOpen: (state) => {
                return state.isProfileOpen;
            },
            isCreateChatModalOpen: (state) => {
                return state.isCreateModalOpen;
            },
            selectedChat: (state) => {
                return state.selectedChat;
            },
            getChats: (state) => { 
                return state.chats;
            },
            updateChats: (state) => {
                return state.updateChats;
            },
        },



    
});