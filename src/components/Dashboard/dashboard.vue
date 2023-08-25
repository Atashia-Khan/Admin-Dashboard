<template>
  <div>
    <!-- floating chat button -->
    <div class="chat-Button">
      <button @click="openChats">
        <i class="fa-solid fa-message"></i>
      </button>
    </div>
    <!-- floating chat window -->
    <div class="chat-box" v-if="showChat">
      <!-- <h4 class="chat-heading">Chat with us</h4> -->

      <!-- show messages of both the human and the bot -->
      <div v-for="(item, index) in getChatHistory" :key="index">
        <p v-if="item.user === 'bot'" class="show-bot-messages">{{ getChatHistory[index].message }}</p>
        <p v-else-if="item.user === 'human'" class="show-user-messages">{{ getChatHistory[index].message }}</p>
      </div>
      <div class="send-message">
        <input type="text" class="input-messsage-filed" v-model.lazy="textMessage" placeholder="Type message...">
        <button class="send-message-btn" @click="sendMessageThroughSocket">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>

    <div class="row m-0 g-0">
      <div class="sidebar col-lg-3 col-sm-0">
        <sidebar />
      </div>
      <div class="col-lg-9 col-sm-12">
        <router-view />
      </div>
    </div>

  </div>
</template>


<script>
import io from 'socket.io-client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './sidebar.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showChat: false,
      textMessage: '',
      serverConnected: false,
    };
  },

  components: {
    Sidebar,

  },
  computed: {
    ...mapGetters([
      'getChatHistory',
    ]),
  },
  created() {
    this.connectSocket();
  },
  methods: {
    openChats() {
      this.showChat = !this.showChat;
    },
    connectSocket() {
      this.socket = io('http://192.168.11.213:3000');

      this.socket.on('connect', () => {
        console.log('Server connected successfully...!');
        this.serverConnected = true;
      });
      this.socket.on('disconnect', () => {
        console.log('Server disconnected. Please try again.');
        this.serverConnected = false;
      });
      const botMessages = [];
      // message being received from the bot
      this.socket.on('chat message', (message) => {
        const messageObj = {
          message: message,
          user: "bot",
        }
        botMessages.push(messageObj);
        // this.$store.dispatch('setChatHistory', messageObj);
        console.log("Received Message: ", message);
      });
      setInterval(() => {
        if (botMessages.length > 0) {
          this.$store.dispatch('setChatHistory', botMessages);
          botMessages.length = 0;
        }
      }, 1000);
    },
    async sendMessageThroughSocket() {
      if (!this.serverConnected) {
        console.log("Server is not connected. Try again later.");
        return;
      }
      try {
        if (this.textMessage) {
          const messageObj = {
            message: this.textMessage,
            user: "human",
          }
          this.$store.dispatch('setChatHistory', messageObj);
          this.socket.emit('chat message', messageObj.message);
        }
      } catch (error) {
        console.log("Connection failed. Error: ", error);
      }
    }
  },

}
</script>


<style scoped>
.chat-Button>button {
  z-index: 5;
  background-color: #081932;
  color: white;
  padding: 1rem 1.7rem;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 1.5rem;
  right: 1.2rem;
  width: 3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(72, 72, 72, 0.3);

  >i {
    font-size: larger;
  }
}

.chat-Button>button:hover {
  background-color: #0d2850;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.chat-box {
  height: 20rem;
  width: 20rem;
  border-radius: 1rem 1rem 0 1rem;
  position: fixed;
  bottom: 5rem;
  right: 1.2rem;

  /* position: relative; */

  z-index: 10;
  background-color: #0d2850;
  padding: 0.5rem;
  box-shadow: 0px 0px 10px rgba(72, 72, 72, 0.3);
  overflow-y: scroll;
}

.chat-heading {
  color: white;
  position: absolute;
}

.send-message[data-v-1e5fb259] {
  position: fixed;
  z-index: 20;
  bottom: 87px;
  background-color: #0d2850;
  /* left: 20px; */
  right: 60px;
}

.send-message {
  /* position: fixed; */
  z-index: 20;
  /* top: 40; */
  bottom: 0;
  background-color: #0d2850;
}

.input-messsage-filed {
  /* position: fixed; */
  /* bottom: 10; */
  /* right: 30; */
  /* margin-top: 16rem; */
  color: white;
  background-color: transparent;
  border: none;
  border: 1px solid white;
  padding: 0.3rem;
  border-radius: 1rem;
}

.input-messsage-filed::placeholder {
  color: white;
}

.input-messsage-filed:focus {
  border-color: 1px solid white;
}

.input-messsage-filed:focus-visible {
  outline: 0;
  border: 1px solid white;
}

.send-message-btn {
  background-color: transparent;
  border: none;
  color: white;
}

.show-user-messages {
  color: #14386e;
  background-color: white;
  opacity: 0.9;
  width: fit-content;
  text-align: right;
  margin-bottom: 0.5rem;
  border-radius: 1rem 1rem 0 1rem;
  /* float: right; */
  clear: right;
}

.show-bot-messages {
  color: white;
  background-color: #14386e;
  opacity: 0.9;
  width: fit-content;
  text-align: left;
  margin-bottom: 0.5rem;
  border-radius: 1rem 1rem 1rem 0;
  /* float: left; */
  clear: left;
}
</style>