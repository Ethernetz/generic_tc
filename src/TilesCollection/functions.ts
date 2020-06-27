import { Tile } from "./Tile"

export function addFilters(defs: d3.Selection<d3.BaseType, any, any, any>, tile: Tile): void {
    console.log("adding filter and glow says", tile.formatSettings.effect.glow)
    let filter = defs.append("filter")
        .attr("id", "filter" + tile.i)
    if (tile.formatSettings.effect.shadow) {
        filter
            .append("feDropShadow")
            .attr("dx", tile.shadowDirectionCoords.x * tile.shadowDistance)
            .attr("dy", tile.shadowDirectionCoords.y * tile.shadowDistance)
            .attr("stdDeviation", tile.shadowStrength)
            .attr("flood-color", tile.shadowColor)
            .attr("flood-opacity", tile.shadowTransparency)
            .attr("result", "dropshadow")
    }

    if (tile.formatSettings.effect.glow) {
        filter
            .append("feDropShadow")
            .attr("dx", 0)
            .attr("dy", 0)
            .attr("stdDeviation", tile.glowStrength)
            .attr("flood-color", tile.glowColor)
            .attr("flood-opacity", tile.glowTransparency)
            .attr("result", "glow")

    }

    let feMerge = filter.append("feMerge")
    feMerge.append("feMergeNode").attr("in", "dropshadow")
    feMerge.append("feMergeNode").attr("in", "glow")
}