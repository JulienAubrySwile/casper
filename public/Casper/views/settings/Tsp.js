
const Tsp = Vue.component('Tsp', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:13,
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
		          ref: '',
		        },
		        defaultItem: {
		        	ref: '',
		        },
	        },
	        datatable: {
		        footerProps: {
		        	'disable-items-per-page':true,
		        	'items-per-page-text':'',
		        },
	        },
		    showSpinner: false,
	        search: '',
	    	errorMessage:'',
	        filterItems: [],
	        dataItems: [],
	        exportFields: [
	        	'ref','lib','millesime','multiCompte','paiementCompl'
	        ],
	    }
	},

    computed: {
      computedHeaders () {
      	return [
		            { text: this.$t('commons.tsp.ref'), align: 'center', value: 'ref' },
		            { text: this.$t('commons.tsp.label'), align: 'center', value: 'lib' },
		            { text: '', 	align: 'center', value: 'actions', sortable: false, width: '150px' },
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
	    dialog: {
		      handler(newValue, oldValue) {
		      
		      },
		      deep: true
	    },
	    dialogUpdate: {
		      handler(newValue, oldValue) {
        		newValue || this.close()
		      },
	    },
	    dialogDelete: {
		      handler(newValue, oldValue) {
        		newValue || this.closeDelete()
		      },
	    },
  	},

    template: `
    
<div id="listing">

  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
    	
  <v-data-table v-if="security.readable" :headers="computedHeaders" :items="dataItems" @current-items="eventFilterItems" :search="search" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :items-per-page="options.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.Tsp') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="tsp" :data="filterItems" :fields="exportFields"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" color=" darken-1" text @click="initialize" ><v-icon>mdi-refresh</v-icon></vue-blob-json-csv></v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog.dialogUpdate" max-width="900px" >
          <v-card>
          	<v-form v-model="isFormValid">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="5" md="5" >
                    <v-text-field v-model="dialog.editedItem.ref" :label="$t('commons.tsp.ref')" :rules="[rules.required]" :readonly="dialog.readOnly" ></v-text-field>
                  </v-col>
                
                  <v-col cols="12" sm="5" md="5" >
                    <v-text-field v-model="dialog.editedItem.lib" :label="$t('commons.tsp.label')" :rules="[rules.required]" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" sm="2" md="4" >
                    <v-checkbox  v-model="dialog.editedItem.millesime" :label="$t('commons.tsp.vintage')" :readonly="dialog.readOnly"></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="2" md="4" >
                    <v-checkbox  v-model="dialog.editedItem.multiCompte" :label="$t('commons.tsp.multiAccount')" :readonly="dialog.readOnly"></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="2" md="4" >
                    <v-checkbox  v-model="dialog.editedItem.paiementCompl" :label="$t('commons.tsp.additionalPayment')" :readonly="dialog.readOnly"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            

    
            <v-card-actions>
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
    
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="showItem(item)"   v-if="security.readable">mdi-eye</v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"   v-if="security.writable">mdi-pencil</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" v-if="security.readable">{{ $t('button.update') }}</v-btn>
    </template>

  </v-data-table>	



	
</div>

` ,  

    methods: {
	  initialize () {
            	this.dataItems=[];
            	
            	axios.get('/Casper/v1/settings/tsp', {
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
      
    	    axios.delete('/Casper/v1/settings/tsp',{ 
    	    	data: this.dialog.editedItem ,
    	    	headers: {'Authorization': 'Bearer '+getAuthToken()} 
    	    })
	  		.then((res) => {
		        this.dataItems.splice(this.dialog.editedIndex, 1)
		        this.closeDelete();
		        this.initialize();
	  		})
	  		.catch((error) => { });

      },

      close () {
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
      save () {
    	  
    	  if (this.dialog.editedItem.key>0) {
    	  
    	    axios.patch('/Casper/v1/settings/tsp/', 
    	    	this.dialog.editedItem, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
	  	        if (this.dialog.editedIndex > -1) {
	  	          Object.assign(this.dataItems[this.dialog.editedIndex], this.dialog.editedItem)
	  	        } else {
	  	          this.dataItems.push(this.dialog.editedItem)
		        this.initialize();
	  	        }
	  	        this.close()
	  		})
	  		.catch((error) => { });
  		
    	  }
    	  else {
    	  
    	    axios.post('/Casper/v1/settings/tsp', 
    	    	this.dialog.editedItem, 
    	    	{ headers: {'Authorization': 'Bearer '+getAuthToken()} }
    	    )
	  		.then((res) => {
	  	        if (this.dialog.editedIndex > -1) {
	  	          Object.assign(this.dataItems[this.dialog.editedIndex], this.dialog.editedItem)
	  	        } else {
	  	          this.dataItems.push(this.dialog.editedItem)
		        this.initialize();
	  	        }
	  	        this.close()
	  		})
	  		.catch((error) => { });
    	  
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
