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
    "mall"? : ISpacingAll,
    "pall"? : ISpacingAll,
    "flexDirection"? : "row" | "column" | "row-reverse" | "column-reverse" | undefined
}


const boxDefaultProps: IBoxProps = {
    align: 'center',
    justifyContent: 'center',
    m: 0,
    p: 0,
};
  
export const Box = (propsIn :  PropsWithChildren<IBoxProps>) =>{
    
    const props = {...boxDefaultProps, ...(propsIn as PropsWithChildren<IBoxProps>)};

    return <View style={{
            alignItems: props.align,
            justifyContent: props.justifyContent,
            margin: props.m, 
            padding : props.p, 
            marginBottom : props.mall!.b, 
            marginTop : props.mall!.t,
            marginLeft: props.mall!.l,
            marginRight: props.mall!.r,
            paddingBottom : props.pall!.t,
            paddingTop : props.pall!.b, 
            paddingLeft: props.pall!.r,
            paddingRight: props.pall!.l,
            flexDirection: props.flexDirection,
            flex: 1,
            ...props.style,
        }}>
            {props.children}
        </View>
}
