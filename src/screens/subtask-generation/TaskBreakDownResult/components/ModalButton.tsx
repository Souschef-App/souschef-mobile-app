import { Pressable, Text } from "react-native"

export const ModalButton = (props : any) =>{
  
    return(
      <Pressable style={props.style} onPress={() => props.onPress()} >
        <Text>{props.title}</Text>
      </Pressable>
    )
  }