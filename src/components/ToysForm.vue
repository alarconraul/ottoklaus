<template>
  <v-row justify="center">
    <v-dialog
      v-model="showForm"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Formulario de Juguete</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Código" v-model="toy.data.code" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombre" required v-model="toy.data.name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field label="Stock" required v-model="toy.data.stock"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field label="Precio" prefix="$" required v-model="toy.data.price"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="closeForm"
          >
            Close
          </v-btn>
          <v-btn
            v-text="toy.id ? 'Actualizar':'Crear'"
            color="blue darken-1"
            text
            @click.prevent="submitForm"
          >
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
 props:{
   showForm:{
     type: Boolean,
     default: false
   }
 },
 data(){
   return{
     toy:{
       id: null,
       data:{
         name: null,
         code: null,
         price: 0,
         stock: 0
       }
     }
   }
 },
 methods:{
   ...mapActions(["createToy","updateToy"]),
   submitForm(){
     if(!confirm('¿Deseas actualizar el juguete?')){ return }

     if(this.toy.id){
       this.updateToy(this.toy)
     }else{
       this.createToy(this.toy.data)
     }
     this.$emit('close-form')
     this.resetToy()
   },
   closeForm(){
     this.$emit('close-form')
     this.resetToy()
   },
   resetToy(){
     this.toy.id = null,
     this.toy.data.name = null,
     this.toy.data.code = null,
     this.toy.data.stock = 0,
     this.toy.data.price = 0
   }
 },
 computed:{
   ...mapState(["currentToy"])
 },
 watch:{
   currentToy: function(){
     this.toy = JSON.parse(JSON.stringify(this.currentToy))
  }
 }
}
</script>

<style>

</style>