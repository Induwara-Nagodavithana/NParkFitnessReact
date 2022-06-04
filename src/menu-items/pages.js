// assets
import {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconCash,
    IconBuildingCommunity,
    IconBrandCodesandbox,
    IconBuildingArch,
    IconUsers,
    IconReportAnalytics,
    IconReceipt,
    IconToolsKitchen2
} from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconCash
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        // {
        //     id: 'authentication',
        //     title: 'Authentication',
        //     type: 'collapse',
        //     icon: icons.IconKey,
        //     children: [
        //         {
        //             id: 'login3',
        //             title: 'Login',
        //             type: 'item',
        //             url: '/pages/login/login3',
        //             target: true
        //         },
        //         {
        //             id: 'register3',
        //             title: 'Register',
        //             type: 'item',
        //             url: '/pages/register/register3',
        //             target: true
        //         }
        //     ]
        // },
        {
            id: 'customerPayment',
            title: 'Customer Payment',
            type: 'item',
            url: '/pages/customerPayment',
            icon: icons.IconCash,
            breadcrumbs: false
        },
        {
            id: 'subscriptionPayment',
            title: 'Subscription',
            type: 'item',
            url: '/pages/subscription',
            icon: IconReceipt,
            breadcrumbs: false
        },
        {
            id: 'subscriptionCreation',
            title: 'SubscriptionTypes',
            type: 'item',
            url: '/pages/subscriptionTypes',
            icon: IconReceipt,
            breadcrumbs: false
        },
        {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/pages/notification',
            icon: IconBellRinging,
            breadcrumbs: false
        },
        {
            id: 'calorieCal',
            title: 'Calorie Calculator',
            type: 'item',
            url: '/pages/calorieCal',
            icon: IconToolsKitchen2,
            breadcrumbs: false
        },
        {
            id: 'report',
            title: 'Reports',
            type: 'collapse',
            icon: IconReportAnalytics,
            children: [
                {
                    id: 'member-report',
                    title: 'Member Report',
                    type: 'item',
                    url: '/pages/report/memberReport',
                    external: true,
                    target: true,
                    breadcrumbs: false
                },
                {
                    id: 'trainer-report',
                    title: 'Trainer Report',
                    type: 'item',
                    url: '/pages/report/trainerReport',
                    external: true,
                    target: true,
                    breadcrumbs: false
                },
                {
                    id: 'branch-report',
                    title: 'Branch Report',
                    type: 'item',
                    url: '/pages/report/branchReport',
                    external: true,
                    target: true,
                    breadcrumbs: false
                },
                {
                    id: 'gym-report',
                    title: 'Gym Report',
                    type: 'item',
                    url: '/pages/report/gymReport',
                    external: true,
                    target: true,
                    breadcrumbs: false
                },
                {
                    id: 'admin-report',
                    title: 'Admin Report',
                    type: 'item',
                    url: '/pages/report/adminReport',
                    external: true,
                    target: true,
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'services',
            title: 'Services',
            type: 'item',
            url: '/pages/services',
            icon: IconReportAnalytics,
            breadcrumbs: false
        },
        {
            id: 'employee-management',
            title: 'Employee Managment',
            type: 'item',
            url: '/pages/employeeManagement',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'attendance',
            title: 'Attendance',
            type: 'item',
            url: '/pages/attendance',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'dietPlan',
            title: 'Diet Plan',
            type: 'item',
            url: '/pages/diet-plan',
            icon: IconToolsKitchen2,
            breadcrumbs: false
        }
    ]
};

export default pages;
