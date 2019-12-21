

export class GraphNode
{
    visited:boolean;
    open:boolean;
    isFinish:boolean;
    isStart: boolean;
    row: number;
    col: number;
    g:number;
    h:number;
    parentX:number;
    parentY:number;

    constructor(row,col)
    {
        this.visited= false;
        this.open = false;
        this.isStart = false;
        this.isFinish = false;
        this.row = row;
        this.col = col;
        this.g = 1000000;
        this.h = 1000000;
    }

    ToggleOpen()
    {
        if (this.isFinish == false && this.isStart == false)
            this.open = !this.open;
    }
    compare(other:GraphNode)
    {
        if (this.h + this.g >= other.h + other.g)
            return 1;
        else
            return 0;
    }
}