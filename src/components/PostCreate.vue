<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Post information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-text-field
                      v-model="post.name"
                      label="Name"
                      required
                    />
                    <v-text-field
                      v-model="post.description"
                      label="Description"
                      required
                    />
                    <v-text-field
                      v-model="post.year"
                      label="Year"
                      required
                    />
                    <v-text-field
                      v-model="post.rating"
                      label="Rating"
                      required
                    />
                  </v-container>
                  <v-btn v-if="!isUpdate" class="blue white--text" @click="createPost">Save</v-btn>
                  <v-btn v-if="isUpdate" class="blue white--text" @click="updatePost">Update</v-btn>
                  <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>

                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'PostCreate',
    components: {},
    data() {
      return {
        showError: false,
        post: {},
        pageTitle: "Add New Post",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createPost() {
        apiService.addNewPost(this.post).then(response => {
          if (response.status === 201) {
            this.post = response.data;
            this.showMsg = "";
            router.push('/post-list/new');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
        router.push("/post-list");
      },
      updatePost() {
        apiService.updatePost(this.post).then(response => {
          if (response.status === 200) {
            this.post = response.data;
            router.push('/post-list/update');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Post";
        this.isUpdate = true;
        apiService.getPost(this.$route.params.pk).then(response => {
          this.post = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>

