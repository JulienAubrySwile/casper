
const Users = Vue.component('Users', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:31,
	        },
	    	security: {
		    	readable:false,
		    	writable:false,
		    	deletable:false,
		    	extended:false,
	        },
            isFormValid:false,
    	    rules: {
    	        required: value => !!value || 'Required.',
	            min: v => !v || v.length >= 8 || 'Min 8 characters',
	            email: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    	    },
	        dialog: {
	        	activities:[],
	        	tabToShow: 1,
	        	tabIndex: 1,
	        	readOnly: false,
		        dialogUpdate: false,
		        dialogDelete: false,
		        editedIndex: -1,
		        showPassword: false,
		        editedItem: {
		          login: '',
		        },
		        defaultItem: {
		        	login: '',
		        },
		        genderItems: [
		          { value: 'lists.genders.m', key: 1 },
		          { value: 'lists.genders.mme', key: 2 },
		          { value: 'lists.genders.mle', key: 3 },
	        	],
		        realmItems: [
		          { value: 'lists.realms.local', key: 1 },
		          { value: 'lists.realms.sso', key: 2 },
	        	],
		        statusItems: [
		          { value: 'lists.status.enable', key: 1 },
		          { value: 'lists.status.disable', key: 2 },
		          { value: 'lists.status.block', key: 3 },
	        	],
		        groupItems: [
	        	]
	        },
	        datatable: {
		        footerProps: {
		        	'disable-items-per-page':true,
		        	'items-per-page-text':'',
		        },
	        },
	        search: '',
	    	errorMessage:'',
	    	errorPopin:'',
	        dataItems: [],
	        filterItems: [],

	    }
	},

    computed: {
      computedHeaders () {
      	return [
		            { text: this.$t('commons.holder.gender') , 	align: 'center', value: 'gender', width: '100px' },
		            { text: this.$t('commons.holder.name'), 	align: 'center', value: 'nom' },
		            { text: this.$t('commons.holder.firstname'), align: 'center', value: 'prenom' },
		            { text: this.$t('commons.holder.email'), 	align: 'center', value: 'email' },
		            { text: this.$t('commons.security.login'), 	align: 'center', value: 'login', },
		            { text: this.$t('commons.security.group'), 	align: 'center', value: 'group', },
		            { text: this.$t('commons.others.status'), 	align: 'center', value: 'status', },
		            { text: '', 	align: 'center', value: 'actions', sortable: false, width: '150px' },
		          ];
      },
      computedActivitiesHeaders () {
      	return [
            { text: this.$t('commons.events.date'), 		align: 'center', value: 'date',width: '200px' },
            { text: this.$t('commons.events.type'), 		align: 'center', value: 'type',width: '150px' },
            { text: this.$t('commons.events.detail'), 		align: 'left', value: 'arn', },
		  ];
      },
      computedGender () {
      	return [
		          { value: 'lists.genders.m', key: 1 },
		          { value: 'lists.genders.mme', key: 2 },
		          { value: 'lists.genders.mle', key: 3 },
	        	];
      },
      formTitle () {
      
      	if (this.dialog.readOnly) {
      		return this.$t('messages.consultation');
      	}
      	else if (this.dialog.editedIndex === -1) {
      		return this.$t('messages.creation');
      	}
      	else {
      		return this.$t('messages.modification');
      	}
      	
      },
    },

    watch: {
      dialogUpdate (val) {
        val || this.close();
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    template: `
    
<div id="listing">

  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
    	
  <v-data-table v-if="security.readable" :headers="computedHeaders" :items="dataItems" @current-items="eventFilterItems" :search="search" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :items-per-page="options.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.Users') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search" clearable clear-icon="mdi-close" @click:clear="search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="users" :data="filterItems"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.json" color=" darken-1" text ><vue-blob-json-csv file-type="json" file-name="users" :data="filterItems"><v-icon>mdi-code-json</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" color=" darken-1" text @click="initialize" ><v-icon>mdi-refresh</v-icon></vue-blob-json-csv></v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog.dialogUpdate" max-width="900px" min-height="572px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" v-if="security.writable">{{ $t('button.add') }}</v-btn>
          </template>
          <v-card>
			<v-form v-model="isFormValid">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
									
            </v-card-title>

  
    <v-tabs flat v-model="dialog.tabIndex" v-if="dialog.editedIndex !== -1 && security.extended===true">
      <v-tab @click="changeTab(1)">{{ $t('title.Informations') }}</v-tab>
      <v-tab @click="changeTab(2)">{{ $t('title.Activites') }} : {{dialog.editedItem.login}}</v-tab>
    </v-tabs>

            <v-card-text v-show="dialog.tabToShow==2" >
				<v-data-table height="282px" :fixed-header="true" :headers="computedActivitiesHeaders" :items="dialog.activities"  locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :hide-default-footer="true" disable-pagination dense>
				    <template v-slot:item.date="{ item }">{{ convertDate(item.date) }}</template>
				    <template v-slot:item.arn="{ item }">{{ convertArn(item) }} <v-icon small v-if="showArn(item)" @click="clickArn(item)">mdi-link-variant</v-icon> </template>
				    <template v-slot:no-data>
				      {{$t('errors.emptydata')}}
				    </template>
			  	</v-data-table>
  
            </v-card-text>
            
            <v-card-text v-show="dialog.tabToShow==1" >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="2" >
					<v-select v-model="dialog.editedItem.gender" :rules="[rules.required]" :items="dialog.genderItems" item-value="key" :label="$t('commons.holder.gender')" :readonly="dialog.readOnly">
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
                  <v-col cols="12" sm="6" md="5" >
                    <v-text-field v-model="dialog.editedItem.nom" :rules="[rules.required]" :label="$t('commons.holder.name')" :readonly="dialog.readOnly" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" >
                    <v-text-field v-model="dialog.editedItem.prenom" :rules="[rules.required]" :label="$t('commons.holder.firstname')" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="6" >
                    <v-text-field v-model="dialog.editedItem.login" :rules="[rules.required]" :label="$t('commons.security.login')" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="5" md="6" >
                    <v-text-field 	v-model="dialog.editedItem.password" 
                    				:rules="[rules.required,rules.min]" 
                    				:label="$t('commons.security.password')" 
                    				:type="dialog.showPassword ? 'text' : 'password'"
					            	:append-icon="dialog.readOnly ? '' : dialog.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					            	hint="At least 8 characters"
					            	counter
					            	@click:append="dialog.showPassword = !dialog.showPassword"
                    				:readonly="dialog.readOnly">
                    </v-text-field>
                    					
                    			
                    			
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="4" >

        			<v-select v-model="dialog.editedItem.group" :rules="[rules.required]" :items="dialog.groupItems" item-text="value" item-value="key" :label="$t('commons.security.group')" :readonly="dialog.readOnly">
        			
        			</v-select>
        			
                  </v-col>
                  <v-col cols="30" sm="2" md="2" >
                  	<v-select v-model="dialog.editedItem.status" :items="dialog.statusItems" :rules="[rules.required]" item-value="key" :label="$t('commons.others.status')" :readonly="dialog.readOnly">
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
                  <v-col cols="12" sm="4" md="6" >
        			<v-text-field v-model="dialog.editedItem.email" :rules="[rules.required, rules.email]" :label="$t('commons.holder.email')" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
            	  <v-card-text v-if="dialog.editedIndex>=0">
	              <v-container>
	                <v-row>
	                  <v-col cols="12" sm="6" md="12" >
	                  	{{ $t('messages.created') }} {{convertDate(dialog.editedItem.creationDate)}}. {{ $t('messages.lastModification') }} {{concatModificationDate(dialog.editedItem)}} {{ $t('messages.by') }} {{dialog.editedItem.modificationUser}}
	                  </v-col>
	                </v-row>
	              </v-container>
            </v-card-text>
            </v-card-actions>
            
            <v-card-actions>
	          <v-alert class="v-alert-centered" dense type="error" color="red" outlined transition="fade-transition" style="color:red" v-if="errorPopin">{{errorPopin}}</v-alert>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save" v-if="security.writable && !dialog.readOnly" :disabled="!isFormValid">{{ $t('button.save') }}</v-btn>
              <v-btn color="blue darken-1" text @click="close" v-if="security.writable && !dialog.readOnly">{{ $t('button.cancel') }}</v-btn>
              <v-btn color="blue darken-1" text @click="close" v-if="dialog.readOnly">{{ $t('button.close') }}</v-btn>
            </v-card-actions>
            
			</v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog.dialogDelete" max-width="700px">
          <v-card>
            <v-card-title class="text-h5">{{ $t('messages.deleteConfirm') }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">{{ $t('button.delete') }}</v-btn>
              <v-btn color="blue darken-1" text @click="closeDelete">{{ $t('button.cancel') }}</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.gender="{ item }">{{ $t(convertGender(item.gender)) }}</template>
    <template v-slot:item.realm="{ item }">{{ $t(convertRealm(item.realm)) }}</template>
    <template v-slot:item.group="{ item }">{{ $t(convertGroup(item.group)) }}</template>
    <template v-slot:item.status="{ item }">
    
      <v-tooltip right color="green">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="item.status==1" color="green" v-bind="attrs" v-on="on">mdi-check-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.enable') }}<br /></span>
      </v-tooltip>    
    
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="item.status==2" color="orange" v-bind="attrs" v-on="on">mdi-close-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.disable') }}<br /></span>
      </v-tooltip> 
      
      <v-tooltip right color="red">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="item.status==3" color="red" v-bind="attrs" v-on="on">mdi-minus-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.block') }}<br /></span>
      </v-tooltip> 
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="showItem(item)"   v-if="security.readable">mdi-eye</v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"   v-if="security.writable">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)" v-if="security.deletable && item.key!=1" >mdi-delete</v-icon>
      <v-icon small class="mr-2" disabled                  v-if="security.deletable && item.key==1" >mdi-delete-off</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" v-if="security.readable">{{ $t('button.update') }}</v-btn>
    </template>
  </v-data-table>
</div>



` ,  

    methods: {
      getRandomArbitrary: function(){
      	  min = Math.ceil(100);
      	  max = Math.floor(999);
      	  return Math.floor(Math.random() * (max - min) + min);
      },
  	  changeTab (tabIndex) {

  		  this.dialog.tabToShow=tabIndex;
  		  
  		  if (tabIndex==2) {
          	axios.get('/Casper/v1/settings/users/'+this.dialog.editedItem.key+this.getRandomArbitrary()+'/activity?limit=200', {
      		  headers: {
      		    'Authorization': 'Bearer '+getAuthToken()
      		  }
      		})
      		.then((res) => {
      			this.dialog.activities=res.data.element.actions;
      		})
      		.catch((error) => {
      			this.dialog.activities=[];
      		});
  		  }
  		  
      },
	  convertGender (gender) {
	  	for (const item of this.dialog.genderItems) {
		  if (item.key==gender) return item.value; 
		}
	  
      },
	  convertRealm (realm) {
	  	for (const item of this.dialog.realmItems) {
		  if (item.key==realm) return item.value; 
		}
      },
	  convertGroup (group) {
  	  	for (const item of this.dialog.groupItems) {
  		  if (item.key==group) return item.value; 
  		}
      },
	  convertStatus (status) {
	  	for (const item of this.dialog.statusItems) {
		  if (item.key==status) return item.value; 
		}
      },
	  initialize () {
            	this.dataItems=[];
            	axios.get('/Casper/v1/context/group', {
            		  headers: {
            		    'Authorization': 'Bearer '+getAuthToken()
            		  }
            		})
            		.then((res) => {
            			this.dialog.groupItems=res.data.context;
            		})
            		.catch((error) => { });
            	
            	axios.get('/Casper/v1/settings/users', {
            		  headers: {
            		    'Authorization': 'Bearer '+getAuthToken()
            		  }
            		})
            		.then((res) => {
            			this.errorMessage='';
            			this.dataItems=res.data.list;
            		})
            		.catch((error) => {
            			this.errorMessage=this.$t('errors.nodata');
            		});
            		
      },
      eventFilterItems: function(value){
          this.filterItems=value;
      },
      showItem (item, row) {
	      if (!this.dialog.dialogUpdate && !this.dialog.dialogDelete) {
		        this.dialog.readOnly = true;
		        this.dialog.editedIndex = this.dataItems.indexOf(item);
		        this.dialog.editedItem = Object.assign({}, item);
		    	this.dialog.tabToShow=1;
		    	this.dialog.tabIndex=0;
		        this.dialog.dialogUpdate = true;
	      }

      },
      editItem (item) {
        this.dialog.readOnly = false;
        this.dialog.editedIndex = this.dataItems.indexOf(item);
        this.dialog.editedItem = Object.assign({}, item);
    	this.dialog.tabToShow=1;
    	this.dialog.tabIndex=0;
        this.dialog.dialogUpdate = true;
      },

      deleteItem (item) {
        this.dialog.editedIndex = this.dataItems.indexOf(item)
        this.dialog.editedItem = Object.assign({}, item)
        this.dialog.dialogDelete = true
      },

      deleteItemConfirm () {
      
    	    axios.delete('/Casper/v1/settings/users',{ 
    	    	data: this.dialog.editedItem ,
    	    	headers: {'Authorization': 'Bearer '+getAuthToken()} 
    	    })
	  		.then((res) => {
    			this.errorMessage='';
		        this.dataItems.splice(this.dialog.editedIndex, 1)
		        this.closeDelete();
		        this.initialize();
	  		})
	  		.catch((error) => {
		        this.closeDelete();
    			this.errorMessage=this.$t('errors.delete');
    		});

      },

      close () {
    	this.errorPopin='';
        this.dialog.dialogUpdate = false;
        this.dialog.readOnly = false;
        this.$nextTick(() => {
          this.dialog.editedItem = Object.assign({}, this.dialog.defaultItem)
          this.dialog.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialog.dialogDelete = false
        this.$nextTick(() => {
          this.dialog.editedItem = Object.assign({}, this.dialog.defaultItem)
          this.dialog.editedIndex = -1
        })
      },

      concatModificationDate (item) {
        
        localDate = item.creationDate;
        
        if (item.modificationDate!=null) {
        	localDate = item.modificationDate;
        }
        
		return this.convertDate(localDate);
        
      },
      clickArn(item) {
    	  
		  let arnPrefix='';
		  let arnId='null';
		  
		  const myArray = item.arn.split(":");
		  if (myArray.length>=0) {
			  arnPrefix=myArray[0];
		  }
		  if (myArray.length>=1) {
			  arnId=myArray[1];
		  }
    	  
    	  const href = '#/'+arnPrefix;
    	  
    	  window.open(href+'/'+arnId+this.getRandomArbitrary(), '_blank');
    	  
      },
      showArn(item) {
    	  
		  let arnPrefix='';
		  let arnId='null';
		  
		  const myArray = item.arn.split(":");
		  if (myArray.length>=0) {
			  arnPrefix=myArray[0];
		  }
		  if (myArray.length>=1) {
			  arnId=myArray[1];
		  }

    		  if (item.arn.includes("Auth") || item.arn.includes("list") || arnId==='null' || item.type.includes("DELETE")) {
        		  return false;
    		  }
    		  else {
    			  return true;
    		 }
    	  
      },
      convertArn(item) {
    	  
		  let arnPrefix='';
		  let arnId='null';
		  let arnLabel='';
		  
		  const myArray = item.arn.split(":");
		  if (myArray.length>=0) {
			  arnPrefix=myArray[0];
		  }
		  if (myArray.length>=1) {
			  arnId=myArray[1];
		  }
		  if (myArray.length>=2) {
			  arnLabel=myArray[2];
		  }
		  
    	  if (item.arn.includes("Auth")) {
    		  return this.$t('arn.connexion');
    	  }
    	  else if (item.arn.includes("list")) {
    		  return this.$t('arn.search')+' '+this.$t('arn.'+arnPrefix);
    	  }
    	  else {
    		  if (arnId==='null') {
        		  return this.$t('arn.create')+' '+this.$t('arn.'+arnPrefix)+' '+arnLabel;
    		  }
    		  else if (item.type.includes("DELETE")) {
        		  return this.$t('arn.delete')+' '+this.$t('arn.'+arnPrefix)+' '+arnLabel;
    		  }
    		  else if (item.type.includes("GET")) {
        		  return this.$t('arn.detail') +' '+this.$t('arn.'+arnPrefix);
    		  }
    		  else {
        		  return this.$t('arn.update') +' '+this.$t('arn.'+arnPrefix);
    		  }
    	  }

      }, 
      convertDate(localDate) {
        
        var newDate = new Date();
		newDate.setTime(localDate);
		return newDate.toLocaleString();
        
      },      
      save () {
    	  
    	  if (this.dialog.editedItem.key>0) {
    	  
    	    axios.patch('/Casper/v1/settings/users', 
    	    	this.dialog.editedItem, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
    			this.errorPopin='';
	  	        if (this.dialog.editedIndex > -1) {
	  	          Object.assign(this.dataItems[this.dialog.editedIndex], this.dialog.editedItem)
	  	        } else {
	  	          this.dataItems.push(this.dialog.editedItem)
	  	        }
	  	        this.close()
		        this.initialize();
	  		})
	  		.catch((error) => {
    			this.errorPopin=this.$t('errors.update');
    		});
  		
    	  }
    	  else {
    	  
    	    axios.post('/Casper/v1/settings/users', 
    	    	this.dialog.editedItem, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
    			this.errorPopin='';
	  	        if (this.dialog.editedIndex > -1) {
	  	          Object.assign(this.dataItems[this.dialog.editedIndex], this.dialog.editedItem)
	  	        } else {
	  	          this.dataItems.push(this.dialog.editedItem)
	  	        }
	  	        this.close()
		        this.initialize();
	  		})
	  		.catch((error) => {
    			this.errorPopin=this.$t('errors.create');
    		});
    	  
    	  }
      },
    },
    beforeMount(){
    
    		privilege = localStorage.getItem(this.options.id);
    
            if (!isLoggedIn()) {
            	this.logout();
            }
            else if (privilege === null) {
            	this.errorMessage=this.$t('errors.rules');
            }
            else {
            
            	this.security.readable=(privilege>=1);
            	this.security.writable=(privilege>=2);
            	this.security.deletable=(privilege>=2);
            	this.security.extended=(privilege>=3);
            
            	if (!this.security.readable) {
            		this.errorMessage=this.$t('errors.rules');
            	}
            
            	this.initialize();

            }
        }
		});
