import { Visual } from "./visual";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionId = powerbi.extensibility.ISelectionId;


import { TilesCollection } from "./TilesCollection/TilesCollection";
import { Tile } from "./TilesCollection/Tile";
import powerbi from "powerbi-visuals-api";
import { TileData } from "./TilesCollection/TileData";


export class GenericsCollection extends TilesCollection{
    visual: Visual
    options: VisualUpdateOptions
    tilesData = <GenericeData[]>this.tilesData

    public createTile(i): Tile{
        return new Generic(this, i, this.tilesData, this.formatSettings)
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
}

export class GenericeData extends TileData{
    selectionId: ISelectionId
}

