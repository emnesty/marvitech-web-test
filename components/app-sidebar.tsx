"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  RiScanLine,
  RiSettings3Line,
  RiLeafLine,
  RiLogoutBoxLine,
  RiGroupLine,
  RiStoreLine,
  RiSmartphoneLine,
  RiHandbagLine,
  RiLayoutGrid2Line,
  RiBuildingLine,
  RiBarChartLine,
  RiLineChartLine,
  RiFileUserLine,
  RiQuestionLine,
} from "@remixicon/react";

// Dados de exemplo atualizados: apenas um time (MarvinTech)
const data = {
  teams: [{ name: "MarvinTech", logo: "/logo.png" }],
  navMain: [
    {
      title: "Início",
      url: "#",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: RiScanLine },
      ],
    },
    {
      title: "Cadastros",
      url: "#",
      items: [
        { title: "Usuários", url: "/users", icon: RiGroupLine },
        { title: "Lojas", url: "/stores", icon: RiStoreLine },
        { title: "Equipamentos", url: "/equipaments", icon: RiSmartphoneLine },
        { title: "Clientes", url: "/clients", icon: RiFileUserLine },
        { title: "Kit de Prêmios", url: "/kitprizes", icon: RiHandbagLine },
        { title: "Categorias", url: "/categories", icon: RiLayoutGrid2Line },
        { title: "Centros de Distribuição", url: "/cdds", icon: RiBuildingLine },
      ],
    },
    {
      title: "Financeiro",
      url: "#",
      items: [
        { title: "Fechamentos", url: "/closing", icon: RiBarChartLine },
        { title: "Balanços", url: "/statements", icon: RiLineChartLine },
      ],
    },
    {
      title: "Outros",
      url: "#",
      items: [
        { title: "Configurações", url: "/settings", icon: RiSettings3Line },
        { title: "Central de Ajuda", url: "/helpcenter", icon: RiQuestionLine },
      ],
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Obtém a rota atual
  // Garantimos que existe pelo menos um time
  const team = data.teams[0]!;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* Exibe o time fixo (MarvinTech) */}
        <div className="flex items-center gap-2 px-3 border-t">
          <img src={team.logo} alt={team.name} className="border-t border-border mx-2 -mt-px" />
          {/* <span className="font-medium">{team.name}</span> */}
        </div>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SearchForm className="mt-3" />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {group.items.map((item) => {
                  // Define ativo se o pathname bater exatamente com o URL do item.
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button font-medium gap-3 h-9 rounded-lg bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                        isActive={isActive}
                      >
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-lg bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
              <RiLogoutBoxLine
                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                size={22}
                aria-hidden="true"
              />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
