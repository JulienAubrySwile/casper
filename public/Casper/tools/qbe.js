

var qbeCards = [
	{
		criteria:"qbe.criteria.product",
		key:0,
		htmlCode:'product',
		operators:["qbe.operators.equals"],
	},
	{
		criteria:"qbe.criteria.distributor",
		key:1,
		htmlCode:'distributor',
		operators:["qbe.operators.equals"],
	},
	{
		criteria:"qbe.criteria.offer",
		operators:["qbe.operators.equals"],
		key:2,
		htmlCode:'offer',
	},
	{
		criteria:"qbe.criteria.pan",
		operators:["qbe.operators.equals"],
		key:3,
		htmlCode:'pan',
	},
	{
		criteria:"qbe.criteria.contract",
		operators:["qbe.operators.equals"],
		key:4,
		htmlCode:'contract',
	},
	{
		criteria:"qbe.criteria.codeId",
		operators:["qbe.operators.equals"],
		key:5,
		htmlCode:'codeId',
	},
	{
		criteria:"qbe.criteria.holderRef",
		operators:["qbe.operators.equals","qbe.operators.start","qbe.operators.contains"],
		key:6,
		htmlCode:'holderRef',
	},
	{
		criteria:"qbe.criteria.status",
		operators:["qbe.operators.equals","qbe.operators.notequals"],
		key:7,
		htmlCode:'status',
		values:["qbe.values.building","qbe.values.waiting_building","qbe.values.shipped","qbe.values.activated","qbe.values.expired","qbe.values.blocked","qbe.values.irrev_blocked"],
	},
	{
		criteria:"commons.holder.lastname",
		operators:["qbe.operators.equals","qbe.operators.start","qbe.operators.contains"],
		key:8,
		htmlCode:'lastname',
	},
	{
		criteria:"commons.holder.firstname",
		operators:["qbe.operators.equals","qbe.operators.start","qbe.operators.contains"],
		key:9,
		htmlCode:'firstname',
	},
	{
		criteria:"qbe.criteria.visualRef",
		operators:["qbe.operators.equals"],
		key:10,
		htmlCode:'visualRef',
	},
	{
		criteria:"qbe.criteria.virtual",
		operators:["qbe.operators.equals"],
		key:11,
		htmlCode:'virtual',
		values:["qbe.values.virtual","qbe.values.physical"],
	},
	{
		criteria:"qbe.criteria.addPayment",
		operators:["qbe.operators.equals"],
		key:12,
		htmlCode:'addPayment',
		values:["qbe.values.on","qbe.values.off"],
	},
	{
		criteria:"qbe.criteria.accountRef",
		operators:["qbe.operators.equals","qbe.operators.start","qbe.operators.contains"],
		key:13,
		htmlCode:'accountRef',
	},
];
