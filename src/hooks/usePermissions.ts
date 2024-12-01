import { useMemo } from 'react'
import { ShoppingList } from '../types/types'
import { appStore } from '../store/appStore'
import { useStore } from '../store/useStore'

export const usePermissions = (shoppingList: ShoppingList) => {
  const user = useStore(appStore, 'user')
  const isOwner = useMemo(
    () => shoppingList.ownerId == user?.id,
    [shoppingList]
  )

  const isMember = useMemo(
    () => shoppingList.members.map((u) => u.id).includes(String(user?.id)),
    [shoppingList]
  )

  return {
    isOwner,
    isMember,
  }
}
