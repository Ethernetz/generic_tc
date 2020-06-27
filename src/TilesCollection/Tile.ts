import {Viewport} from './interfaces'
import {FormatSettings} from './FormatSettings'
import {TileData} from './TileData'
import {State, TileSizingType, TileLayoutType, AlignmentType, TileShape, Direction} from './enums'
import { Shape, Rectangle, Parallelogram, Chevron, Ellipse, Pentagon, Hexagon, Tab_RoundedCorners, Tab_CutCorners, Tab_CutCorner, ChevronVertical, ParallelogramVertical } from "../shapes"
export class Tile {
    i: number;
    tilesData: TileData[]
    formatSettings: FormatSettings;
    constructor(i, tilesData: TileData[], formatSettings: FormatSettings){
        this.i = i;
        this.tilesData = tilesData;
        this.formatSettings = formatSettings;
    }
    //Format Settings

    get viewport(): Viewport{
        return this.formatSettings.viewport 
    }
    get viewportWidth(): number {
        return this.viewport.width
    }
    get viewportHeight(): number {
        return this.viewport.height
    }
    get containerWidth(): number {
        return this.viewportWidth - this.effectSpace
    }
    get containerHeight(): number {
        return this.viewportHeight - this.effectSpace
    }
    
    get n(): number {
        return this.tilesData.length
    }
    get rowLength(): number {
        switch (this.formatSettings.layout.tileLayout) {
            case (TileLayoutType.horizontal):
                return this.n
            case (TileLayoutType.vertical):
                return 1
            case (TileLayoutType.grid):
                return Math.max(1, this.formatSettings.layout.rowLength)
        }
    }
    get numRows(): number {
        return Math.ceil(this.n / this.rowLength)
    }
    get tilesInRow(): number {
        return (this.numRows - 1) * this.rowLength > this.i || this.n % this.rowLength == 0 ? this.rowLength : this.n % this.rowLength
    }
    get rowNumber(): number {
        return Math.floor(this.i / this.rowLength)
    }
    get indexInRow(): number {
        return this.i % this.rowLength
    }


    


    get tileFill(): string {
        return this.getMatchingStateProperty(this.formatSettings.tile, 'color')
    }
    get tileFillOpacity(): number {
        return 1 - (this.getMatchingStateProperty(this.formatSettings.tile, 'transparency')) / 100
    }
    get tileStroke(): string {
        return this.getMatchingStateProperty(this.formatSettings.tile, 'stroke')
    }
    get tileStrokeWidth(): number {
        return this.getMatchingStateProperty(this.formatSettings.tile, 'strokeWidth')
    }
    get tilePadding(): number {
        return this.formatSettings.layout.padding
    }
    get tileHPadding(): number {
        return this.tilePadding + this.alterHorizontalPadding
    }
    get totalTileHPadding(): number {
        return this.tileHPadding * (this.rowLength - 1)
    }
    get tileVPadding(): number {
        return this.tilePadding 
        // + this.alterVerticalPadding
    }
    get totalTileVPadding(): number {
        return this.tileVPadding * (this.numRows - 1)
    }
    get tileWidth(): number {
        switch (this.formatSettings.layout.sizingMethod) {
            case TileSizingType.uniform:
                return (this.containerWidth - this.totalTileHPadding) / (this.rowLength)
            case TileSizingType.fixed:
                return this.formatSettings.layout.tileWidth
            // case TileSizingType.dynamic:
            //     let tileWidthScaleFactor = (this.inlineTextWidth / this.allTextWidth) * this.rowLength
            //     return ((this.containerWidth - this.tileHPadding * (this.rowLength - 1)) / (this.rowLength)) * tileWidthScaleFactor
        }
    }
    get tileHeight(): number {
        
        if(this.formatSettings.layout.sizingMethod == TileSizingType.fixed)
            return this.formatSettings.layout.tileHeight
        return (this.containerHeight - this.totalTileVPadding) / this.numRows

    }

    get tileXpos(): number {
        switch (this.formatSettings.layout.sizingMethod) {
            case TileSizingType.fixed:
                let areaTaken = this.tilesInRow * this.tileWidth + (this.tilesInRow - 1) * this.tileHPadding
                let areaRemaining = this.containerWidth - areaTaken
                switch (this.formatSettings.layout.tileAlignment) {
                    case AlignmentType.left:
                        return this.indexInRow * (this.tileWidth + this.tileHPadding) + this.effectSpace / 2
                    case AlignmentType.right:
                        return areaRemaining + this.indexInRow * (this.tileWidth + this.tileHPadding) + this.effectSpace / 2
                    case AlignmentType.center:
                        return areaRemaining / 2 + this.indexInRow * (this.tileWidth + this.tileHPadding) + this.effectSpace / 2

                }
            case TileSizingType.uniform:
                return this.indexInRow * (this.tileWidth + this.tileHPadding) + this.effectSpace / 2
            // case TileSizingType.dynamic:
            //     return this.widthSoFar + this.indexInRow * (this.tileHPadding) + this.effectSpace / 2
        }
    }
    get tileYpos(): number {
        return this.rowNumber * (this.tileHeight + this.tileVPadding) + this.effectSpace / 2
    }


    get tileShape(): TileShape {
        return this.formatSettings.layout.tileShape
    }
    get shape(): Shape {
        switch (this.tileShape) {
            case TileShape.rectangle:
                return new Rectangle(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.shapeRoundedCornerRadius)
            case TileShape.parallelogram:
                if (this.formatSettings.layout.tileLayout != TileLayoutType.vertical)
                    return new Parallelogram(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.parallelogramAngle, this.shapeRoundedCornerRadius)
                else
                    return new ParallelogramVertical(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.parallelogramAngle, this.shapeRoundedCornerRadius)
            case TileShape.chevron:
                if (this.formatSettings.layout.tileLayout != TileLayoutType.vertical)
                    return new Chevron(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.chevronAngle, this.shapeRoundedCornerRadius)
                else
                    return new ChevronVertical(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.chevronAngle, this.shapeRoundedCornerRadius)
            case TileShape.ellipse:
                return new Ellipse(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight)
            case TileShape.pentagon:
                return new Pentagon(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.pentagonAngle, this.shapeRoundedCornerRadius)
            case TileShape.hexagon:
                return new Hexagon(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.hexagonAngle, this.shapeRoundedCornerRadius)
            case TileShape.tab_roundedCorners:
                return new Tab_RoundedCorners(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight)
            case TileShape.tab_cutCorners:
                return new Tab_CutCorners(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.tab_cutCornersLength)
            case TileShape.tab_cutCorner:
                return new Tab_CutCorner(this.tileXpos, this.tileYpos, this.tileWidth, this.tileHeight, this.formatSettings.layout.tab_cutCornerLength)
        }
    }
    get shapePath(): string {
        return this.shape.shapePath
    }
    get shapeStrokePath(): string {
        return this.shape.strokePath
    }
    get alterHorizontalPadding(): number {
        switch (this.tileShape) {
            case TileShape.parallelogram:
                if (this.formatSettings.layout.tileLayout != TileLayoutType.vertical)
                    return Parallelogram.getAlterHPadding(this.tileHeight, this.formatSettings.layout.parallelogramAngle)
            case TileShape.chevron:
                if (this.formatSettings.layout.tileLayout != TileLayoutType.vertical)
                    return Chevron.getAlterHPadding(this.tileHeight, this.formatSettings.layout.chevronAngle)
            default:
                return Shape.getAlterHPadding(this.tileHeight, 0)
        }
    }
    get alterVerticalPadding(): number {
        return this.shape.alterVPadding
    }



    get shapeRoundedCornerRadius(): number{
        return 0
    }

    get effectSpace(): number {
        return Math.max(this.shadowSpace, this.glowSpace, this.tileStrokeWidth)
    }
    get filter(): string {
        return "url(#filter" + this.i + ")"
    }

    get shadow(): boolean{
        return this.formatSettings.effect.shadow
    }
    get shadowColor(): string {
        return this.getMatchingStateProperty(this.formatSettings.effect, 'shadowColor')
    }
    get shadowTransparency(): number {
        return 1 - this.getMatchingStateProperty(this.formatSettings.effect, 'shadowTransparency') / 100
    }
    get shadowDistance(): number {
        return this.getMatchingStateProperty(this.formatSettings.effect, 'shadowDistance')
    }
    get shadowMaxDistance(): number {
        return Math.max(this.formatSettings.effect.shadowDistanceS, this.formatSettings.effect.shadowDistanceU, this.formatSettings.effect.shadowDistanceH)
    }
    get shadowStrength(): number {
        return this.getMatchingStateProperty(this.formatSettings.effect, 'shadowStrength')
    }
    get shadowMaxStrength(): number {
        return Math.max(this.formatSettings.effect.shadowStrengthS, this.formatSettings.effect.shadowStrengthU, this.formatSettings.effect.shadowStrengthH)
    }
    get shadowDirection(): Direction {
        return this.getMatchingStateProperty(this.formatSettings.effect, 'shadowDirection')
    }
    get shadowDirectionCoords(): { x: number, y: number } {
        switch (this.shadowDirection) {
            case Direction.bottom_right: return { x: 1, y: 1 }
            case Direction.bottom: return { x: 0, y: 1 }
            case Direction.bottom_left: return { x: -1, y: 1 }
            case Direction.left: return { x: -1, y: 0 }
            case Direction.center: return { x: 0, y: 0 }
            case Direction.top_left: return { x: -1, y: -1 }
            case Direction.top: return { x: 0, y: -1 }
            case Direction.top_right: return { x: 1, y: -1 }
            case Direction.right: return { x: 1, y: 0 }
            case Direction.custom: return { x: 0, y: 0 }
        }
    }
    get shadowSpace(): number {
        return this.shadow ? 3 * (this.shadowMaxDistance + this.shadowMaxStrength) : 0
    }

    get glow(): boolean{
        return this.formatSettings.effect.glow
    }
    get glowColor(): string {
        return this.getMatchingStateProperty(this.formatSettings.effect, 'glowColor')
    }
    get glowTransparency(): number {
        return 1 - this.getMatchingStateProperty(this.formatSettings.effect, 'glowTransparency') / 100
    }
    get glowStrength(): number {
        return this.getMatchingStateProperty(this.formatSettings.effect, 'glowStrength')
    }
    get glowMaxStrength(): number {
        return Math.max(this.formatSettings.effect.glowStrengthS, this.formatSettings.effect.glowStrengthU, this.formatSettings.effect.glowStrengthH)
    }
    get glowSpace(): number {
        return this.formatSettings.effect.glow ? 3 * (this.glowMaxStrength) : 0
    }
    





    //Tile data
    get tileData(): TileData{
        return this.tilesData[this.i];
    }

    get isSelected(): boolean{
        return this.tileData.isSelected;
    }
    get isHovered(): boolean{
        return this.tileData.isHovered;
    }
    get currentState(): State {
        if(this.isSelected)
            return State.selected;
        else if (this.isHovered)
            return State.hovered;
        else
            return State.unselected;
    }



    //Functions
    getMatchingStateProperty(formatObj: any, propBase: string){
        switch(this.currentState){
            case State.selected:
                return formatObj[propBase + 'S']
            case State.unselected:
                return formatObj[propBase + 'U']
            case State.hovered:
                return formatObj[propBase + 'H']
        }
    }
    
}