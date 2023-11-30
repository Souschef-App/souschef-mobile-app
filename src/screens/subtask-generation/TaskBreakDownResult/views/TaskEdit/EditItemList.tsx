import { Text, StyleSheet } from "react-native"
import { HStack, Divider, VStack, Button, Icon, IconButton } from "../../../../../components"
import { ButtonStyle, TextStyle, Theme } from "../../../../../styles"
import { PropsWithChildren, useContext, useMemo } from "react"
import { ThemeContext } from "../../../../../contexts/AppContext"
import { IconNames } from "../../../../../components/primitives/Icon"

// import { formatIngredientQuantity } from "../../../../../utils/format"

type EditItemListProps = {
  title : string,
  icon : IconNames,
  addFunc: () => void,
}

export const EditItemList = ({title, icon, addFunc, children } : PropsWithChildren<EditItemListProps>) => {

  const theme = useContext(ThemeContext);
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return(
    <VStack flexMain={false} flexCross={true}>
        <HStack >
          <HStack justifyContent="flex-start" colGap={16}>
            {icon && <Icon name={icon} color={theme.colors.primary} />}
            <Text style={styles.dropdownTitle}>{title}</Text>
          </HStack>
          <IconButton icon="plus" iconSize={24} onPress={()=>addFunc()} />
        </HStack>
      <HStack
        mAll={{ l: theme.spacing.s, r: theme.spacing.xs }}
        gap={theme.spacing.b}
        flexMain={false}
      >
        <Divider color={theme.colors.background2} />
        <VStack
          pVH={{ v: theme.spacing.s }}
          align="flex-start"
          gap={theme.spacing.b}
        >
          {children}
        </VStack>
      </HStack>
    </VStack>
  )
}

type EditRowItemProps = {
  onEdit : () => void,
  onDelete : () => void
}

export const EditRowItem = ({children, onDelete, onEdit} : PropsWithChildren<EditRowItemProps>) =>{

  const theme = useContext(ThemeContext);
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return(
    <HStack align="stretch">
      <Button style={styles.highlightEdit} onPress={onEdit}>
      {children}
      </Button>
      <IconButton icon="garbage" iconSize={24} color={theme.colors.danger} onPress={onDelete} />
    </HStack>
  )
}

const makeStyles = (theme: Theme) =>  
  StyleSheet.create({ 
    dropdownTitle: {
      ...TextStyle.h3,
      fontWeight: "bold",
    },
    highlightEdit:{
      ...ButtonStyle.editable,
      flexGrow: 1,
      backgroundColor: "#2F394A33",
    },
});
  