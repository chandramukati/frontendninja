var Counter=(function(){
                    var counterObj={},
					count=0;					
					increment =function (){ 					       
							return ++count;			
					};
					
					counterObj.get=function(){ return count;};
					counterObj.increment=function(){  return increment(); };
					counterObj.reset=function(){  count=0; return count; };
                       return counterObj;                    
                     
					 }()
			 );