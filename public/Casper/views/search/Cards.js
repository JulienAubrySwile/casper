
const Cards = Vue.component('Cards', {
	data: function () {
	    return {
	    	options: {
	        	id:53,
	        	timeout:15000,
		        events: {
		        	csv:true,
		        	json:false,
		        	refresh:true,
		        	defaultSize:5,
		        	showProcessing:false,
		        	search:'',
		        	filterItems:[],
		        },
		        soldes: {
		        	refresh:true,
		        	position:0,
		        	showProcessing:true,
		        },
		        interventions: {
		        	show:true,
		        	csv:true,
		        	json:false,
		        	refresh:true,
		        	defaultSize:30,
		        	search:'',
		        	filterItems:[],
		        },
		        contract: {
		        	showProcessing:true,
		        },
		        cards: {
		        	showProcessing:true,
			        panel:null,
		        },
	        },
	    	security: {
		    	readable:false,
		    	writable:false,
		    	deletable:false,
	        },	        
	        datatable: {
		        footerProps: {
		        	'disable-items-per-page':true,
		        	'items-per-page-text':'',
		        },
	        },
	        events: [],
	        soldes: [],
	        contract: {},
	        cards: [],
	    	errorMessage:'',
	    }
	},

    template: `
<div id="listing">
  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
  <table border="0" width="100%">
  
    	<tr>
    		<td width="34%" style="padding: 5px;">
    			<div class="loaderSoldes" v-if="options.soldes.showProcessing"></div>
				<div id="flou" :class="{ 'flou': options.soldes.showProcessing }">
    			<v-card color="#ffffff" min-height="160px"><v-card-title style="padding-bottom:4px">{{ $t('title.Soldes') }}</v-card-title>
<v-card-text>    			
<template>
  <div >
    <v-carousel height="160px" v-model="options.soldes.position" hide-delimiter-background show-arrows-on-hover nocycle  light>
     <template v-slot:prev="{ on, attrs }">
      <v-icon v-bind="attrs" color="#45abff" v-on="on">mdi-arrow-left-drop-circle</v-icon>
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-icon v-bind="attrs" color="#45abff" v-on="on">mdi-arrow-right-drop-circle</v-icon>
    </template>
      <v-carousel-item v-for="(solde, i) in soldes" :key="solde.key" >
        <v-sheet color="#ffffff" height="100%" tile >
          <v-row class="fill-height" align="center" justify="center" >

            
<table width="90%" border="0" style="color: rgba(0,0,0,.6) !important;">
<tbody>
<tr>
<td rowspan="4" width="40%" align="center">        
<h4>Apetiz {{solde.millesime}} </h4></br><h5>{{solde.account}}</h5>
</td>
<td width="40%"><b>{{ $t('commons.contract.realTimeBalance') }} : </b></td>
<td width="20%">{{convertAmount(solde.realTimeBalance)}}</td>
</tr>
<tr>
<td><b>{{ $t('commons.contract.financialTimeBalance') }} : </b></td>
<td>{{convertAmount(solde.financialTimeBalance)}}</td>
</tr>
<tr>
<td><b>{{ $t('commons.contract.compensation') }} : </b></td>
<td>{{convertAmount(solde.compensation)}}</td>
</tr>
<tr>
<td><b>{{ $t('commons.contract.encours') }} : </b></td>
<td>{{convertAmount(solde.encours)}}</td>
</tr>
</tbody>
</table>
            
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>    			
    			
    			</v-card-text>
    			</v-card>
    			</div>
    		</td>
    		<td width="66%" rowspan="2" style="padding: 5px;vertical-align: top;">

    		  	<div class="loaderCards" v-if="options.cards.showProcessing"></div>
				<div id="flou" :class="{ 'flou': options.cards.showProcessing }">
				
    			<v-card  color="#ffffff"  min-height="619px" max-height="619px" >
    			<div style="padding: 5px; height: 614px; overflow-y: scroll; ">
    			<template>
				  <v-expansion-panels dense focusable v-model="options.cards.panel" accordion style="width:100%">
				    <v-expansion-panel v-for="(item,i) in cards" :key="i" >
				      <v-expansion-panel-header>
				        <div style="max-width: 40px;">				        
				           <v-tooltip top color="white">
						      <template v-slot:activator="{ on, attrs }">
						    	<v-icon  class="mr-2" color="white" v-bind="attrs" v-on="on">mdi-credit-card</v-icon>
						      </template>
						      <span style="color:black"> {{ $t('commons.cards.pan') }}<br /></span>
					      </v-tooltip> 
				        </div>
				        <div>{{item.pan}}</div>
				        <div style="max-width: 40px;">				        
				           <v-tooltip top color="white">
						      <template v-slot:activator="{ on, attrs }">
						    	<v-icon  class="mr-2" color="white" v-bind="attrs" v-on="on">mdi-calendar-plus</v-icon>
						      </template>
						      <span style="color:black"> {{ $t('commons.cards.dcr') }}<br /></span>
					      </v-tooltip> 
				        </div>
				        <div>{{convertDate(item.dcr)}}</div>
				        <div style="max-width: 40px;">
				        	<v-tooltip top color="white">
						      <template v-slot:activator="{ on, attrs }">
						    	<v-icon  class="mr-2" color="white" v-bind="attrs" v-on="on">mdi-clock-end</v-icon>
						      </template>
						      <span style="color:black"> {{ $t('commons.cards.dlv') }}<br /></span>
					      </v-tooltip> 
					    </div>
				        <div>{{convertDlv(item.dlv)}} </div>
				      </v-expansion-panel-header>
				      <v-expansion-panel-content class="pa-1">
				        
				        <table border="0" width="100%">
  
				    	<tr>
				    		<td width="40%" style="padding: 1px;">
				    			<v-card min-height="230px" max-height="230px"><v-card-title>{{ $t('title.Card') }}</v-card-title>
				    			            <v-card-text style="padding-right: 0px;" >
              <v-container>
                <v-row >
                  <v-col cols="12" sm="5" md="5"  class="pa-1"><b>{{ $t('commons.cards.pan') }} : </b></v-col><v-col cols="12" sm="3" md="7"  class="pa-1">{{item.pan}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5"  class="pa-1"><b>{{ $t('commons.cards.dlv') }} : </b></v-col><v-col cols="12" sm="3" md="7"  class="pa-1">{{convertDlv(item.dlv)}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5"  class="pa-1"><b>{{ $t('commons.cards.dcr') }} : </b></v-col><v-col cols="12" sm="3" md="7"  class="pa-1">{{convertDate(item.dcr)}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5"  class="pa-1"><b>{{ $t('commons.cards.status') }} : </b></v-col><v-col cols="12" sm="3" md="7"  class="pa-1">

      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='waitingBuild'" color="orange" v-bind="attrs" v-on="on">mdi-cog-pause</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.waiting_building') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='building'" color="orange" v-bind="attrs" v-on="on">mdi-cog</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.building') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='shipped'" color="orange" v-bind="attrs" v-on="on">mdi-truck-check</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.shipped') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="green">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='activated'" color="green" v-bind="attrs" v-on="on">mdi-check-bold</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.activated') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="red">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='blocked'" color="red" v-bind="attrs" v-on="on">mdi-minus-circle</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.blocked') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="red">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='expired'" color="red" v-bind="attrs" v-on="on">mdi-clock-end</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.expired') }}<br /></span>
      </v-tooltip>      
      
                 </v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5"  class="pa-1"><b>{{ $t('commons.cards.virtual') }} : </b></v-col><v-col cols="12" sm="3" md="7"  class="pa-1">
                  
      <v-tooltip right color="green">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.virtual==true" color="green" v-bind="attrs" v-on="on">mdi-check-bold</v-icon>
	      </template>
	      <span> {{ $t('lists.answer.yes') }}<br /></span>
      </v-tooltip>                        	
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.virtual==false" color="orange" v-bind="attrs" v-on="on">mdi-close-thick</v-icon>
	      </template>
	      <span> {{ $t('lists.answer.no') }}<br /></span>
      </v-tooltip>                        	
                  	
                  	
                  	
                  </v-col>
                </v-row>
                </v-container>
                 </v-card-text>
				    			</v-card>
				    		</td>
				    		<td width="60%" rowspan="2" style="padding: 5px;vertical-align: top;">
				    			
    			<v-card min-height="230px" max-height="230px" >
    				<v-card-title>{{ $t('title.Interventions') }}</v-card-title>			    			
					<v-card-text >
						
	<v-data-table height="155px" :fixed-header="true" v-if="options.interventions.show" :headers="computedInterventionsHeaders" :items="item.interventions"  @current-items="interventionFilterItems" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :hide-default-footer="true" disable-pagination dense>
    <template v-slot:item.date="{ item }">{{ convertDate(item.date) }}</template>
    <template v-slot:item.type="{ item }">{{ $t('lists.typeInter.'+item.type) }}</template>
    <template v-slot:item.actions="{ item }"><v-icon small>mdi-magnify</v-icon></template>
    <template v-slot:no-data>
      {{$t('errors.emptydata')}}
    </template>

  </v-data-table>

  
  
					</v-card-text>
				</v-card>

	
  
				    			
				    		</td>
				        </tr>
				        </table>
				        
				      </v-expansion-panel-content>
				    </v-expansion-panel>
				  </v-expansion-panels>
				</template>
				</div>
    			</v-card>
    							</div>
    		</td>
    	</tr>
    	<tr>
    		<td style="padding: 5px;">
    		  	<div class="loaderContract" v-if="options.contract.showProcessing"></div>
				<div id="flou" :class="{ 'flou': options.contract.showProcessing }">
    			<v-card min-height="380px"><v-card-title>{{ $t('title.Contrat') }}</v-card-title>
    							    			
				<v-card-text>
              <v-container>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.num') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.numContract}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.product') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.libProduit}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.offer') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.libOffre}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.holder') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.libHolder}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.addPay') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">

      <v-tooltip right color="green" v-if="contract.addPaiement===true" >
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" color="green" v-bind="attrs" v-on="on">mdi-check-bold</v-icon> {{ $t('commons.contract.addPayMax') }} {{convertAmount(contract.addPaiementMax)}}
	      </template>
	      <span> {{ $t('lists.answer.yes') }}<br /></span>
      </v-tooltip>                        	
      <v-tooltip right color="orange" v-if="contract.addPaiement===false">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" color="orange" v-bind="attrs" v-on="on">mdi-close-thick</v-icon>
	      </template>
	      <span> {{ $t('lists.answer.no') }}<br /></span>
      </v-tooltip> 
                        
                  </v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.distrib') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.libReseau}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.structure') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.libStructure}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.matricule') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.matricule}}</v-col>
                </v-row>
                <v-row >
                  <v-col cols="12" sm="5" md="5" class="pa-1"><b>{{ $t('commons.contract.visual') }} : </b></v-col><v-col cols="12" sm="3" md="7" class="pa-1">{{contract.libVisuel}}</v-col>
                </v-row>
                </v-container>
                 </v-card-text>
				    			</v-card>
    			</div>
    		</td>
    	</tr>
    	<tr>
    		<td colspan="2" style="padding: 5px;">
    		<div>
				<div class="loaderEvents" v-if="options.events.showProcessing"></div>
				<div id="flou" :class="{ 'flou': options.events.showProcessing }">
  <v-data-table min-height="350px" dense :headers="computedEventsHeaders" :items="events"  @current-items="eventFilterItems" :search="options.events.search" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :hide-default-footer="false" :items-per-page="options.events.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.Events') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="options.events.search" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="options.events.search=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.events.csv" 		:disabled="events.length===0" color=" darken-1" text ><vue-blob-json-csv file-type="csv" 	file-name="events" :data="options.events.filterItems" ><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.events.json" 		:disabled="events.length===0" color=" darken-1" text ><vue-blob-json-csv file-type="json" 	file-name="events" :data="options.events.filterItems"><v-icon>mdi-code-json</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.events.refresh" 	color=" darken-1" text @click="consultEvents"  ><v-icon>mdi-refresh</v-icon></v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.date="{ item }">{{ convertDate(item.date) }}</template>
    <template v-slot:item.type="{ item }">{{ $t('lists.typeEvt.'+item.type) }}</template>
    <template v-slot:item.status="{ item }">{{ $t('lists.statusEvt.'+item.status) }}</template>
    <template v-slot:item.amount="{ item }">{{ convertAmount(item.amount) }} <div v-if="item.addAmount>0" style="color:blue">({{ convertAmount(item.addAmount) }})</div></template>
    <template v-slot:item.actions="{ item }"><v-icon small>mdi-magnify</v-icon></template>
    <template v-slot:no-data>
      {{$t('errors.emptydata')}}
    </template>

  </v-data-table>	    			
    			</div>
    			</div>
    		</td>
    	</tr>
  
  
  </table>
</div>  
` ,  

    methods: {
	  initialize () {
		  this.consultContrat();
		  this.consultEvents();
          this.consultCards();
		  this.consultSoldes();
      },
      updateInterventions () {
            		
      },
      consultCards () {
        	var param = this.$route.params.id.substring(0, this.$route.params.id.length-3);

    	  	this.options.cards.showProcessing=true;
  	  	axios.get('/Casper/v1/cards/'+param+'/cards', {
  			  headers: {
  			    'Authorization': 'Bearer '+getAuthToken()
  			  },
  			  timeout:this.options.timeout,
  			})
  			.then((res) => {
  	    	  	this.options.cards.showProcessing=false;
  				this.errorMessage='';
  				this.cards=res.data.list;
  				
  				for (let i = 0; i < this.cards.length; i++) {
  				  if (param===this.cards[i].arn) {
  					  this.options.cards.panel=i;
  				  }
  				}
  			})
  			.catch((error) => {
  	    	  	this.options.cards.showProcessing=false;
  				this.errorMessage=this.$t('errors.'+error.code);
  	    	  	this.cards=[];
  			}); 	
        },
      consultSoldes () {
        	var param = this.$route.params.id.substring(0, this.$route.params.id.length-3);

    	  	this.options.soldes.showProcessing=true;
  	  	axios.get('/Casper/v1/cards/'+param+'/soldes', {
  			  headers: {
  			    'Authorization': 'Bearer '+getAuthToken()
  			  },
  			  timeout:this.options.timeout,
  			})
  			.then((res) => {
  	    	  	this.options.soldes.showProcessing=false;
  				this.errorMessage='';
  				this.soldes=res.data.list;
  			})
  			.catch((error) => {
  	    	  	this.options.soldes.showProcessing=false;
  				this.errorMessage=this.$t('errors.'+error.code);
  	    	  	this.soldes=[];
  			}); 	
        },
      consultEvents () {
        	var param = this.$route.params.id.substring(0, this.$route.params.id.length-3);

  	  	this.options.events.showProcessing=true;
	  	axios.get('/Casper/v1/cards/'+param+'/events', {
			  headers: {
			    'Authorization': 'Bearer '+getAuthToken()
			  },
			  timeout:this.options.timeout,
			})
			.then((res) => {
	    	  	this.options.events.showProcessing=false;
				this.errorMessage='';
				this.events=res.data.list;
			})
			.catch((error) => {
	    	  	this.options.events.showProcessing=false;
				this.errorMessage=this.$t('errors.'+error.code);
	    	  	this.events=[];
			}); 	
      },
      consultContrat () {

      	var param = this.$route.params.id.substring(0, this.$route.params.id.length-3);

  	  	this.options.contract.showProcessing=true;
	  	axios.get('/Casper/v1/cards/'+param+'/contract', {
			  headers: {
			    'Authorization': 'Bearer '+getAuthToken()
			  },
			  timeout:this.options.timeout,
			})
			.then((res) => {
	    	  	this.options.contract.showProcessing=false;
				this.errorMessage='';
				this.contract=res.data.element;
			})
			.catch((error) => {
	    	  	this.options.options.showProcessing=false;
				this.errorMessage=this.$t('errors.'+error.code);
	    	  	this.contract={};
			}); 		
      },
      refreshSoldes () {
            		
      },
      eventFilterItems: function(value){
          this.options.events.filterItems=value;
      },
      interventionFilterItems: function(value){
          this.options.interventions.filterItems=value;
      },
      convertDate(localDate) {
          
          var newDate = new Date();
  		newDate.setTime(localDate);
  		return newDate.toLocaleString();
          
      }, 
      convertDlv(localDate) {
    	  
    	  
          var newDate = this.convertDate(localDate);
    	  
    	  return newDate.substring(3, 10);
          
      }, 
      convertAmount(amount) {
    	  if (amount==null) '';
    	  
    		return (Math.round((amount/100) * 100) / 100).toFixed(2)+' €';
            
          },
    },
    computed: {
        computedEventsHeaders () {
        	return [
              { text: this.$t('commons.events.date'), 		align: 'center', value: 'date', },
              { text: this.$t('commons.events.millesime'), 	align: 'center', value: 'millesime', },
              { text: this.$t('commons.events.type'), 		align: 'center', value: 'type', },
              { text: this.$t('commons.events.tsp') , 		align: 'center', value: 'tsp', },
              { text: this.$t('commons.events.label'), 		align: 'center', value: 'label' },
              { text: this.$t('commons.events.status'),		align: 'center', value: 'status' },
              { text: this.$t('commons.events.amount'), 		align: 'center', value: 'amount' },
              { text: this.$t('commons.events.numAuto'), 	align: 'center', value: 'numAuto'},
  		      { text: '', 	align: 'center', value: 'actions', sortable: false, width: '100px' },
  		          ];
        },
        computedInterventionsHeaders () {
        	return [
              { text: this.$t('commons.events.date'), 		align: 'center', value: 'date', },
              { text: this.$t('commons.events.type'), 		align: 'center', value: 'type', },
  		      { text: '', 	align: 'center', value: 'actions', sortable: false, width: '80px' },
  		          ];
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
