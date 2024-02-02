
const Signs = Vue.component('Signs', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:33,
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
		          reference: '',
		          expiration: Date.now(),
		        },
		        defaultItem: {
		        	reference: '',
		          expiration: Date.now(),
		        },
		        groupDistrib: [],
		        networkDistrib: [],
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
	        dataItems: [],
	        filterItems: [],
	        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toLocaleDateString(),
	        pickerDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

	    }
	},

    computed: {
      computedHeaders () {
      	return [
		            { text: this.$t('commons.signs.ref'), 	align: 'center', value: 'reference' },
		            { text: this.$t('commons.signs.keyFile'), align: 'center', value: 'nomFichier' },
		            { text: this.$t('commons.signs.debug'), align: 'center', value: 'debug' },
		            { text: this.$t('commons.signs.exp'), align: 'center', value: 'expiration' },
		            { text: this.$t('commons.signs.timeLimit'), align: 'center', value: 'delais' },
		            { text: this.$t('lists.status.enable'), align: 'center', value: 'actif' },
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
		      	if (newValue.editedItem.reference!=='') {
					this.pickerDate=(new Date(newValue.editedItem.expiration - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
					this.date=(new Date(newValue.editedItem.expiration - (new Date()).getTimezoneOffset() * 60000)).toLocaleDateString();
		      	}
		      },
		      deep: true
	    },
	    pickerDate: {
		      handler(newValue, oldValue) {
					
		      },
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
        <v-toolbar-title>{{ $t('title.Signs') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="signs" :data="filterItems"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" color=" darken-1" text @click="initialize" ><v-icon>mdi-refresh</v-icon></vue-blob-json-csv></v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog.dialogUpdate" max-width="900px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" v-if="security.writable" >{{ $t('button.add') }}</v-btn>
          </template>
          <v-card>
          	<v-form v-model="isFormValid">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="5" md="5" >
                    <v-text-field v-model="dialog.editedItem.reference" :label="$t('commons.signs.ref')" :rules="[rules.required]" :readonly="dialog.readOnly" ></v-text-field>
                  </v-col>
                </v-row>    
                <v-row>
                  <v-col cols="12" sm="5" md="5" >
                    <v-text-field v-model="dialog.editedItem.nomFichier" :label="$t('commons.signs.keyFile')" :rules="[rules.required]" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="2" md="2" >
                    <v-checkbox  v-model="dialog.editedItem.actif" :label="$t('lists.status.enable')" :readonly="dialog.readOnly"></v-checkbox>
                  </v-col>
                  
                  <v-col cols="12" sm="2" md="2" >
                    <v-checkbox  v-model="dialog.editedItem.debug" :label="$t('commons.signs.debug')" :readonly="dialog.readOnly"></v-checkbox>
                  </v-col>
                </v-row>
    			<v-row>
                  <v-col cols="12" sm="5" md="8" >
            <v-select style="z-index: 12"
              v-model="dialog.editedItem.groupes"
              :items="dialog.groupDistrib"
              attach
              item-value="key"
              item-text="value"
              chips
              :label="$t('commons.signs.groupDistrib')"
              :rules="[rules.required]"
              :readonly="dialog.readOnly"
              multiple >          
              </v-select>
              
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="3" >
                    
        <v-menu v-model="showSpinner" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              :label="$t('commons.signs.exp')"
              prepend-icon="mdi-calendar"
              :readonly="dialog.readOnly"
              hint="MM/DD/YYYY"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="pickerDate"
            color="#1e88e5"
            @input="dialog.editedItem.expiration=formatDate(pickerDate);date=new Date(pickerDate).toLocaleDateString(); showSpinner = false"
            :locale="$t('local')"
            :disabled="dialog.readOnly"
          ></v-date-picker>
        </v-menu>

                  </v-col>
                  <v-col cols="12" sm="6" md="3" >
                    <v-text-field v-model="dialog.editedItem.delais" :label="$t('commons.signs.timeLimit')" :rules="[rules.required]" :suffix="$t('commons.signs.timeLimitUnit')" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                </v-row>   
              </v-container>
            </v-card-text>

    		<br/>
    		<br/>
    		<br/>
    		<br/>

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
    <template v-slot:item.expiration="{ item }">{{convertDate(item.expiration)}}</template>
    <template v-slot:item.delais="{ item }">{{item.delais}} sec</template>
    <template v-slot:item.actif="{ item }">
    
      <v-tooltip right color="green">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="item.actif" color="green" v-bind="attrs" v-on="on">mdi-check-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.enable') }}<br /></span>
      </v-tooltip>    
    
      <v-tooltip right color="red">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="!item.actif" color="red" v-bind="attrs" v-on="on">mdi-minus-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.block') }}<br /></span>
      </v-tooltip>

    </template>
    <template v-slot:item.debug="{ item }">
    
      <v-tooltip right color="green">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="item.debug" color="green" v-bind="attrs" v-on="on">mdi-check-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.enabled') }}<br /></span>
      </v-tooltip>    
    
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon class="mr-2" v-if="!item.debug" color="orange" v-bind="attrs" v-on="on">mdi-close-circle</v-icon>
	      </template>
	      <span> {{ $t('lists.status.disabled') }}<br /></span>
      </v-tooltip> 
      
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="showItem(item)"   v-if="security.readable">mdi-eye</v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"   v-if="security.writable">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)" v-if="security.deletable">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" v-if="security.readable">{{ $t('button.update') }}</v-btn>
    </template>

  </v-data-table>	



	
</div>

` ,  

    methods: {
	    formatDate (date) {
	      if (!date) return null;
	      return new Date(date).getTime();
	    },
	  initialize () {
            	this.dataItems=[];
            	
            	   axios.get('/Casper/v1/context/groupDistrib', {
            		  headers: {
            		    'Authorization': 'Bearer '+getAuthToken()
            		  }
            		})
            		.then((res) => {
            			this.dialog.groupDistrib=res.data.list;
            		})
            		.catch((error) => { });
            	
            	axios.get('/Casper/v1/settings/signs', {
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
      parseDate (date) {
	      if (!date) return null
	
	      const [day,month, year] = date.split('/')
	      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
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
      
    	    axios.delete('/Casper/v1/settings/signs',{ 
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
		return newDate.toLocaleDateString();
      },      
      save () {
    	  
    	  if (this.dialog.editedItem.key>0) {
    	  
    	    axios.patch('/Casper/v1/settings/signs/', 
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
    	  
    	    axios.post('/Casper/v1/settings/signs', 
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
