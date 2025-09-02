import {
  LogOutIcon,
} from "lucide-react"
import No_profile_image from "@/assets/images/no_profil;e.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";

export default function UserMenu() {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await logout(null);
    toast.success(res?.data?.message as string);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="bg-foreground">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>
              <img src={No_profile_image} alt="" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {userInfo?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
           {userInfo?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userInfo?.role && (
          <Link to={`${userInfo?.role.toLowerCase()}/dashboard`}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Dashboard</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </Link>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
