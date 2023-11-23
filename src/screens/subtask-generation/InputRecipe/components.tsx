import { HStack, VStack } from "../../../components"
import { Text } from "react-native"

export type RowItemProps = {
    index: number,
    styles: any,
    text: string
}

export const RowItem = ({index, text, styles} : RowItemProps) =>{
    return(
        <HStack key={index}  style={styles.card} align="flex-start" justifyContent="center">
            <VStack flexMain={false} justifyContent="flex-start">
                <VStack style={styles.rowBadge} flexMain={false}>
                    <Text style={styles.badgeText}>{index + 1}</Text>
                </VStack>
            </VStack>
            <VStack align="flex-start" justifyContent="center" pVH={{h: 10, v:0}}>
                <Text style={styles.listText}>{text}</Text>
            </VStack>
        </HStack>
    )
}