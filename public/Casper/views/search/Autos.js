
const Autos = Vue.component('Autos', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:51,
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
	    	search: {
		    	global:'',
		    	siret:'',
		    	numAuto:'',
		    	holder:'',
	        },
	    	errorMessage:'',
	        dataItems: [],
	        filterItems: [],

	    }
	},

    computed: {
      computedHeaders () {
      	return [
		            { text: this.$t('commons.transac.date') , 	align: 'center', value: 'dateServeur', },
		            { text: this.$t('commons.transac.card'), 	align: 'center', value: 'masquedPan' },
		            { text: this.$t('commons.transac.type'),	align: 'center', value: 'typeOperation' },
		            { text: this.$t('commons.transac.amount'), 	align: 'center', value: 'montant' },
		            { text: this.$t('commons.transac.numAuto'), 	align: 'center', value: 'numeroAuto', },
		            { text: this.$t('commons.transac.code'), 	align: 'center', value: 'codeRetour', },
		            { text: '', 	align: 'center', value: 'actions', sortable: false, width: '100px' },
		          ];
      },
      showPan (item) {
      
      	if (item.showPan===true) {      
			return item.pan;
      	}
      	else {   
			return item.masquedPan;
      	}

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
	        <v-card>
            <v-card-title>
              <span class="text-h7">{{$t('messages.advancedSearch')}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="2" >
                    <v-text-field v-model="search.date" :label="$t('commons.transac.date')"  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2" >
                    <v-text-field v-model="search.numAuto" :label="$t('commons.transac.numAuto')"  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2" >
                    <v-text-field v-model="search.siret" :label="$t('commons.transac.siret')"  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2" >
                    <v-text-field v-model="search.holder" :label="$t('commons.transac.holder')"  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2" >
                     <v-btn text @click="initialize" ><v-icon >mdi-magnify-expand</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>


<br/>
  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
    	
  <v-data-table v-if="security.readable" :headers="computedHeaders" :items="dataItems" @current-items="eventFilterItems" :search="search.global" locale="fr" @click:row="showItem"  class="elevation-1" :footer-props="datatable.footerProps" :items-per-page="options.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.DlcSous') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search.global" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search.global=''" ></v-text-field>
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
    <template v-slot:item.dateServeur="{ item }">{{ convertDate(item.dateServeur) }}</template>
    <template v-slot:item.montant="{ item }">{{ convertAmount(item.montant) }} €</template>
    <template v-slot:item.typeOperation="{ item }">{{ $t('lists.typeOpe.'+item.typeOperation) }}</template>
    <template v-slot:item.codeRetour="{ item }">{{ $t('lists.codeRetour.'+item.codeRetour) }}</template>
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
            	axios.get('/Casper/v1/transac/autos?numAuto='+this.search.numAuto+'&siret='+this.search.siret+'&holder='+this.search.holder+'&', {
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
      convertAmount(amount) {
		return (Math.round((amount/100) * 100) / 100).toFixed(2);
        
      },      

    },
    beforeMount(){
    
    		privilege = localStorage.getItem(this.options.id);
    
            if (!isLoggedIn()) {
            	this.logout();
            }
            else if (privilege === null) {
            	//todo ERROR
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
