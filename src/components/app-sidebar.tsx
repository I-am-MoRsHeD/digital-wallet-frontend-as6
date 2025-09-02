import * as React from "react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { getSidebarItems } from "@/utils/getSidebarItems";
import Logo from "@/assets/icons/Logo";
import { Link, useLocation } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const data = {
  navMain: getSidebarItems("USER")
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const { pathname } = useLocation();

  const role = userInfo?.role
    ? userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1).toLowerCase()
    : "";


  return (
    <Sidebar {...props}>
      <Link to='/'>
        <SidebarHeader>
          <div className="my-3 flex flex-row gap-3 items-center">
            <Logo />
            <h1 className="text-xl text-primary font-semibold">{role} Dashboard</h1>
          </div>
        </SidebarHeader>
      </Link>
      <SidebarContent>
        {data.navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-5">
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild
                      className={`py-6 text-base ${pathname === item.url ? "bg-primary text-white hover:bg-primary hover:text-white" : "hover:bg-primary hover:text-white"}`}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
