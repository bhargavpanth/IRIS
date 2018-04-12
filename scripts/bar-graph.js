
    d3.select("input[value=\"total\"]").property("checked", true);

    var sepal_length = []
    var sepal_width = []
    var petal_length = []
    var petal_width = []
    var species = []

    var setosa_sepal_length = []
    var setosa_sepal_width = []
    var setosa_petal_length = []
    var setosa_petal_width = []

    var versicolor_sepal_length = []
    var versicolor_sepal_width = []
    var versicolor_petal_length = []
    var versicolor_petal_width = []
    
    var virginica_sepal_length = []
    var virginica_sepal_width = []
    var virginica_petal_length = []
    var virginica_petal_width = []

    var virginica = []
    var versicolor = []
    var setosa = []

    
    d3.csv("petal.csv", function(error, data) {

    	data.forEach(function(inst) {
    		sepal_length.push({lable: inst.species, value: +inst.sepalLength});
    		sepal_width.push({lable: inst.species, value: +inst.sepalWidth});
    		petal_length.push({lable: inst.species, value: +inst.petalLength});
    		petal_width.push({lable: inst.species, value: +inst.petalWidth});
    		// species.push(inst.species);
    		if (inst.species == 'virginica') {
    			// push for virginica
    			// virginica
    			virginica.push({label:"Sepal Length", value: +inst.sepalLength});
    			virginica.push({label: "Sepal Width", value: +inst.sepalWidth});
    			virginica.push({label: "Petal Length", value:+inst.petalLength});
    			virginica.push({label: "Petal Width", value: +inst.petalWidth});
    		} else if (inst.species == 'versicolor') {
    			// push for versicolor
    			// versicolor
    			versicolor.push({label:"Sepal Length", value: +inst.sepalLength});
    			versicolor.push({label: "Sepal Width", value: +inst.sepalWidth});
    			versicolor.push({label: "Petal Length", value:+inst.petalLength});
    			versicolor.push({label: "Petal Width", value: +inst.petalWidth});
    		} else if (inst.species == 'setosa') {
    			// push for setosa
    			// setosa
    			setosa.push({label:"Sepal Length", value: +inst.sepalLength});
    			setosa.push({label: "Sepal Width", value: +inst.sepalWidth});
    			setosa.push({label: "Petal Length", value:+inst.petalLength});
    			setosa.push({label: "Petal Width", value: +inst.petalWidth});
    		}
    	})
    });

    datasetTotal = virginica;
    datasetOption1 = versicolor;
    datasetOption2 = setosa;
 
    d3.selectAll("input").on("change", selectDataset);

    function selectDataset()
    {
        var value = this.value;
        if (value == "total")
        {
            change(datasetTotal);
        }
        else if (value == "option1")
        {
            change(datasetOption1);
        }
        else if (value == "option2")
        {
            change(datasetOption2);
        }
        else if (value == "option3")
        {
        	change(datasetOption3);
        }
    }

    var margin = {top: (parseInt(d3.select('body').style('height'), 10)/10), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/10), left: (parseInt(d3.select('body').style('width'), 10)/20)},
            width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
            height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

    var div = d3.select("body").append("div").attr("class", "toolTip");

    var formatPercent = d3.format("");

    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2, 0.5);

    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    change(datasetTotal);

    function change(dataset) {

        x.domain(dataset.map(function(d) { return d.label; }));
        y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.select(".y.axis").remove();
        svg.select(".x.axis").remove();

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Distribution %");

        var bar = svg.selectAll(".bar")
                .data(dataset, function(d) { return d.label; });
        // new data:
        bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.label); })
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", x.rangeBand());

        bar
                .on("mousemove", function(d){
                    div.style("left", d3.event.pageX+10+"px");
                    div.style("top", d3.event.pageY-25+"px");
                    div.style("display", "inline-block");
                    div.html((d.label)+"<br>"+(d.value)+"%");
                });
        bar
                .on("mouseout", function(d){
                    div.style("display", "none");
                });

        // removed data:
        bar.exit().remove();
        // updated data:
        bar
                .transition()
                .duration(750)
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); });
    };