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

export interface IBoxProps {
    style? : any,
    "align"? : FlexAlignType ,
    "justifyContent"? : 'flex-start'
                        | 'flex-end'
                        | 'center'
                        | 'space-between'
                        | 'space-around'
                        | 'space-evenly'
                        | undefined;
    "m"? : number,
    "p"?  : number,
    "mAll"? : ISpacingAll,
    "pAll"? : ISpacingAll,
    "flexDirection"? : "row" | "column" | "row-reverse" | "column-reverse" | undefined
}


const boxDefaultProps: IBoxProps = {
    align: 'center',
    justifyContent: 'center',
    m: 0,
    p: 0,
    mAll: {b : 0, t : 0, l : 0, r : 0},
    pAll:{b : 0, t : 0, l : 0, r : 0},
};
  
export const Box = (propsIn :  PropsWithChildren<IBoxProps>) =>{
    
    const props = {...boxDefaultProps, ...(propsIn as PropsWithChildren<IBoxProps>)};

    return <View style={{
            alignItems: props.align,
            justifyContent: props.justifyContent,
            margin: props.m, 
            padding : props.p, 
            marginBottom : props.mAll!.b, 
            marginTop : props.mAll!.t,
            marginLeft: props.mAll!.l,
            marginRight: props.mAll!.r,
            paddingBottom : props.pAll!.t,
            paddingTop : props.pAll!.b, 
            paddingLeft: props.pAll!.r,
            paddingRight: props.pAll!.l,
            flexDirection: props.flexDirection,
            flex: 1,
            ...props.style,
        }}>
            {props.children}
        </View>
}
