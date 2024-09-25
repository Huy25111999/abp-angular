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
}

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Home',
    link: '/',
    isTitle: true,
    icon: 'bi-house-fill',
  },
  {
    id: 2,
    label: 'Role & Users',
    icon: 'bi-house-fill',
    isTitle: true,
    collapsed: true,
    subItems: [
      {
        id: 3,
        label: 'List User',
        link: '/admin/user',
        icon: 'bi-house-fill',
        parentId: 2,
      },
      {
        id: 4,
        label: 'List Role',
        link: '/admin/role',
        icon: 'bi-house-fill',
        parentId: 2,
      },
    ],
  },
  // {
  //   id: 5,
  //   label: 'Accounts',
  //   icon: 'bi-house-fill',
  //   isTitle: true,
  //   collapsed: true,
  //   subItems: [
  //     {
  //       id: 6,
  //       label: 'Accounts List',
  //       link: '/admin/user',
  //       icon: 'bi-house-fill',
  //       parentId: 2,
  //     },
  //     {
  //       id: 7,
  //       label: 'License',
  //       link: '/admin/role',
  //       icon: 'bi-house-fill',
  //       parentId: 2,
  //     },
  //     {
  //       id: 7,
  //       label: 'Registered Activities',
  //       link: '/admin/roles',
  //       icon: 'bi-house-fill',
  //       parentId: 2,
  //     },
  //   ],
  // },
  // {
  //   id: 9,
  //   label: 'Document',
  //   icon: 'bi-house-fill',
  //   isTitle: true,
  //   collapsed: true,
  //   subItems: [
  //     {
  //       id: 6,
  //       label: 'Policies',
  //       link: '/admin/user',
  //       icon: 'bi-house-fill',
  //       parentId: 9,
  //     },
  //     {
  //       id: 7,
  //       label: 'Claims',
  //       link: '/admin/role',
  //       icon: 'bi-house-fill',
  //       parentId: 9,
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   label: 'Site Admin',
  //   icon: 'bi-house-fill',
  //   isTitle: true,
  //   collapsed: true,
  //   subItems: [
  //     {
  //       id: 6,
  //       label: 'System Settings',
  //       link: '/admin/user',
  //       icon: 'bi-house-fill',
  //       parentId: 9,
  //     },
  //     {
  //       id: 7,
  //       label: 'Site Admin',
  //       link: '/admin/role',
  //       icon: 'bi-house-fill',
  //       parentId: 9,
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   label: 'Profile',
  //   icon: 'bi-house-fill',
  //   isTitle: true,
  //   collapsed: true,
  //   link: '/admin/role',
  // },
];
