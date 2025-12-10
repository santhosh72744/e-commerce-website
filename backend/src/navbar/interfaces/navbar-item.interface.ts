export interface NavbarItem {
  id: string;
  title: string;
  href?: string;
  type?: 'link' | 'dropdown' | 'mega';
  order?: number;
  children?: NavbarItem[];
  visible?: boolean;
}
