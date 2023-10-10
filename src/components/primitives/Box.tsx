import React, { type PropsWithChildren } from "react"
import { View, type FlexAlignType } from "react-native"

export interface ISpacingAll {
    b : number,
    t : number,
    l : number,
    r : number,
}

export class SpacingAll implements ISpacingAll
{
    b: number;
    t: number;
    l: number;
    r: number;

    constructor( b: number, t: number, l: number, r: number )
    {
        this.b = b
        this.t = t
        this.l = l
        this.r = r
    }
}

export interface BoxProps {
    style : any,
    "align" : FlexAlignType ,
    "justifyContent" : 'flex-start'
                        | 'flex-end'
                        | 'center'
                        | 'space-between'
                        | 'space-around'
                        | 'space-evenly'
                        | undefined;
    "m" : number,
    "p"  : number,
    "mall" : ISpacingAll,
    "pall" : ISpacingAll,
    "flexDirection" : "row" | "column" | "row-reverse" | "column-reverse" | undefined
}


export const Box = ({m, p, mall, pall, align, justifyContent, flexDirection, style, children} :  PropsWithChildren<BoxProps>) =>{
    
    return <View style={{
            alignItems: align,
            justifyContent: justifyContent,
            margin: m, 
            padding : p, 
            marginBottom : mall.b, 
            marginTop : mall.t,
            marginLeft: mall.l,
            marginRight: mall.r,
            paddingBottom : pall.t,
            paddingTop : pall.b, 
            paddingLeft: pall.r,
            paddingRight: pall.l,
            flexDirection: flexDirection,
            flex: 1,
            ...style,
        }}>
            {children}
        </View>
}
