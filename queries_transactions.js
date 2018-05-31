db.transactions.find({},
		{
		  event:1,
		  event_count:1,
		  channel_type:1
		})

db.transactions.aggregate([
	{$match:{
	  	datetime:{
	  	$gt:ISODate("2018-05-30"),
	  	$lt:ISODate("2018-05-31")
	  		}
		}
	},
	{$group:{
			_id:{
		  account_name:"$account_name",
	account_id:"$account:id",  
  	type:"$type", 
  	channel_type:"$channel_type",
  	//sms_parts:"$sms_part",
  	event:"$event"
  	//event_count:"$event_count"
		  		},
		  		count:{$sum:
		  		  "$event_count"}
			}
	},
	{$sort:{
	  count:-1
	  	}
	}
	])

//seleccion de unicamente ciertas columnas.
db.transactions.find(
{}, 
{ 
	account_name:1,
	account_id:1,  
  	type:1, 
  	channel_type:1,
  	sms_parts:1,
  	event:1,
  	event_count:1
  	},
  

)

//el project me lo puedo ahorrar, porque lo unico que hace es que escoge esos 
//documentos/campos para el query
db.transactions.aggregate([
	{$project:{
	  	event:"$event",
	}
},
	{$group: {
	  _id: {
	    event: "$event",
	    count: {
	      $sum: 1
	      }
	    
	  }
	}
}
])



db.transactions.count({})
db.transactions.find({})


///Query flow 2

db.transactions.aggregate([
    {$match: {
        datetime: {$gt: ISODate('2018-05-29')}
    }},
    {$group: {
        _id: '$event',
        count: {$sum: 1}
    }}
])

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
	  	  	account_id: "$account_id",
	  	  	event: "$event",
	  	  	
	  	  		},
	  	  		  
			}
	},
	{$sort:{
	  		event:-1
	  		}
	}
	])
	
	
	//suma de evento por cuenta
db.transactions.aggregate([
	{$match:{
		datetime:{$gt: ISODate("2018-05-27")}
		}
	},
	{$group:{
	  	_id:{
	  	  account_id: "$account_id",
	  	  event: "$event",
	  	  count:{$sum:"$event" }
	  	  },
	  
	}}
	])