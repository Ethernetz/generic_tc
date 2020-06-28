import { Visual } from "./visual";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionId = powerbi.extensibility.ISelectionId;


import { TilesCollection } from "./TilesCollection/TilesCollection";
import { Tile } from "./TilesCollection/Tile";
import powerbi from "powerbi-visuals-api";
import { TileData } from "./TilesCollection/TileData";
import * as d3 from "d3";
import { Shape } from "./TilesCollection/shapes";
import { Handle } from "./interfaces";
import { select } from "d3";


export class GenericsCollection extends TilesCollection{
    visual: Visual
    options: VisualUpdateOptions
    tilesData = <GenericeData[]>this.tilesData

    public createTile(i): Tile{
        return new Generic(this, i, this.tilesData, this.formatSettings)
    }

    onShift(){

        let dragHandle = d3.drag()
            .on("start", (d: Handle) => {
                d.handleFocused = true
            })
            .on("drag", (d: Handle, i, n) => {
                d.z = d3.event[d.axis]
                select(n[i])
                    .attr(d.axis, d3.event[d.axis])
                    this.visual.update(this.options)
            })
            .on("end", (d: Handle) => {
                let object: powerbi.VisualObjectInstance = {
                    objectName: 'layout',
                    selector: undefined,
                    properties:
                        {}
                }
                object.properties[d.propName] = d.disp
                d.handleFocused = false
                this.visual.host.persistProperties({ merge: [object] })
            })

        if(this.visual.shiftFired)
            return
        this.visual.shiftFired = true
        console.log("shift pressed!")
        let firstCover = d3.select('.cover').filter((d, i) => { return i == 0 })
        let firstCoverData = firstCover.data()[0] as Generic
        console.log(firstCoverData)
        firstCover.data(firstCoverData.handles)
            .append('use')
            .attr("class", "handle")
            .attr("href", (d) => {
                return d.axis == "x" ?
                    "#handleHorizontal" :
                    "#handleVertical"
            })
            .attr("x", function (d) { return d.xPos })
            .attr("y", function (d) { return d.yPos })
            .call(dragHandle);
    }

    onShiftUp(){
        this.visual.shiftFired = false
        d3.select(".handle").remove()
        this.visual.update(this.options)
    }
    
}

export class Generic extends Tile{
    collection = <GenericsCollection>this.collection
    tilesData = <GenericeData[]>this.tilesData
    visual: Visual = this.collection.visual
    

    onTileClick(){
        this.visual.selectionManager.select((<GenericeData>this.tileData).selectionId, false)
        this.visual.update(this.collection.options)
    }

    onTileMouseover(){
        this.visual.hoveredIndex = this.i
        this.visual.update(this.collection.options)
    }
    onTileMouseout(){
        this.visual.hoveredIndex = null
        this.visual.update(this.collection.options)
    }
}

export class GenericeData extends TileData{
    selectionId: ISelectionId
}

