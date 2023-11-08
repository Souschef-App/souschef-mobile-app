import { Text } from "react-native"
import { Dropdown, HStack, Divider, VStack, Button } from "../../../components"
import { TextStyle } from "../../../styles"
import { formatIngredientQuantity } from "../../../utils/format"

export const EditDropdownList = ({title, icon, isOpen, setIsOpen, theme, items, styles, onEdit, isEditMode} : any) =>{

    return(
      <Button style={isEditMode ? styles.highlightEdit : null} onPress={() => onEdit()}>
        <Dropdown 
          title={title}
          icon={icon}
          iconColor={theme.colors.primary}
          isOpen={isOpen}
          onPress={() => setIsOpen(!setIsOpen)}
          textStyle={styles.dropdownTitle}
        >
          <HStack
            mAll={{ l: theme.spacing.s, r: theme.spacing.xs }}
            gap={theme.spacing.b}
          >
            <Divider color={theme.colors.background2} />
            <VStack
              pVH={{ v: theme.spacing.s }}
              align="flex-start"
              gap={theme.spacing.b}
            >
            {items.map((item : any, index : number) => (
                <HStack justifyContent="space-between" key={index}>
                  <Text style={TextStyle.h4}>{item.name}</Text>
                  <Text style={TextStyle.h4}>
                    {formatIngredientQuantity(item)}
                  </Text>
                </HStack>
              ))
            }
            </VStack>
          </HStack>
        </Dropdown>
      </Button>
    )
  }