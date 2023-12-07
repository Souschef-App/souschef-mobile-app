import { Modal } from "../../../components/Modal"
import { HStack, ModalButton, VStack } from "../../../components"
import { Text, StyleSheet } from "react-native"
import { ButtonStyle, TextStyle, Theme } from "../../../styles"
import { useContext, useMemo } from "react"
import { ThemeContext } from "../../../contexts/AppContext"

export type RowItemProps = {
    index: number,
    styles: any,
    text: string
}

export const RowItem = ({index, text, styles} : RowItemProps) =>{
    return(
        <HStack mAll={{t: 10}} key={index}  style={styles.card} align="flex-start" justifyContent="center">
            <VStack flexMain={false} justifyContent="flex-start">
                <VStack style={styles.rowBadge} flexMain={false}>
                    <Text style={styles.badgeText}>{index + 1}</Text>
                </VStack>
            </VStack>
            <VStack align="flex-start" justifyContent="flex-start" pVH={{h: 10, v:0}} style={{width: "90%"}}>
                <Text style={styles.listText}>{text}</Text>
            </VStack>
        </HStack>
    )
}

export type ErrorModalProps = {
    isVisible: boolean,
    title: string,
    message: string,
    okFunc: ()=>void
}

export const ErrorModal = ({isVisible, title, message, okFunc}: ErrorModalProps) =>{

    const theme = useContext(ThemeContext);
    const styles = useMemo(() => makeStyles(theme), [theme]);
    
    return(
        <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header titleStyle={styles.title} title={title} />
          <Modal.Body>
            <Text style={styles.message}>{message}</Text>
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={15}>
              <ModalButton style={styles.okBTN}  textStyle={styles.okBTNText}  title="OK" onPress={okFunc} />
            </HStack>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    )
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    okBTN:{
        ...ButtonStyle.primary,
        minWidth: 100,
        backgroundColor: theme.colors.primary
    },
    okBTNText:{
        ...TextStyle.h2,
        fontWeight: "normal",
        color: "#fff",
    },
    title:{
        ...TextStyle.h2,
        color: theme.colors.danger
    },
    message:{
        ...TextStyle.body,
       textAlign: "center"
    }
})