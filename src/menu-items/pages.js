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
const type = localStorage.getItem('type');

function pagesRoute() {
    switch (type) {
        case 'Admin':
            return [
                {
                    id: 'subscriptionCreation',
                    title: 'SubscriptionTypes',
                    type: 'item',
                    url: '/pages/subscriptionTypes',
                    icon: IconReceipt,
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
                }
            ];
        case 'Owner':
            return [
                {
                    id: 'subscriptionPayment',
                    title: 'Subscription',
                    type: 'item',
                    url: '/pages/subscription',
                    icon: IconReceipt,
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
                    id: 'notification',
                    title: 'Notification',
                    type: 'item',
                    url: '/pages/notification',
                    icon: IconBellRinging,
                    breadcrumbs: false
                },
                {
                    id: 'customerPayment',
                    title: 'Customer Payment',
                    type: 'item',
                    url: '/pages/customerPayment',
                    icon: icons.IconCash,
                    breadcrumbs: false
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
                    id: 'calorieCal',
                    title: 'Calorie Calculator',
                    type: 'item',
                    url: '/pages/calorieCal',
                    icon: IconToolsKitchen2,
                    breadcrumbs: false
                }
            ];
        case 'Manager':
            return [
                {
                    id: 'employee-management',
                    title: 'Employee Managment',
                    type: 'item',
                    url: '/pages/employeeManagement',
                    icon: IconUsers,
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
                    id: 'customerPayment',
                    title: 'Customer Payment',
                    type: 'item',
                    url: '/pages/customerPayment',
                    icon: icons.IconCash,
                    breadcrumbs: false
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
                    id: 'attendance',
                    title: 'Attendance',
                    type: 'item',
                    url: '/pages/attendance',
                    icon: IconUsers,
                    breadcrumbs: false
                },
                {
                    id: 'calorieCal',
                    title: 'Calorie Calculator',
                    type: 'item',
                    url: '/pages/calorieCal',
                    icon: IconToolsKitchen2,
                    breadcrumbs: false
                }
            ];
        case 'Trainer':
            return [
                {
                    id: 'notification',
                    title: 'Notification',
                    type: 'item',
                    url: '/pages/notification',
                    icon: IconBellRinging,
                    breadcrumbs: false
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
                    id: 'attendance',
                    title: 'Attendance',
                    type: 'item',
                    url: '/pages/attendance',
                    icon: IconUsers,
                    breadcrumbs: false
                },
                {
                    id: 'calorieCal',
                    title: 'Calorie Calculator',
                    type: 'item',
                    url: '/pages/calorieCal',
                    icon: IconToolsKitchen2,
                    breadcrumbs: false
                }
            ];
        default:
            return [
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
                }
            ];
    }
}

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: pagesRoute()
};

export default pages;
