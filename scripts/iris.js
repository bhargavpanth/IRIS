d3.csv("../petal.csv", function (err, data) {
	if (!err)
		handleData(data);
});
// 
var 	setosaColor = 'rgba(255, 127, 14, 0.5)',
	versicolorColor = 'rgba(44, 160, 44, 0.7)',
	virginicaColor = 'rgba(31, 119, 180, 0.7)';

$('#setosa').css('background-color', setosaColor);
$('#versicolor').css('background-color', versicolorColor);
$('#virginica').css('background-color', virginicaColor);

function handleData(data) {
	var 	w = 400,
		h = 400,
		padding = {
			top: 20,
			right: 40,
			bottom: 50,
			left: 40
		};

	var xScale = d3.scale.linear()
		.domain([0, 
			d3.max(data, 
			function (d) {
				return Math.max(d.sepalLength, d.petalLength);
			})])
		.range([padding.left, w - padding.right]);

	var yScale = d3.scale.linear()
		.domain([0, 
			d3.max(data, 
			function (d) {
				return Math.max(d.sepalWidth, d.petalWidth);
			})])
		.range([h - padding.bottom, padding.top]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.ticks(8);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.ticks(5);

	var drawSpecies = function(svg, species, xParam, yParam, color) {
		svg.append('g').selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.filter(function (d) { return d.species === species; })
			.attr('cx', function (d) { return xScale(d[xParam]); })
			.attr('cy', function (d) { return yScale(d[yParam]);})
			.attr('r', 3.5)
			.style('fill', color);
	};

	var createScatterPlot = function (title, attr1, attr2) {
		var svg = d3.select('#plots')
		// .append('div#col-md-6')
		.append('svg')
		.attr('width', w)
		.attr('height', h);

		svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(0,' + (h - padding.bottom) + ')')
			.call(xAxis);

		svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(' + padding.left + ', 0)')
			.call(yAxis);

		svg.append('g')
			.attr('class', 'label')
			.append('text')
			.attr('class', 'xlabel')
			.attr('text-anchor', 'middle')
			.attr('x', w / 2)
			.attr('y', h - 10)
			.text("Length (cm)");

		svg.append('g')
			.attr('class', 'label')
			.append('text')
			.attr('class', 'xlabel')
			.attr('text-anchor', 'middle')
			.attr('x', - h / 2)
			.attr('y', 10)
			.attr('transform', 'rotate(-90)')
			.text("Width (cm)");

		svg.append('g')
			.append('text')
			.attr('class', 'title')
			.attr('text-anchor', 'middle')
			.attr('x', w / 2)
			.attr('y', 15)
			.text(title);

		drawSpecies(svg, "setosa", attr1, attr2, setosaColor);
		drawSpecies(svg, "versicolor", attr1, attr2, versicolorColor);
		drawSpecies(svg, "virginica", attr1, attr2, virginicaColor);
	};

	createScatterPlot("Sepal", "sepalLength", "sepalWidth");
	createScatterPlot("Petal", "petalLength", "petalWidth");
}

function transform() {
  return d3.zoomIdentity
      .translate(w / 2, h / 2)
      .scale(8)
      .translate(-point[0], -point[1]);
}