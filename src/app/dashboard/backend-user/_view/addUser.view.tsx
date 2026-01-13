import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription,  DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import BackendUserForm from '@/features/user/backendUsers/backendUser.form'

const AddUser = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <Plus strokeWidth={3} />
          Add User
        </Button>
      </DrawerTrigger>
      <DrawerContent className='px-5'>
        <div className="mx-auto w-full mb-10">
          <DrawerHeader className='my-5 p-0'>
            <DrawerTitle className="text-2xl font-bold">Add User</DrawerTitle>
            <DrawerDescription className="text-muted-foreground text-sm text-balance">Fill in the form below to add user</DrawerDescription>
          </DrawerHeader>
          <Separator className='mb-5' />
          <BackendUserForm onClose={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddUser
