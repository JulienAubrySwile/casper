
const DlcActiv = Vue.component('DlcActiv', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:42,
	        },
	    	security: {
		    	readable:false,
		    	writable:false,
	        },
	        dialog: {
	        	readOnly: false,
		        dialogUpdate: false,
		        editedIndex: -1,
		        editedItem: {
		        },
		        defaultItem: {
		        },
	        },
	        datatable: {
		        footerProps: {
		        	'disable-items-per-page':true,
		        	'items-per-page-text':'',
		        },
	        },
	        search: '',
	    	errorMessage:'',
	        dataItems: [],
	        filterItems: [],

	    }
	},

    computed: {
      computedHeaders () {
      	return [
		            { text: this.$t('commons.dlc.date') , 	align: 'center', value: 'date', },
		            { text: this.$t('commons.dlc.ref'), 	align: 'center', value: 'reference' },
		            { text: this.$t('commons.dlc.pages'),	align: 'center', value: 'pagination' },
		            { text: this.$t('commons.dlc.count'), 	align: 'center', value: 'nbOperation' },
		            { text: this.$t('commons.dlc.failed'), 	align: 'center', value: 'nbOperationKo', },
		            { text: this.$t('commons.dlc.format'), 	align: 'center', value: 'type', },
		            { text: this.$t('commons.dlc.status'), 	align: 'center', value: 'status', },
		            { text: '', 	align: 'center', value: 'actions', sortable: false, width: '100px' },
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
        val || this.close()
      },
    },

    template: `
    
<div id="listing">

  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
    	
  <v-data-table v-if="security.readable" :headers="computedHeaders" :items="dataItems" @current-items="eventFilterItems" :search="search" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :items-per-page="options.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.DlcActiv') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="users" :data="filterItems"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.json" color=" darken-1" text ><vue-blob-json-csv file-type="json" file-name="users" :data="filterItems"><v-icon>mdi-code-json</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" color=" darken-1" text @click="initialize" ><v-icon>mdi-refresh</v-icon></vue-blob-json-csv></v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog.dialogUpdate" max-width="900px" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" v-if="security.writable">{{ $t('button.add') }}</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="5" >
                    <v-text-field v-model="dialog.editedItem.nom" :label="$t('commons.holder.name')" :readonly="dialog.readOnly" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" >
                    <v-text-field v-model="dialog.editedItem.prenom" :label="$t('commons.holder.lastname')" :readonly="dialog.readOnly"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save" v-if="security.writable && !dialog.readOnly">{{ $t('button.save') }}</v-btn>
              <v-btn color="blue darken-1" text @click="close" >{{ $t('button.cancel') }}</v-btn>
            </v-card-actions>
            
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-icon small class="mr-2" v-if="item.status==1" color="red">mdi-alert</v-icon>
      <v-icon small class="mr-2" v-if="item.status==2" color="green">mdi-cog-play</v-icon>
      <v-icon small class="mr-2" v-if="item.status>2"  color="green">mdi-check-bold</v-icon>
    </template>
    <template v-slot:item.date="{ item }">{{ convertDate(item.date) }}</template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)" v-if="security.readable && !security.writable">mdi-eye</v-icon>
    </template>
    
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" v-if="security.readable">{{ $t('button.update') }}</v-btn>
    </template>

  </v-data-table>	



	
</div>



` ,  

    methods: {
	  initialize () {
            	axios.get('/Casper/v1/dlc/activations', {
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
	      if (!this.dialog.dialogUpdate) {
	            console.log('showItem');
		        this.dialog.readOnly = true
		        this.dialog.editedIndex = this.dataItems.indexOf(item)
		        this.dialog.editedItem = Object.assign({}, item)
		        this.dialog.dialogUpdate = true
	      }

      },

      close () {
        this.dialog.dialogUpdate = false
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
		return newDate.toLocaleString();
        
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
            
            	if (!this.security.readable) {
            		this.errorMessage=this.$t('errors.rules');
            	}
            
            	this.initialize();

            }
        }
		});
