import { Component, OnInit, Input } from '@angular/core';
import { GraphNode } from 'src/app/objects/GraphNode';

@Component({
  selector: 'app-graph-item',
  templateUrl: './graph-item.component.html',
  styleUrls: ['./graph-item.component.css']
})
export class GraphItemComponent implements OnInit {
  @Input() node:GraphNode

  constructor() { }

  ngOnInit() 
  {

  }
  setClasses()
  {
    let classes = {
      butt: !this.node.open,
      'is-open': this.node.open,
      'is-finish': this.node.isFinish,
      'is-start': this.node.isStart,
      'is-visited': this.node.visited
    }
    return classes;
  }


  onToggle(node: GraphNode)
  {
    this.node.ToggleOpen();
    console.log(this.node.open);
  }
}
