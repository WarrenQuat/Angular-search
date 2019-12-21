import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { GraphNode } from '../../objects/GraphNode';
import * as Collections from 'typescript-collections';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  numNodes:number = 20;
  map:GraphNode[][] = new Array();
  graph:Collections.LinkedList<GraphNode>[];
  startR:number;
  startC:number;
  start:number;
  end:number;
  endC:number;
  endR:number;
  found:boolean = false;
  constructor() { }
 
  //create a new maze 
  ngOnInit() {
    var i:number;
    var j:number;

    for(i = 0; i < this.numNodes; i ++)
    {
      let temp:GraphNode[] = new Array();
      for(j = 0; j < this.numNodes; j++)
      {
        temp.push(new GraphNode(i,j));
      }
      this.map.push(temp);
    }
    console.log(this.map);
    this.generateFlags();
  
  }

  //generate the starting and endpoints
  generateFlags()
  {
    var i:number;
    var j:number;

    //set finish
    i = this.getRandomInt(this.numNodes);
    j = this.getRandomInt(this.numNodes);
    this.map[i][j].isFinish = true;
    this.map[i][j].open = true;
    this.endR = i;
    this.endC = j;

    //set start
    i = this.getRandomInt(this.numNodes);
    j = this.getRandomInt(this.numNodes);
    this.map[i][j].open = true;
    this.map[i][j].isStart = true;
    this.startR = i;
    this.startC = j;
  }

  getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
  }

  //convert the maze map into an adjacency list
  createGraph()
  {
    var vertex = this.numNodes * this.numNodes;
    this.graph = new Array(vertex);
    for(var i = 0; i < vertex; i++)
      this.graph[i] = new Collections.LinkedList<GraphNode>();

    for(var i = 0; i < this.numNodes; i++)
      for(var j = 0; j < this.numNodes; j++)
      {
        this.graph[(j + this.numNodes*i)].add(this.map[i][j]);

        if((i + 1) < this.numNodes && this.map[i + 1][j].open)
          this.graph[(j + this.numNodes*i)].add(this.map[i + 1][j]);

        if((i - 1) >= 0 && this.map[i -1][j].open)
          this.graph[(j + this.numNodes*i)].add(this.map[i-1][j]);

        if((j + 1) < this.numNodes && this.map[i][j + 1].open)
          this.graph[(j + this.numNodes*i)].add(this.map[i][j + 1]);

        if((j - 1) >= 0 && this.map[i][j - 1].open)
          this.graph[(j + this.numNodes*i)].add(this.map[i][j - 1]);
      }
      this.start = this.startC + (this.startR * this.numNodes);
      this.end = this.endC + (this.endR * this.numNodes);
      console.log(this.start)
      console.log(this.end);
  }


  runSearch()
  {
    this.createGraph();
    this.runSearchRec(this.start);
    console.log("done");
  }

  //dfs method 
  runSearchRec(r:number)
  {

        if(this.found)
          return;
        if(r != this.start)
          this.graph[r].elementAtIndex(0).visited = true;
        for(var i = 1; i < this.graph[r].size(); i ++)
        {
          if(!this.graph[r].elementAtIndex(i).visited)
          {
            var newRow = this.graph[r].elementAtIndex(i).col
                    + (this.graph[r].elementAtIndex(i).row * this.numNodes);

            if(newRow == this.end)
            {
              this.found = true;
              console.log("found");
              return;
            }
            this.runSearchRec(newRow);
        }
      }
  }

  // a * search method
  runASearch()
  {
    this.createGraph();
    var queue = new Collections.PriorityQueue<GraphNode>((a,b) => (b.g + b.h) - (a.g + a.h));
    this.graph[this.start].elementAtIndex(0).g = 0;
    this.graph[this.start].elementAtIndex(0).h 
        = this.calcHeuristic(this.graph[this.start].elementAtIndex(0));
    queue.add(this.graph[this.start].elementAtIndex(0));

    while(!queue.isEmpty())
    {
      var current= queue.dequeue();
      var newRow = current.col
                    + (current.row * this.numNodes);
      if(newRow != this.start)
        current.visited = true;

      for(var i = 1; i < this.graph[newRow].size(); i ++)
      {
        var temp = this.graph[newRow].elementAtIndex(i);
        if(!temp.visited)
        {
          var tempR = temp.col
              + (temp.row * this.numNodes);

          if(tempR == this.end)
            return;
          temp.h = this.calcHeuristic(temp);
          temp.g = current.g + 1;
          queue.add(temp);
        }
      }
  }
  }
 
  //calculate the heuristic value for a*
  //distance from current node to end node
  calcHeuristic(node:GraphNode)
  {
    return Math.abs(node.row - this.endR) + Math.abs(node.col - this.endC);
  }


  reset()
  {
    var graphNew:GraphNode[][] = new Array();
    var i:number, j:number;
    for(i = 0; i < this.numNodes; i ++)
    {
      let temp:GraphNode[] = new Array();
      for(j = 0; j < this.numNodes; j++)
      {
        temp.push(new GraphNode(i,j));
      }
      graphNew.push(temp);
    }
    this.map = graphNew;
    this.found = false;
    this.generateFlags();
  }

  random()
  {
    this.reset();
    var i:number;
    var j: number;

    for(i = 0; i < this.numNodes; i ++)
    {
      for(j = 0; j < this.numNodes; j ++)
      {
        var rand:number = this.getRandomInt(100);
        if(rand < 80)
          this.map[i][j].open = true;
      }
    }
  }
}
