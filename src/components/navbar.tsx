import LogoutButton from "@/auth/components/button-loggout";
import { GithubIcon, Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
interface NavbarProps {
  pathname: string;
  nome: string;
}
export const Navbar = ({ pathname, nome }: NavbarProps) => {
  return (
    <NextUINavbar
      className="w-full max-w-7xl mx-auto"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-1 max-w-fit select-none">
          <Logo />
          <p
            className="font-bold text-inherit"
            style={{
              letterSpacing: "0.1rem",
            }}
          >
            ESCOLA SUPERNOVA
          </p>
        </NavbarBrand>
        {siteConfig.navItems.map((item) => (
          <NavbarItem className="hidden md:inline-block" key={item.href}>
            <Link
              key={item.href}
              href={item.href}
              className={`hover:underline ${
                pathname === item.href ? "text-blue-500" : "text-inherit"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <LogoutButton color="danger" />
        </NavbarItem>
        <NavbarItem className="hidden md:inline-block">
          Professor: {nome}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <NavbarMenuItem>Professor: {nome}</NavbarMenuItem>
            {siteConfig.navItems.map((item) => (
              <NavbarMenuItem key={item.href}>
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:underline ${
                    pathname === item.href ? "text-blue-500" : "text-inherit"
                  }`}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            <NavbarMenuItem>
              <LogoutButton color="danger" />
            </NavbarMenuItem>
          </div>
        </>
      </NavbarMenu>
    </NextUINavbar>
  );
};
