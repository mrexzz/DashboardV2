import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Create New Team',
    path: '#',
    icon: icon('ic_team'),
    style: { color: 'rgba(0, 0, 0, 0,0)' }, 
  },
  {
    title: 'Add New Employee to a Team',
    path: '#',
    icon: icon('ic_useradd'),
    style: { color: 'rgba(0, 0, 0, 0.54)' }, 
  },
];

export default navConfig;
