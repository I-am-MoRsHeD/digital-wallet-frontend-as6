
import UserMenu from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Logo from "@/assets/icons/Logo"
import { ModeToggle } from "./ModeToggle"
import { Link, useLocation } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
]

export default function Navbar() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { pathname } = useLocation();

  return (
    <header className="container mx-auto border-b sticky top-1 z-50 bg-muted rounded-md px-2">
      <div className="flex h-16 items-center justify-between w-full gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <Logo />
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link to={link.href} className="py-1.5">
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
        {/* Main nav */}
        <Link to="/" className="text-primary hover:text-primary/90 hidden md:block">
          <Logo />
        </Link>
        {/* Navigation menu */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="flex flex-row gap-5">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className={`${pathname === link.href ? 'border-b-[2px] rounded border-primary' : "hover:border-b-[2px] hover:border-primary"}`}>
                <Link
                  to={link.href}
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  {link.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {
            userInfo?.role ? (
              <UserMenu />
            ) : <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          }
        </div>
      </div>
    </header>
  )
}
