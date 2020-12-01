<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt=""
          class="shrink mr-2"
          contain
          src="https://i.pinimg.com/originals/8b/13/84/8b13848fb29edba2274959cb1d1e99c9.png"
          transition="scale-transition"
          width="180"/>
          <h1>Otto Klaus</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="currentUser" @click="logout" text>
        <span class="mr-2">Cerrar Sesión</span>
        <v-icon>mdi-lock-open</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',

  data: () => ({
  }),
  computed:{
    ...mapState(["currentUser"])
  },
  methods:{
    ...mapActions(["setCurrentUser"]),
    logout(){
      firebase.auth().signOut().then(()=>{
        this.setCurrentUser(null)
        this.$router.push('/login')
      })
    }
  },

  created(){
    this.setCurrentUser(firebase.auth().currentUser)
  }
};
</script>
