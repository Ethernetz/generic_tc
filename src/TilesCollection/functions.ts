import {State} from './enums'
export function calculateWordDimensions(text: string, fontFamily: string, fontSize: string, widthType?: string, maxWidth?: string): { width: number, height: number } {
    var div = document.createElement('div');
    div.style.fontFamily = fontFamily
    div.style.fontSize = fontSize
    div.style.width = widthType
    div.style.maxWidth = maxWidth || 'none'
    div.style.whiteSpace = maxWidth ? "normal" : "nowrap"
    div.style.position = "absolute";
    div.innerHTML = text
    document.body.appendChild(div);
    var dimensions = {
        width: div.offsetWidth+1,
        height: div.offsetHeight
    }
    div.parentNode.removeChild(div);
    
    return dimensions;
}

export function getMatchingStateProperty(state: State, formatObj: any, propBase: string){
    switch(state){
        case State.selected:
            return formatObj[propBase + 'S']
        case State.unselected:
            return formatObj[propBase + 'U']
        case State.hovered:
            return formatObj[propBase + 'H']
    }
}



export function round(n, p?): number{
    let x = p ? Math.pow(10, p) : 100
    return Math.round(n*x) / x
}