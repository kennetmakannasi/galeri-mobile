import { Menu, MenuButton, MenuItems } from '@headlessui/react'

export default function Dropdown({buttonContent, dropdownContent}) {
  return (
    <div>
      <Menu>
        <MenuButton onClick={close} className="p-1 rounded-full hover:bg-accent-dark-gray duration-150 transition-all">
          {buttonContent}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-auto rounded-lg border p-2 border-white bg-background-light-black 
          text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
            {dropdownContent}          
        </MenuItems>
      </Menu>
    </div>
  )
}