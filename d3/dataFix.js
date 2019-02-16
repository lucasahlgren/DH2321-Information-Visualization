var q = d3.queue();

		
			d3.queue()
			.defer(d3.json, "world-110m.v1.json")
			.defer(d3.json, "life_expectancy_data.json")
			.defer(d3.json, "world_id.json")
			.await(function(error, world, life, id){
				if (error) throw error;
			
				// Put data into variables
				world_id = id
				life_expectancy = life

				console.log("READING DATA")
				console.log(world_id)
				console.log(life_expectancy)

				var newArray = [];
				var countryNum = [];
				for(var i=0;i<world_id.length;i++){
					//console.log(world_id[i])
					var country = life_expectancy.filter(count => count.country == world_id[i].name)
					console.log(country[0])
					countryNum.push(country[0])
					if(country[0]){
					var jsonobj = {
					 iso_n3: String(world_id[i].iso_n3),
					 iso_a2: world_id[i].iso_a2, 
					 name: world_id[i].name, 
					 country2: country[0].country,
					 wave1: {life: country[0].wave1}, 
					 wave2: {life: country[0].wave2}, 
					 wave3: {life: country[0].wave3}, 
					 wave4: {life: country[0].wave4}, 
					 }
				}
				else{
					var jsonobj = {
						iso_n3: String(world_id[i].iso_n3), 
						iso_a2: world_id[i].iso_a2, 
						name: world_id[i].name 
						}
				}

					//console.log(jsonobj)
					newArray.push(jsonobj)
				}
				console.log(countryNum)
				console.log(newArray)
