/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

import * as enums from "./enums"


export class ButtonSettings {
  public state : enums.State = enums.State.all;
  
  public colorA: string = "";
  public colorS: string = "";
  public colorU: string = "";
  public colorDefault: string = "#fff"

  public strokeA: string = "";
  public strokeS: string = "";
  public strokeU: string = "";
  public strokeDefault: string = "#000"

  public strokeWidthA: number = null;
  public strokeWidthS: number = null;
  public strokeWidthU: number = null;
  public strokeWidthDefault: number = 2;

  public transparencyA: number = null;
  public transparencyS: number = null;
  public transparencyU: number = null;
  public transparencyDefault: number = 0;
}

export class TextSettings{
  public state : enums.State = enums.State.all;

  public colorA: string = "";
  public colorS: string = "";
  public colorU: string = "";
  public colorDefault: string = "#000"

  public alignmentA: enums.Align = enums.Align.center;
  public alignmentS: enums.Align = enums.Align.center;
  public alignmentU: enums.Align = enums.Align.center;

  public fontSizeA: number = null;
  public fontSizeS: number = null;
  public fontSizeU: number = null;
  public fontSizeDefault: number = 14;

  public fontFamilyA: string = "";
  public fontFamilyS: string = "";
  public fontFamilyU: string = "";
  public fontFamilyDefault: string = "wf_standard-font, helvetica, arial, sans-serif";

  public hmarginA: number = null;
  public hmarginS: number = null;
  public hmarginU: number = null;
  public hmarginDefault: number = 0;


  public vmarginA: number = null;
  public vmarginS: number = null;
  public vmarginU: number = null;
  public vmarginDefault: number = 0;
  
  public transparencyA: number = null;
  public transparencyS: number = null;
  public transparencyU: number = null;
  public transparencyDefault: number = 0;
 
}

export class IconSettings{
  public icons: boolean = false;
  public state : enums.State = enums.State.all;

  public placementA: enums.Icon_Placement = null;
  public placementS: enums.Icon_Placement = null;
  public placementU: enums.Icon_Placement = null;
  public placementDefault: enums.Icon_Placement = enums.Icon_Placement.left;

  public get currentPlacement(): enums.Icon_Placement{
    switch(this.state){
      case enums.State.all:
        return this.placementA
      case enums.State.selected:
        return this.placementS
      case enums.State.unselected:
        return this.placementU
    }
  }


  public widthA: number = null;
  public widthS: number = null;
  public widthU: number = null;
  public widthDefault: number = 40;



  public hmarginA: number = null;
  public hmarginS: number = null;
  public hmarginU: number = null;
  public hmarginDefault: number = 10;


  public paddingA: number = null;
  public paddingS: number = null;
  public paddingU: number = null;
  public paddingDefault: number = 10;
}

export class LayoutSettings{
  public sizingMethod: enums.Button_Sizing_Method = enums.Button_Sizing_Method.uniform;
  public buttonWidth: number = 150;
  public buttonHeight: number = 75;
  public buttonAlignment: enums.Align = enums.Align.left
  public buttonLayout: enums.Button_Layout = enums.Button_Layout.horizontal;
  public rowLength: number = 2;
  public padding: number = 10;
}

export class EffectsSettings{
  public shadow: boolean = false; 
}

export class VisualSettings extends DataViewObjectsParser {
  public button: ButtonSettings = new ButtonSettings();
  public text: TextSettings = new TextSettings();
  public icon: IconSettings = new IconSettings();
  public layout: LayoutSettings = new LayoutSettings();
  public effects: EffectsSettings = new EffectsSettings();
}