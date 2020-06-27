import powerbi from "powerbi-visuals-api";

import IViewport = powerbi.IViewport;

import { FormatSettings } from './FormatSettings'
import { TileData } from './TileData'
import { Tile } from './Tile'

type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;
export class TilesCollection {
    formatSettings: FormatSettings;
    tilesData: TileData[] = [];
    viewport: IViewport;
    container: Selection<SVGElement>;
    
    public render(): void {
        console.log("rendering")
        this.formatSettings = new FormatSettings(this.viewport)


        let tiles: Tile[] = []
        
        for (let i = 0; i < this.tilesData.length; i++) {
            tiles.push(this.createTile(i))
        }
        
        // Do I need this
        this.container.selectAll(".tileContainer, .contentForeignObject, .cover").filter((d, i, nodes: Element[]) => {
            return !nodes[i].classList.contains(this.formatSettings.layout.tileShape)
        }).remove()

        let tileContainer = this.container.selectAll('.tileContainer').data(tiles)
        tileContainer.exit().remove()
        tileContainer = tileContainer.enter().append('g')
            .attr("class", function (d) { return "tileContainer " + d.tileShape  + d.tileData.text})
        tileContainer.append('path').attr("class", "fill")
        tileContainer.append('path').attr("class", "stroke")
        

        tileContainer = this.container.selectAll('.tileContainer').data(tiles)
        tileContainer.select(".fill")
            .attr("d", function (d) { return d.shapePath })
            .attr("fill", function (d) { return d.tileFill })
            .style("fill-opacity", function (d) { return d.tileFillOpacity })
            // .style("filter", function (d) { return d.filter })
        tileContainer.select(".stroke")
            .attr("d", function (d) { return d.shapeStrokePath })
            .style("fill-opacity", 0)
            .style("stroke", function (d) { return d.tileStroke })
            .style("stroke-width", function (d) { return d.tileStrokeWidth })






    }

    public createTile(i): Tile{
        return new Tile(i, this.tilesData, this.formatSettings)
    }

}


export class ShapesCollection extends TilesCollection{
    public createTile(i): Tile{
        return new Shape(i, this.tilesData, this.formatSettings)
    }
}

export class Shape extends Tile{
}

