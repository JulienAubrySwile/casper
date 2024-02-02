
const Rappro = Vue.component('Rappro', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
	        	defaultSize:18,
	        	id:61,
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
	        isFormValid:false,
	        search: '',
	    	errorMessage:'',
	    	errorPopin:'',
	        dataItems: [],
	        filterItems: [],
	        data: [
	        	{
	        		date:'1680617400391',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8200',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'8/10',
	        		nbAutos:'3',
	        		authorizedRappro:true,
	        		authorizedForce:false,
	        		status:0,
	        		delta:[{
	        			type: 'MCC',
	        			val1: '5411',
	        			val2: '5410',
	        		},{
	        			type: 'Bank code',
	        			val1: '16550',
	        			val2: '10207',
	        		},],
	        	},
	        	{
	        		date:'1680617400391',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8200',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'8/10',
	        		nbAutos:'3',
	        		authorizedRappro:true,
	        		authorizedForce:false,
	        		status:0,
	        		delta:[{
	        			type: 'MCC',
	        			val1: '5411',
	        			val2: '5410',
	        		},{
	        			type: 'Bank code',
	        			val1: '16550',
	        			val2: '10207',
	        		},],
	        	},
	        	{
	        		date:'1680617400391',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8200',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'8/10',
	        		nbAutos:'3',
	        		authorizedRappro:true,
	        		authorizedForce:false,
	        		status:0,
	        		delta:[{
	        			type: 'MCC',
	        			val1: '5411',
	        			val2: '5410',
	        		},{
	        			type: 'Bank code',
	        			val1: '16550',
	        			val2: '10207',
	        		},],
	        	},{
	        		date:'1680117440391',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8200',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'2/10',
	        		nbAutos:'25',
	        		authorizedRappro:false,
	        		authorizedForce:false,
	        		status:0,
	        		comments:'',
	        	},
	        	{
	        		date:'1680617400391',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8200',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'8/10',
	        		nbAutos:'3',
	        		authorizedRappro:true,
	        		authorizedForce:false,
	        		status:0,
	        		delta:[{
	        			type: 'MCC',
	        			val1: '5411',
	        			val2: '5410',
	        		},{
	        			type: 'Bank code',
	        			val1: '16550',
	        			val2: '10207',
	        		},],
	        	},
	        	{
	        		date:'1680617400391',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8200',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'8/10',
	        		nbAutos:'3',
	        		authorizedRappro:true,
	        		authorizedForce:false,
	        		status:0,
	        		delta:[{
	        			type: 'MCC',
	        			val1: '5411',
	        			val2: '5410',
	        		},{
	        			type: 'Bank code',
	        			val1: '16550',
	        			val2: '10207',
	        		},],
	        	},{
	        		date:'1680617440301',
	        		type:'Paiement',
	        		product:'Bimpli',
	        		pan:'4838-4502-0212-8202',
	        		originalAmount:2487,
	        		originalCurrency: '€',
	        		euroAmount:2487,
	        		validation:'',
	        		nbAutos:'0',
	        		authorizedRappro:false,
	        		authorizedForce:true,
	        		status:0,
	        		comments:'',
	        	}
	        ]

	    }
	},

    computed: {
        computedHeaders () {
          	return [
    		            { text: this.$t('commons.others.date') , 			align: 'center', value: 'date' },
    		            { text: this.$t('commons.rappro.type'), 			align: 'center', value: 'type' },
    		            { text: this.$t('commons.rappro.product'), 			align: 'center', value: 'product' },
    		            { text: this.$t('commons.rappro.pan'), 				align: 'center', value: 'pan' },
    		            { text: this.$t('commons.rappro.originalAmount'), 	align: 'center', value: 'originalAmount', },
    		            { text: this.$t('commons.rappro.euroAmount'), 		align: 'center', value: 'euroAmount', },
    		            { text: this.$t('commons.rappro.validation'), 		align: 'center', value: 'validation', },
    		            { text: this.$t('commons.rappro.nbAutos'), 			align: 'center', value: 'nbAutos', },
    		            { text: this.$t('commons.rappro.delta'), 			align: 'center', value: 'delta', },
    		            { text: '', 	align: 'center', value: 'extra',   sortable: false, width: '150px' },
    		            { text: '', 	align: 'center', value: 'actions', sortable: false, width: '50px' },
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

    template: `
    
<div id="listing">

  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
    	
  <v-data-table v-if="security.readable" :headers="computedHeaders" :items="dataItems" @current-items="eventFilterItems" :search="search" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :items-per-page="options.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.Rapprochements') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="Rapprochements" :data="filterItems"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.json" color=" darken-1" text ><vue-blob-json-csv file-type="json" file-name="Rapprochements" :data="filterItems"><v-icon>mdi-code-json</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" color=" darken-1" text @click="initialize" ><v-icon>mdi-refresh</v-icon></vue-blob-json-csv></v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog.dialogUpdate" max-width="900px" >
          <v-card>
			<v-form v-model="isFormValid">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
									
            </v-card-title>

            
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
        
      </v-toolbar>
      
      
      
    </template> 
      
      
    <template v-slot:item.date="{ item }">{{ convertDate(item.date) }}</template>
    <template v-slot:item.originalAmount="{ item }">{{ convertAmount(item.originalAmount) }} {{ item.originalCurrency }}</template>
    <template v-slot:item.euroAmount="{ item }">{{ convertAmount(item.euroAmount) }} €</template>
    <template v-slot:item.validation="{ item }">
		<v-chip v-if="item.validation" :color="item.authorizedRappro ? 'orange' : 'red'" dark >{{item.validation}}</v-chip>
    </template> 
    <template v-slot:item.nbAutos="{ item }">
    	<div v-if="item.nbAutos!=0">{{item.nbAutos}}</div>
		<v-chip v-if="item.nbAutos==0" color="green" dark >{{item.nbAutos}}</v-chip>
    </template> 
    <template v-slot:item.delta="{ item }">
		    <div v-for="(line, index) in item.delta">{{line.type}} : {{line.val1}}/{{line.val2}}</div>
    </template>   
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="showItem(item)"   v-if="security.readable">mdi-eye</v-icon>
    </template>    
    <template v-slot:item.extra="{ item }">
      <v-btn dense color="primary"  @click="link(item)" v-if="security.readable && item.authorizedRappro && item.status==0">{{ $t('button.rappro') }}</v-btn>
      <v-btn dense color="primary"  @click="link(item)" v-if="security.readable && item.authorizedRappro && item.status==1 "><v-icon small class="mr-2" >mdi-dots-horizontal</v-icon>&nbsp;{{ $t('button.rappro') }}</v-btn>
      <v-btn dense color="red"      @click="link(item)" v-if="security.readable && item.authorizedRappro && item.status==2 "><v-icon small class="mr-2" >mdi-alert-circle</v-icon>&nbsp;{{ $t('button.rappro') }}</v-btn>
      <v-btn dense color="green"    @click="link(item)" v-if="security.readable && item.authorizedRappro && item.status==3 "><v-icon small class="mr-2" >mdi-check-bold</v-icon>&nbsp;{{ $t('button.rappro') }}</v-btn>
      <v-btn dense color="primary"  @click="link(item)" v-if="security.readable && item.authorizedForce && item.status==0">{{ $t('button.force') }}</v-btn>
      <v-btn dense color="primary"  @click="link(item)" v-if="security.readable && item.authorizedForce && item.status==1 "><v-icon small class="mr-2" >mdi-dots-horizontal</v-icon>&nbsp;{{ $t('button.force') }}</v-btn>
      <v-btn dense color="red"      @click="link(item)" v-if="security.readable && item.authorizedForce && item.status==2 "><v-icon small class="mr-2" >mdi-alert-circle</v-icon>&nbsp;{{ $t('button.force') }}</v-btn>
      <v-btn dense color="green"    @click="link(item)" v-if="security.readable && item.authorizedForce && item.status==3 "><v-icon small class="mr-2" >mdi-check-bold</v-icon>&nbsp;{{ $t('button.force') }}</v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize" v-if="security.readable">{{ $t('button.update') }}</v-btn>
    </template>

  </v-data-table>	



	
</div>



` ,  

    methods: {
	  initialize () {
            	this.dataItems=this.data;
	
      },
      force (item) {
    	  item.status = Math.floor(1+Math.random() * 3);
      },
      link (item) {
    	  item.status = Math.floor(1+Math.random() * 3);
      },
      eventFilterItems: function(value){
          this.filterItems=value;
      },
      showItem (item, row) {

      },
      editItem (item) {
        this.dialog.readOnly = false
        this.dialog.editedIndex = this.dataItems.indexOf(item)
        this.dialog.editedItem = Object.assign({}, item)
        this.dialog.dialogUpdate = true
      },

      convertDate(localDate) {
          
          var newDate = new Date();
  		newDate.setTime(localDate);
  		return newDate.toLocaleString();
          
        },  
        convertAmount(amount) {
  		return (Math.round((amount/100) * 100) / 100).toFixed(2);
          
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
   
      save () {
    	  
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
            
            	if (!this.security.readable) {
            		this.errorMessage=this.$t('errors.rules');
            	}
            
            	this.initialize();

            }
        }
		});
