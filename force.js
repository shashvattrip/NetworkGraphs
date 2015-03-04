//defining the dimensions of the canvas layout
var width = 1000,
    height = 600;

//Determining the color of the node based on user defined 'groups'
var colorGroups = function(groupId) {
  switch(groupId) {
    case 1: return "green";
      break;
    case 2: return "blue";
      break;
    case 3: return "black";
      break;
    case 4: return "orange"
      break;
    case 5: return "gray";
      break;
    default: return "red";
  }
}

//Setting basic Directed Force Layout Configurations
var force = d3.layout.force()
    .charge(-120) //determins the amount of repulsion between the nodes
    .linkDistance(50) //sets the distance between adjacent nodes
    .size([width, height]);

var svg = d3.select("#canvasHere").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "auto");


//Fetching the source of the data
var graph = dataSource;

force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

//Defining properties of a 'link' i.e. edges
var link = svg.selectAll(".link")
    .data(graph.links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

//Defining the properties of a node or a datapoint
var node = svg.selectAll(".node")
    .data(graph.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .style("fill", function(d) { return colorGroups(d.group); })  //nodes can be colored dynamically based on user defined function
    .call(force.drag);

node.append("title")  //Shows the text when user hovers over a node
    .text(function(d) { return d.name; });

force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});
