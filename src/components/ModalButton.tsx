import { Pressable, Text, TextStyle, ViewStyle } from "react-native"

export type ModalButtonProps = {
  style : ViewStyle,
  textStyle? : TextStyle,
  onPress : ()=>void,
  title: string
}

export const ModalButton = (props : any) =>{
  
    return(
      <Pressable style={props.style} onPress={() => props.onPress()} >
        <Text style={props.textStyle}>{props.title}</Text>
      </Pressable>
    )
  }