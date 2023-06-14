'use client'

import { Revision } from '@prisma/client'
import { Loader, MoreVertical, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'

interface DeleteRevisionProps {
  challengeId: string
  revisionId: string
}

async function deleteRevision ({ challengeId, revisionId } : DeleteRevisionProps) {
  const response = await fetch(`/api/challenge/${challengeId}/revision/${revisionId}`, {
    method: 'DELETE'
  })

  if (!response?.ok) {
    toast({
      title: 'Algo no ha ido como debería.',
      description: 'Tu revisión no ha sido eliminada. Por favor, inténtalo de nuevo.',
      variant: 'destructive'
    })
  }

  return true
}

interface Props {
  revision: Pick<Revision, 'id' | 'date' | 'challengeId'>
}

export function RevisionOperations ({ revision }: Props) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Abrir</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/challenge/${revision.challengeId}/revision/${revision.id}`} className="flex w-full">
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Seguro que quieres eliminar esta revisión?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteRevision({ challengeId: revision.challengeId, revisionId: revision.id })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading
                ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )
                : (
                  <Trash className="mr-2 h-4 w-4" />
                )}
              <span>Eliminar</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
