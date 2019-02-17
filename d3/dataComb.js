d3.queue()
.defer(d3.json, "data/WORK/WORK wave1.json")
.defer(d3.json, "data/FAMILY/FAMILY wave1.json")
.defer(d3.json, "data/LEISURE/LEISURE wave1.json")
.defer(d3.json, "data/POLITICS/POLITICS wave1.json")
.defer(d3.json, "data/HAPPINESS/HAPPINESS wave4.json")
.defer(d3.json, "data/FRIENDS/FRIENDS wave1.json")
.defer(d3.json, "data/RELIGION/RELIGION wave1.json")
.defer(d3.json, "data/HEALTH/HEALTH wave1.json")
.await(function(error, work1, fam1, lei1, pol1, happ1, fri1, reli1, heal1 ) {
    if (error) throw error;

    console.log(work1)
    console.log(fam1)
    console.log(lei1)
    console.log(pol1)
    console.log(happ1)
    console.log(fri1)
    console.log(reli1)
    console.log(heal1)

    for(var i = 0; i< work1.length; i++){
        console.log(work1[i])
    }

})