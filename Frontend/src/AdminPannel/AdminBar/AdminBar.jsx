import React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AirplanemodeActiveTwoToneIcon from '@mui/icons-material/AirplanemodeActiveTwoTone';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import WallpaperTwoToneIcon from '@mui/icons-material/WallpaperTwoTone';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import AdminDashboard from '../AdminDashBoard/AdminDashboard';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for "Student"
import PostAddIcon from '@mui/icons-material/PostAdd'; // Icon for "Add Post"
import AddPost from '../AddPost/AddPost';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InvoiceGenerator from '../Invoice/Invoie';
import UpdatePaasowd from '../AdminUpdatePass/UpdatePaasowd';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'; // Icon for "Manage Internship Industry"
import UpdatePricing from '../UpdatePricing/UpdatePricing';
import TeamMember from '../TeamMember/TeamMember';
import ExplorePrice from '../ExplorePrice/ExplorePrice';
import UpdatePrice from '../UpdatePrice/UpdatePrice';
import CreateIndustry from '../CreateIndustry/CreateIndustry';
import CreateInternshipLoc from '../CreateInternshipLoc/CreateInternsipLoc';
import UpdateContactForm from '../UpdateInformation/UpdateInformation';
import ManagePaymentData from '../../Component/ManagePaymentData/ManagePaymentData';
import ApplicationsTable from '../ApplicationsTable/ApplicationsTable';
import PaymentTable from '../PaymentTable/PaymentTable';
import AdminWorkingMember from '../AdminWorkingMember/AdminWorkingMember';



// Define navigation data with updated paths
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'posts',
    title: 'Blogs',
    icon: <PostAddIcon />,
    children: [
      {
        segment: 'posts/add-post',
        title: 'Add Post',
        icon: <AirplanemodeActiveTwoToneIcon />,
      },
      {
        segment: 'posts/edit-post',
        title: 'Edit Post',
        icon: <EditIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Team & Data Management',
  },
  {
    segment: 'team-management',
    title: 'Team Management',
    icon: <GroupIcon />,
    children: [
      {
        segment: 'team-management/manage-team',
        title: 'Manage Working Members',
        icon: <GroupIcon />,
      },
    ],
  },
  {
    segment: 'data-management',
    title: 'Data Management',
    icon: <WallpaperTwoToneIcon />,
    children: [
      {
        segment: 'data-management/update-data',
        title: 'Update Footer Data',
        icon: <WallpaperTwoToneIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Services',
  },
  {
    segment: 'services',
    title: 'Services',
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: 'services/add-service',
        title: 'Add Service',
        icon: <NoteAddIcon />,
      },
      {
        segment: 'services/update-service',
        title: 'Update Service',
        icon: <EditIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Internship Management',
  },
  {
    segment: 'internship-industry',
    title: 'Manage Internship Industry',
    icon: <WorkOutlineIcon />,
    children: [
      {
        segment: 'internship-industry/add-industry',
        title: 'Remote Internship',
        icon: <NoteAddIcon />,
      },
      {
        segment: 'internship-industry/view-industry',
        title: 'Person Internship',
        icon: <ViewListIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Payment',
    icon: <AdminPanelSettingsTwoToneIcon />,
    children: [
      {
        segment: 'reports/payment-successful',
        title: 'Payment Successful',
        icon: <AirplanemodeActiveTwoToneIcon />,
      },
    ],
  },
  {
    segment: 'student',
    title: 'Payment of Bookonline',
    icon: <AccountCircleIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsTwoToneIcon />,
    children: [
      {
        segment: 'settings/update-password',
        title: 'Update Password',
        icon: <LockIcon />,
      },
      {
        segment: 'settings/confirmation-notes',
        title: 'Update Team Member',
        icon: <NoteAddIcon />,
      },
      {
        segment: 'settings/update-pricing',
        title: 'Update Pricing',
        icon: <AttachMoneyTwoToneIcon />,
      },
      {
        segment: 'settings/account-management',
        title: 'Account Management',
        icon: <AccountBalanceWalletTwoToneIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Tools',
  },
  {
    segment: 'invoice-generator',
    title: 'Invoice Generator',
    icon: <ReceiptLongIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
      matches: (path) => pathname.startsWith(path),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;


  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {/* Parent Routes */}
          {router.pathname === '/dashboard' && <AdminDashboard />}
          {router.pathname === '/student' && <PaymentTable />}
          {router.pathname === '/invoice-generator' && <InvoiceGenerator />}
          {router.pathname.startsWith('/posts') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/posts/posts/add-post' && <AddPost />}
            </>
          )}
          {router.pathname.startsWith('/settings') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/settings/settings/update-password' && <UpdatePaasowd />}
            </>
          )}
          {router.pathname.startsWith('/settings') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/settings/settings/confirmation-notes' && <TeamMember />}
            </>
          )}
          {router.pathname.startsWith('/settings') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/settings/settings/update-pricing' && <UpdatePricing />}
            </>
          )}
          {router.pathname.startsWith('/settings') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/settings/settings/account-management' && <ManagePaymentData />}
            </>
          )}
          {router.pathname.startsWith('/team-management') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/team-management/team-management/manage-team' && <AdminWorkingMember />}
            </>
          )}
          {router.pathname.startsWith('/services') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/services/services/add-service' && <ExplorePrice />}
            </>
          )}
          {router.pathname.startsWith('/services') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/services/services/update-service' && <UpdatePrice />}
            </>
          )}
          {router.pathname.startsWith('/reports') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/reports/reports/payment-successful' && <ApplicationsTable />}
            </>
          )}
         
          {router.pathname.startsWith('/internship-industry/') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/internship-industry/internship-industry/add-industry' && <CreateIndustry />}
            </>
          )}
         
          {router.pathname.startsWith('/internship-industry/') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/internship-industry/internship-industry/view-industry' && <CreateInternshipLoc />}
            </>
          )}
          {router.pathname.startsWith('/data-management/') && (
            <>
              {/* Child Routes */}
              {router.pathname === '/data-management/data-management/update-data' && <UpdateContactForm />}
            </>
          )}
         
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
