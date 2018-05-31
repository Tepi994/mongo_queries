// tipos de evento por cuenta, para un periodo de tiempo, ordenado.
db.transactions.aggregate([
	{$match:{
		datetime:{
		  $gt: ISODate("2018-05-27"),
		  $lt: ISODate('2018-05-28')
		  }
		}
	},
	
	{$group:{
	  		_id:{
	  	  		account_uid: "$account_uid",
	  	  		event: "$event"
	  	  		},
	  	  	count: {$sum: 1} 
			}
	},
	 {$lookup:
     	{
       	from: "accounts",
       	localField: "_id.account_uid",
       	foreignField:"_id",
       	as: "account"
     	}
	 }
	,
	{$sort:{
	  		count:-1
	  		}
	}
	])
	
