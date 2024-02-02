
const MySettings = Vue.component('MySettings', {
	data: function () {
	    return {
	    	isFormValidPassword: false,
	    	isFormValidUpdate: true,
	    	isFormValidQuestion: false,
	    	password: {
		    	showOld:false,
		    	showA:false,
		    	showB:false,
		    	oldOne:'',
		    	newOneA:'',
		    	newOneB:'',
	        },
	        questions: [
		          { value: 'lists.questions.firstanimalname', key: 1 },
		          { value: 'lists.questions.firstcarbrand', key: 2 },
		          { value: 'lists.questions.birthcity', key: 3 },
		          { value: 'lists.questions.bug', key: 4 },
	        	],
	    	user: {
		    	login:'',
		    	firstname:'',
		    	lastname:'',
		    	email:'',
		    	question:0,
		    	answer:'',
		    	checkSecretQuestion:false,
		    	checkSecretAuth: false,
	        },
	    	alert: {
		    	show:false,
		    	message:'',
	        },
	        rules: {
	            required: value => !!value || 'Required.',
	            min: v => v.length >= 8 || 'Min 8 characters',
	            equals: v => v === this.password.newOneA || 'Passwords are not equals',
	         },
	    }
	},

    computed: {
    },

    template: `
    
<div >

  <v-alert color="red" type="error" text v-if="alert.show">{{alert.message}}</v-alert>
    	 <v-form v-model="isFormValidPassword" v-if="this.user.checkSecretQuestion">
         <v-card>
            <v-card-title>
              <span class="text-h5">{{ $t('title.settings.password') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row v-if="!this.user.checkSecretAuth">
                  <v-col cols="12" sm="6" md="5" >
                  
                            <v-text-field
					            v-model="password.oldOne"
					            :append-icon="password.showOld ? 'mdi-eye' : 'mdi-eye-off'"
            					:rules="[rules.required, rules.min]"
					            :type="password.showOld ? 'text' : 'password'"
					            name="input-10-1"
					            :label="$t('commons.holder.oldPassword')"
					            hint="At least 8 characters"
					            counter
					            @click:append="password.showOld = !password.showOld"
					          ></v-text-field>
                  
        										
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="5" >
                  
                            <v-text-field
					            v-model="password.newOneA"
					            :append-icon="password.showA ? 'mdi-eye' : 'mdi-eye-off'"
            					:rules="[rules.required, rules.min]"
					            :type="password.showA ? 'text' : 'password'"
					            name="input-10-1"
					            :label="$t('commons.holder.newPassword')"
					            hint="At least 8 characters"
					            counter
					            @click:append="password.showA = !password.showA"
					          ></v-text-field>
					          
                  </v-col>
                  <v-col cols="12" sm="6" md="5" >
                            <v-text-field
					            v-model="password.newOneB"
					            :append-icon="password.showB ? 'mdi-eye' : 'mdi-eye-off'"
            					:rules="[rules.required, rules.min, rules.equals]"
					            :type="password.showB ? 'text' : 'password'"
					            name="input-10-1"
					            :label="$t('commons.holder.reNewPassword')"
					            hint="At least 8 characters"
					            counter
					            @click:append="password.showB = !password.showB"
					          ></v-text-field>
					          
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            
            <v-card-actions>            
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="savePassword" :disabled="!isFormValidPassword">{{ $t('button.save') }}</v-btn>
            </v-card-actions>
            
          </v-card>
          </v-form>
          
          <v-form v-model="isFormValidUpdate" v-if="this.user.checkSecretQuestion && !this.user.checkSecretAuth">
          &nbsp;
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ $t('title.settings.information') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="5" >
        			<v-text-field v-model="user.login" :rules="[rules.required]" :label="$t('commons.holder.login')" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" >
        			<v-text-field v-model="user.email" :rules="[rules.required]" :label="$t('commons.holder.email')" ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="5" >
        			<v-text-field v-model="user.firstname" :rules="[rules.required]" :label="$t('commons.holder.firstname')" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" >
        			<v-text-field v-model="user.lastname" :rules="[rules.required]" :label="$t('commons.holder.lastname')" ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            
            <v-card-actions>            
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="saveInfos" :disabled="!isFormValidUpdate">{{ $t('button.save') }}</v-btn>
            
            </v-card-actions>
            
          </v-card>
          </v-form>
          
          <v-form v-model="isFormValidQuestion" v-if="!this.user.checkSecretAuth">
          &nbsp;
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ $t('title.settings.question') }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="7" >
                  
                  
        			<v-select v-model="user.question" :items="questions" :rules="[rules.required]" item-value="key" :label="$t('commons.security.questions')" >
        			               <template v-slot:selection="{ item, index }">{{$t(item.value)}}</template>
                  	               <template v-slot:item="{ active, item, attrs, on }">
					                  <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
					                    <v-list-item-content>
					                      <v-list-item-title>
					                        <v-row no-gutters align="center">
					                        <span>{{$t(item.value)}}</span>
					                        </v-row>
					                      </v-list-item-title>
					                    </v-list-item-content>
					                  </v-list-item>
					                </template>
        			</v-select>
        			
                  </v-col>
                  <v-col cols="12" sm="6" md="3" >
        			<v-text-field v-model="user.answer" :rules="[rules.required]" :label="$t('commons.security.answer')" ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            
            <v-card-actions>            
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="saveQuestion" :disabled="!isFormValidQuestion">{{ $t('button.save') }}</v-btn>
            
            </v-card-actions>
            
          </v-card>
          </v-form>
</div>

` ,  

    methods: {
	  initialize () {
		  
      	axios.get('/Casper/v1/settings/mySettings', {
  		  headers: {
  		    'Authorization': 'Bearer '+getAuthToken()
  		  }
  		})
  		.then((res) => {
  			this.user.login=res.data.element.login;
  			this.user.email=res.data.element.email;
  			this.user.firstname=res.data.element.firstname;
  			this.user.lastname=res.data.element.lastname;
  			this.user.checkSecretQuestion=res.data.element.checkSecretQuestion;
  			this.user.checkSecretAuth=res.data.element.checkSecretAuth;
  			
  		})
  		.catch((error) => { });
      	
		  
      },
      saveQuestion () {
    	  
    	  var _crypted = this.user.answer;
    	  
    	  var settings = {};
    	  
    	  settings.question=this.user.question;
    	  settings.answer=CryptoJS.SHA256(_crypted).toString(CryptoJS.enc.Base64);
    	  
  	    axios.patch('/Casper/v1/settings/mySettings/update', 
  	    		settings, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
                window.location.href="home.html";
	  		})
	  		.catch((error) => { });
      },
      saveInfos () {
    	  var settings = {};
    	  
    	  settings.email=this.user.email;
    	  settings.firstname=this.user.firstname;
    	  settings.lastname=this.user.lastname;
    	  
  	    axios.patch('/Casper/v1/settings/mySettings/update', 
  	    		settings, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
                window.location.href="home.html";
            })
	  		.catch((error) => { });
      },
      savePassword () {
    	  
    	  var _oldOne = this.password.oldOne;
    	  var _newOneA = this.password.newOneA;
    	  var _newOneB = this.password.newOneB;
    	  
    	  var settings = {};
    	settings.oldPassword=CryptoJS.SHA256(_oldOne).toString(CryptoJS.enc.Base64);
    	settings.newPassword1=CryptoJS.SHA256(_newOneA).toString(CryptoJS.enc.Base64);
    	settings.newPassword2=CryptoJS.SHA256(_newOneB).toString(CryptoJS.enc.Base64);

  	    axios.patch('/Casper/v1/settings/mySettings/password', 
  	    		settings, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
                window.location.href="home.html";
             })
	  		.catch((error) => { });
  	    
      },
    },
    beforeMount(){
        
        if (!isLoggedIn()) {
        	this.logout();
        }
        else {
        	this.initialize();

        }
    }
});
