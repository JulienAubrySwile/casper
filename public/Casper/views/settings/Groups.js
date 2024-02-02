
const Groups = Vue.component('Groups', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:32,
	        },
	    	security: {
		    	readable:false,
		    	writable:false,
		    	deletable:false,
	        },
            isFormValid:false,
    	    rules: {
    	        required: value => !!value || 'Required.',
    	    },
	        dialog: {
	        	readOnly: false,
		        dialogUpdate: false,
		        dialogDelete: false,
		        editedIndex: -1,
		        editedItem: {
		          label: '',
		        },
		        defaultItem: {
		        	label: '',
		        },
		        defaultRules: [],
		        statusItems: [
		          { value: 'lists.status.enable', key: 1 },
		          { value: 'lists.status.disable', key: 2 },
		          { value: 'lists.status.block', key: 3 },
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
	       	convert: ['mdi-lock','mdi-eye','mdi-pencil', 'mdi-cog',],

	    }
	},

    computed: {
      computedHeaders () {
      	return [
		            { text: this.$t('commons.others.ref'), 	align: 'center', value: 'label' },
		            { text: this.$t('commons.others.status'), 	align: 'center', value: 'status', },
		            { text: '', 	align: 'center', value: 'actions', sortable: false, width: '150px' },
		          ];
      },
      computedPermissions () {
      	return [this.$t('lists.permissions.no'), this.$t('lists.permissions.read'), this.$t('lists.permissions.write'), this.$t('lists.permissions.advanced')];
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
        val || this.close()
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
        <v-toolbar-title>{{ $t('title.Groups') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="groups" :data="filterItems"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.json" color=" darken-1" text ><vue-blob-json-csv file-type="json" file-name="groups" :data="filterItems"><v-icon>mdi-code-json</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" color=" darken-1" text @click="initialize" ><v-icon>mdi-refresh</v-icon></vue-blob-json-csv></v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog.dialogUpdate" max-width="900px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" v-if="security.writable">{{ $t('button.add') }}</v-btn>
          </template>
          <v-card>
			<v-form v-model="isFormValid">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>

            </v-card-title>
			
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="5" >
                    <v-text-field v-model="dialog.editedItem.label" :rules="[rules.required]" :label="$t('commons.others.ref')" :readonly="dialog.readOnly" ></v-text-field>
                  </v-col>
                  <v-col cols="30" sm="6" md="5" >
                  	<v-select v-model="dialog.editedItem.status" :rules="[rules.required]" :items="dialog.statusItems" item-value="key" :label="$t('commons.others.status')" :readonly="dialog.readOnly">
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
                </v-row>
              </v-container>
            </v-card-text>
            
            
      <v-card elevation="5" max-width="700" max-height="450" class="mx-auto" style="overflow-y: scroll !important; overflow-x: hidden;height: 405px;">
                  <v-card-title>{{$t('commons.security.rules')}}</v-card-title>
              <v-container>
                <v-row v-for="(item, index) in dialog.editedItem.rules" v-bind:key="item.key">
                  <v-col cols="12" sm="5" md="4">
                   {{$t(item.prefixLabel)}}/{{$t(item.label)}}
                  </v-col>
                  <v-col cols="12" sm="7" :md="item.maxRule*2" >
                   	<v-slider v-model="item.rule" @change="item.modified=true"
		  				:tick-labels="computedPermissions"
		  				:max="item.maxRule-1"
		  				step="1"
		  				dense
		  				hide-details
		  				:thumb-size="18"
		  				ticks="always"
		  				tick-size="4"
		  				:thumb-label="false"
		  				thumb-color="#1e88e5"
		  				color="#1e88e5"
		  				track-color="#E1F5FE"
		  				:disabled="dialog.readOnly"
						>		
				        
          			<template v-slot:thumb-label="{ value }">
              			<v-icon x-small>{{convert[value]}}</v-icon>
            		</template>				        				        
				             	
				</v-slider>
                  </v-col>
                </v-row>
              </v-container>




            </v-card>
            
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
      <v-icon small class="mr-2" @click="showItem(item)" v-if="security.readable">mdi-eye</v-icon>
      <v-icon small class="mr-2" @click="editItem(item)" v-if="security.writable">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)" v-if="security.deletable">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" v-if="security.readable">{{ $t('button.update') }}</v-btn>
    </template>

  </v-data-table>	



	
</div>



` ,  

    methods: {
	  convertStatus (status) {
	  	for (const item of this.dialog.statusItems) {
		  if (item.key==status) return item.value; 
		}
      },
	  initialize () {
            	this.dataItems=[];
            	
            	axios.get('/Casper/v1/context/rules', {
            		  headers: {
            		    'Authorization': 'Bearer '+getAuthToken()
            		  }
            		})
            		.then((res) => {
            			this.defaultRules=res.data.list;
            			this.dialog.defaultItem.rules=JSON.parse(JSON.stringify(this.defaultRules));
          				this.dialog.editedItem.rules=JSON.parse(JSON.stringify(this.defaultRules));
            		})
            		.catch((error) => { });
            	
            	
            	axios.get('/Casper/v1/settings/groups', {
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
		        this.dialog.readOnly = true
		        this.dialog.editedIndex = this.dataItems.indexOf(item)
		        this.dialog.editedItem = Object.assign({}, item)
		        this.dialog.dialogUpdate = true
	      }

      },
      editItem (item) {
        this.dialog.readOnly = false
        this.dialog.editedIndex = this.dataItems.indexOf(item)
        this.dialog.editedItem = Object.assign({}, item)
        this.dialog.dialogUpdate = true
      },

      deleteItem (item) {
        this.dialog.editedIndex = this.dataItems.indexOf(item)
        this.dialog.editedItem = Object.assign({}, item)
        this.dialog.dialogDelete = true
      },

      deleteItemConfirm () {
      
    	    axios.delete('/Casper/v1/settings/groups', { 
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
    			this.errorMessage=this.$t('errors.'+error.response.data.internalCode);
    		});

      },

      close () {
    	this.errorPopin='';
        this.dialog.dialogUpdate = false;
        this.dialog.readOnly = false;
        this.$nextTick(() => {
          this.dialog.editedItem = Object.assign({}, this.dialog.defaultItem);
          this.dialog.editedIndex = -1;
          this.dialog.defaultItem.rules=JSON.parse(JSON.stringify(this.defaultRules));
          this.dialog.editedItem.rules=JSON.parse(JSON.stringify(this.defaultRules));
        })

      },

      closeDelete () {
        this.dialog.dialogDelete = false
        this.$nextTick(() => {
          this.dialog.editedItem = Object.assign({}, this.dialog.defaultItem)
          this.dialog.editedIndex = -1;
          this.dialog.defaultItem.rules=JSON.parse(JSON.stringify(this.defaultRules));
          this.dialog.editedItem.rules=JSON.parse(JSON.stringify(this.defaultRules));
        })
      },

      concatModificationDate (item) {
        
        localDate = item.creationDate;
        
        if (item.modificationDate!=null) {
        	localDate = item.modificationDate;
        }
        
		return this.convertDate(localDate);
        
      },
      convertDate(localDate) {
        
        var newDate = new Date();
		newDate.setTime(localDate);
		return newDate.toLocaleString();
        
      },      
      save () {
    	  
    	  if (this.dialog.editedItem.key>0) {
    	  
    	    axios.patch('/Casper/v1/settings/groups', 
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
    	  
    	    axios.post('/Casper/v1/settings/groups', 
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
            
            	if (!this.security.readable) {
            		this.errorMessage=this.$t('errors.rules');
            	}
            
            	this.initialize();

            }
        }
		});
