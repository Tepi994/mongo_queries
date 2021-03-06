//Evento por cliente
db.transactions.aggregate([
	{$match:{
	  	datetime:{
	  	$gt:ISODate("2018-05-30"),
	  	$lt:ISODate("2018-05-31")
	  		},
	  	billable:true
		}
	},
	{$group:{
			_id:{
	account_uid:"$account_uid",		  
	account_name:"$account_name",
	account_id:"$account_id",  
  	type:"$type", 
  	channel_type:"$channel_type",
  	//sms_parts:"$sms_part",
  	event:"$event",
  	billing_cycle_date:"$billing_cycle_date"
  	//event_count:"$event_count"
		  		},
		  		count:{$sum:
		  		  "$event_count"}
			}
	},
	{$lookup:
	  { from:"account_balance",
	    localField:"_id.account_uid",
	    foreignField:"account_uid",
	    as: "balance"
		}
	  }
	,
	{$sort:{
	  count:-1
	  	}
	}
	])
	
	
	//
	db.transactions.find({})
	db.account_balance.find({})