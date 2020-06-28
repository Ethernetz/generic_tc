import { Visual } from "./visual";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionId = powerbi.extensibility.ISelectionId;


import { TilesCollection } from "./TilesCollection/TilesCollection";
import { Tile } from "./TilesCollection/Tile";
import powerbi from "powerbi-visuals-api";
import { TileData } from "./TilesCollection/TileData";


export class ShapesCollection extends TilesCollection{
    visual: Visual
    options: VisualUpdateOptions
    tilesData = <ShapeData[]>this.tilesData

    public createTile(i): Tile{
        return new Shape(this, i, this.tilesData, this.formatSettings)
    }
}

export class Shape extends Tile{
    collection = <ShapesCollection>this.collection
    tilesData = <ShapeData[]>this.tilesData
    visual: Visual = this.collection.visual
    

    onTileClick(){
        this.visual.selectionManager.select((<ShapeData>this.tileData).selectionId, false)
        this.visual.update(this.collection.options)
    }
}

export class ShapeData extends TileData{
    selectionId: ISelectionId
}

