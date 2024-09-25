export interface MenuItem {
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
  collapsed?: boolean;
  role?: any;
}

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Home',
    link: '',
    isTitle: true,
    icon: 'bi-house-fill',
    role: ['ADMIN', 'MEMBER'],
  },
  {
    id: 2,
    label: 'My profile',
    link: '/my-profile',
    isTitle: true,
    icon: 'bi-house-fill',
    role: ['ADMIN'],
  },
  {
    id: 3,
    label: 'Category Management',
    icon: 'bi-house-fill',
    isTitle: true,
    collapsed: true,
    subItems: [
      {
        id: 4,
        label: 'e-cate Category',
        link: '/category',
        icon: 'bi-house-fill',
        parentId: 3,
        role: ['ADMIN'],
      },
      {
        id: 5,
        label: 'Insurance Company',
        link: '/insurance',
        icon: 'bi-house-fill',
        parentId: 3,
        role: ['ADMIN'],
      },
      {
        id: 6,
        label: 'Registered',
        link: '/registered',
        icon: 'bi-house-fill',
        parentId: 3,
        role: ['ADMIN'],
      },
      {
        id: 7,
        label: 'Owner ID Type',
        link: '/owner',
        icon: 'bi-house-fill',
        parentId: 3,
        role: ['ADMIN'],
      },
      {
        id: 8,
        label: 'Products',
        link: '/product',
        icon: 'bi-house-fill',
        parentId: 3,
        role: ['ADMIN'],
      },
    ],
  },
  {
    id: 9,
    label: 'License Management',
    icon: 'bi-house-fill',
    isTitle: true,
    collapsed: true,
    subItems: [
      {
        id: 10,
        label: 'License',
        link: '/license',
        icon: 'bi-house-fill',
        parentId: 9,
        role: ['ADMIN'],
      },
      {
        id: 11,
        label: 'Registration',
        link: '/registration',
        icon: 'bi-house-fill',
        parentId: 9,
        role: ['ADMIN', 'MEMBER'],
      },
    ],
  },
  {
    id: 12,
    label: 'Data System',
    icon: 'bi-house-fill',
    isTitle: true,
    collapsed: true,
    subItems: [
      {
        id: 13,
        label: 'Document Lists',
        link: '/document',
        icon: 'bi-house-fill',
        parentId: 12,
        role: ['ADMIN'],
      },
      {
        id: 14,
        label: 'Quotations',
        link: '/quotation',
        icon: 'bi-house-fill',
        parentId: 12,
        role: ['ADMIN'],
      },
      {
        id: 15,
        label: 'Policies',
        link: '/policie',
        icon: 'bi-house-fill',
        parentId: 12,
        role: ['ADMIN'],
      },
      {
        id: 16,
        label: 'Claims',
        link: '/claim',
        icon: 'bi-house-fill',
        parentId: 12,
        role: ['ADMIN'],
      },
      {
        id: 17,
        label: 'Template Settings',
        link: '/template',
        icon: 'bi-house-fill',
        parentId: 12,
        role: ['ADMIN'],
      },
      {
        id: 18,
        label: 'File Storages',
        link: '/file-storage',
        icon: 'bi-house-fill',
        parentId: 12,
        role: ['ADMIN'],
      },
    ],
  },
  {
    id: 19,
    label: 'Admin Management',
    icon: 'bi-house-fill',
    isTitle: true,
    collapsed: true,
    subItems: [
      {
        id: 20,
        label: 'System Settings',
        link: '/system-setting',
        icon: 'bi-house-fill',
        parentId: 19,
        role: ['ADMIN', 'MEMBER'],
      },
      {
        id: 21,
        label: 'Users List',
        link: '/user',
        icon: 'bi-house-fill',
        parentId: 19,
        role: ['ADMIN', 'MEMBER'],
      },
      {
        id: 22,
        label: 'Roles List',
        link: '/role',
        icon: 'bi-house-fill',
        parentId: 19,
        role: ['ADMIN'],
      },
      {
        id: 23,
        label: 'Log System',
        link: '/account',
        icon: 'bi-house-fill',
        parentId: 19,
        role: ['ADMIN'],
      },
    ],
  },
];
